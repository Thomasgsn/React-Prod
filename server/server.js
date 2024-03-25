const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = "8081";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "oftynprod",
});

// connection
app.post("/register", (req, res) => {
  const sendEmail = req.body.Mail;
  const sendUsername = req.body.Username;
  const sendPassword = req.body.Password;

  const SQL = "INSERT INTO `user` (email, username, password) VALUES (?,?,?)";
  const Values = [sendEmail, sendUsername, sendPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) return res.send(err);
    return res.send({ Message: "User added!" });
  });
});

app.post("/login", (req, res) => {
  const sentLoginUsername = req.body.LoginUsername;
  const sentLoginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM `user` WHERE username = ? and password = ?";
  const Values = [sentLoginUsername, sentLoginPassword];

  db.query(SQL, Values, (err, result) => {
    if (err) return res.json({ Message: err });
    if (result.length > 0) {
      req.session.username = result[0].username;
      return res.json({ Login: true, username: req.session.username });
    } else {
      return res.json({ Login: false });
    }
  });
});

app.get("/user", (req, res) => {
  if (req.session.username) {
    return res.json({ valid: true, username: req.session.username });
  } else {
    return res.json({ valid: false });
  }
});

app.get("/api/user/:userName", (req, res) => {
  const sql = `SELECT id, username, email, role FROM user WHERE username = ?`;
  db.query(sql, [req.params.userName], (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur:",
        err
      );
      return;
    }
    if (result.length === 0) {
      console.log("Aucun utilisateur trouvé !");
      return;
    }

    res.json({ result });
  });
});

// page
app.get("/home", (req, res) => {
  const SQLPlaylist =
    "SELECT tb.id AS id, tb.name AS name, p.id AS prod_id, p.name AS prod_name FROM typebeat tb JOIN prod p ON tb.id = p.idTb JOIN (SELECT idTb, MAX(releaseDate) AS maxReleaseDate FROM prod WHERE releaseDate IS NOT NULL GROUP BY idTb) latest_prod ON p.idTb = latest_prod.idTb AND p.releaseDate = latest_prod.maxReleaseDate WHERE p.releaseDate IS NOT NULL;";

  db.query(SQLPlaylist, (errPlaylist, dataPlaylist) => {
    if (errPlaylist) return res.json(errPlaylist);

    return res.json(dataPlaylist);
  });
});

app.get("/prods", (req, res) => {
  const filterBy = req.query.filterBy;
  const searchBy = req.query.searchBy;
  const priceRange = req.query.priceRange;
  let price = priceRange.split("-");

  let SQLprods = `SELECT * FROM prod WHERE price BETWEEN ${price[0]} AND ${price[1]}`;

  if (searchBy && searchBy != "") {
    SQLprods += ` AND (name LIKE "%${searchBy}%" OR tag LIKE "%${searchBy}%" OR name LIKE "${searchBy}%" OR tag LIKE "${searchBy}%" OR name LIKE "%${searchBy}" OR tag LIKE "%${searchBy}")`;
  }

  switch (filterBy) {
    case "price":
      SQLprods += " ORDER BY price ASC";
      break;

    case "priceinv":
      SQLprods += " ORDER BY price DESC";
      break;

    case "date":
      SQLprods += " ORDER BY releaseDate DESC";
      break;

    case "dateinv":
      SQLprods += " ORDER BY releaseDate ASC";
      break;

    case "type":
      SQLprods += " ORDER BY idTB ASC";
      break;

    case "typeinv":
      SQLprods += " ORDER BY idTB DESC";
      break;

    default:
      break;
  }

  db.query(SQLprods, (errProds, dataProds) => {
    if (errProds) {
      console.error("Erreur lors de la récupération des produits :", errProds);
      return res.status(500).json({
        error: "Une erreur est survenue lors de la récupération des produits.",
      });
    }

    res.json(dataProds);
  });
});

app.get("/prod/:id", (req, res) => {
  const id = req.params.id;
  const SQL = `SELECT * from prod WHERE id = ${id}`;

  db.query(SQL, (errProd, prodDetail) => {
    if (errProd) return res.json(errProd);

    res.json(prodDetail);
  });
});

app.get("/playlists", (req, res) => {
  const searchBy = req.query.searchBy;
  const SQLprod = `SELECT p.* FROM prod p WHERE p.idTB IN (SELECT tb.id FROM typebeat tb) AND p.id IN (SELECT id FROM (SELECT id, idTB, ROW_NUMBER() OVER(PARTITION BY idTB ORDER BY id DESC) AS row_num FROM prod) AS ranked WHERE row_num <= 8) ORDER BY p.idTB, p.id DESC;`;
  const SQLplaylist = `SELECT * FROM typebeat WHERE (name LIKE "%${searchBy}%" OR name LIKE "${searchBy}%" OR name LIKE "%${searchBy}")`;

  db.query(SQLplaylist, (errPlaylist, dataPlaylist) => {
    db.query(SQLprod, (errProd, dataPlaylistProd) => {
      if (errPlaylist) return res.json(errPlaylist);
      if (errProd) return res.json(errProd);

      const result = {
        playlist: dataPlaylist,
        playlistProd: dataPlaylistProd,
      };
      return res.json(result);
    });
  });
});

app.get("/playlist/:playlistName", (req, res) => {
  const playlistName = req.params.playlistName;
  const filterBy = req.query.filterBy;
  const searchBy = req.query.searchBy;
  const priceRange = req.query.priceRange;
  let price = priceRange.split("-");

  let SQL = `SELECT p.* FROM prod p JOIN typebeat ON p.idTB = typebeat.id WHERE typebeat.name = '${playlistName}' AND p.price BETWEEN ${price[0]} AND ${price[1]}`;

  if (searchBy && searchBy != "") {
    SQL += ` AND (p.name LIKE "%${searchBy}%" OR p.tag LIKE "%${searchBy}%" OR p.name LIKE "${searchBy}%" OR p.tag LIKE "${searchBy}%" OR p.name LIKE "%${searchBy}" OR p.tag LIKE "%${searchBy}")`;
  }

  switch (filterBy) {
    case "price":
      SQL += " ORDER BY p.price ASC";
      break;

    case "priceinv":
      SQL += " ORDER BY p.price DESC";
      break;

    case "date":
      SQL += " ORDER BY p.releaseDate DESC";
      break;

    case "dateinv":
      SQL += " ORDER BY p.releaseDate ASC";
      break;

    case "type":
      SQL += " ORDER BY p.idTB ASC";
      break;

    case "typeinv":
      SQL += " ORDER BY p.idTB DESC";
      break;

    default:
      break;
  }

  db.query(SQL, (errPlaylist, playlistProd) => {
    if (errPlaylist) return res.json(errPlaylist);

    res.json(playlistProd);
  });
});

app.get("/recommendations", (req, res) => {
  const filterBy = req.query.filterBy;
  const searchBy = req.query.searchBy;

  let SQLartistReco =
    "SELECT ra.id, ra.name, COUNT(r.idArtist) AS nb_r FROM recommendation r JOIN recommendation_artist ra ON r.idArtist = ra.id ";

  if (searchBy && searchBy != "") {
    SQLartistReco += ` WHERE (ra.name LIKE "%${searchBy}%" OR ra.name LIKE "${searchBy}%" OR ra.name LIKE "%${searchBy}")`;
  }

  SQLartistReco += " GROUP BY ra.name";

  switch (filterBy) {
    case "nbReco":
      SQLartistReco += " ORDER BY nb_r DESC";
      break;

    case "nbRecoinv":
      SQLartistReco += " ORDER BY nb_r ASC";
      break;

    case "date":
      SQLartistReco += " ORDER BY r.id DESC";
      break;

    case "dateinv":
      SQLartistReco += " ORDER BY r.id ASC";
      break;

    case "name":
      SQLartistReco += " ORDER BY ra.name ASC";
      break;

    case "nameinv":
      SQLartistReco += " ORDER BY ra.name DESC";
      break;

    default:
      break;
  }

  db.query(SQLartistReco, (errArtistReco, dataArtistReco) => {
    if (errArtistReco) return res.json(errArtistReco);

    return res.json(dataArtistReco);
  });
});

app.get("/r/:id", (req, res) => {
  const id = req.params.id;

  const SQL = `SELECT song, genre, beatmaker, ytLink, spotifyLink FROM recommendation_artist ra INNER JOIN recommendation r ON r.idArtist = ra.id WHERE r.idArtist = ${id} order by r.id DESC`;
  const SQLname = `SELECT name FROM recommendation_artist ra WHERE ra.id = ${id}`;

  db.query(SQLname, (errRecoName, recoName) => {
    db.query(SQL, (errReco, recom) => {
      if (errRecoName) return res.json(errRecoName);
      if (errReco) return res.json(errReco);

      const result = {
        recoName: recoName,
        recom: recom,
      };

      res.json(result);
    });
  });
});

// assets
app.get("/recovignette", (req, res) => {
  const SQLartistReco =
    "SELECT DISTINCT recommendation_artist.id, recommendation_artist.name FROM recommendation JOIN recommendation_artist ON recommendation.idArtist = recommendation_artist.id ORDER BY recommendation.id DESC LIMIT 5;";
  const SQLnbReco = "SELECT COUNT(*) as nb FROM `recommendation`";
  const SQLnbArtist =
    "SELECT COUNT(*) AS nbArtist FROM `recommendation_artist`";

  db.query(SQLartistReco, (errArtistReco, dataArtistReco) => {
    db.query(SQLnbReco, (errNbReco, dataNbReco) => {
      db.query(SQLnbArtist, (errNbArtist, dataNbArtist) => {
        if (errArtistReco) return res.json(errArtistReco);
        if (errNbReco) return res.json(errNbReco);
        if (errNbArtist) return res.json(errNbArtist);

        const result = {
          artistReco: dataArtistReco,
          nbReco: dataNbReco,
          nbArtist: dataNbArtist,
        };
        return res.json(result);
      });
    });
  });
});

app.get("/statsprod", (req, res) => {
  const SQLprodMonth = `SELECT COUNT(*) as nbProdMounth from prod WHERE MONTH(releaseDate) = ${currentMonth}`;
  const SQLprodTotal = "SELECT COUNT(*) as nbProd from `prod`";

  db.query(SQLprodMonth, (errProdMonth, dataProdMonth) => {
    db.query(SQLprodTotal, (errProdTotal, dataProdTotal) => {
      if (errProdMonth) return res.json(errProdMonth);
      if (errProdTotal) return res.json(errProdTotal);

      const result = {
        prodTotal: dataProdTotal,
        prodMonth: dataProdMonth,
      };
      return res.json(result);
    });
  });
});

app.get("/activities", (req, res) => {
  const SQL = `SELECT * FROM activity ORDER BY id DESC LIMIT 7`;

  db.query(SQL, (errSQL, data) => {
    if (errSQL) return res.json(errSQL);

    return res.json(data);
  });
});

// player
app.get("/audioplayer", (req, res) => {
  const SQLplayer = "SELECT * from `prod` ORDER BY releaseDate ASC";

  db.query(SQLplayer, (errPlayer, dataPlayer) => {
    if (errPlayer) return res.json(errPlayer);

    return res.json(dataPlayer);
  });
});
