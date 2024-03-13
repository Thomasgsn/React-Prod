const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const port = "8081";

const app = express();
app.use(express.json());
app.use(cors());

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

app.get("/login", (req, res) => {
  const sentLoginUsername = req.body.LoginUsername;
  const sentLoginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM `user` WHERE username = ? && password = ?";
  const Values = [sentLoginUsername, sentLoginPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) { return res.send({ error: err });}
    if (results.length > 0) { return res.send(results);}
  });
});

app.get("/user", (req, res) => {
  const SQL ='SELECT * FROM user'

  db.query(SQL, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

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
  const SQLprods = "SELECT * from `prod` ORDER BY releaseDate DESC";

  db.query(SQLprods, (errProds, dataProds) => {
    if (errProds) return res.json(errProds);

    return res.json(dataProds);
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
  const SQLplaylist = `SELECT * FROM typebeat`;
  const SQLprod = `SELECT p.* FROM prod p WHERE p.idTB IN (SELECT tb.id FROM typebeat tb) AND p.id IN (SELECT id FROM (SELECT id, idTB, ROW_NUMBER() OVER(PARTITION BY idTB ORDER BY id DESC) AS row_num FROM prod) AS ranked WHERE row_num <= 4) ORDER BY p.idTB, p.id DESC;`;

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

app.get("/playlist/:playlistname", (req, res) => {
  const playlistName = req.params.playlistname;

  if (playlistName === "free") {
    const SQL = `SELECT * FROM prod WHERE price = 0}';`;

    db.query(SQL, (errPlaylist, playlistProd) => {
      if (errPlaylist) return res.json(errPlaylist);

      res.json(playlistProd);
    });
  } else {
    const SQL = `SELECT prod.* FROM prod JOIN typebeat ON prod.idTB = typebeat.id WHERE typebeat.name = '${playlistName}';`;

    db.query(SQL, (errPlaylist, playlistProd) => {
      if (errPlaylist) return res.json(errPlaylist);

      res.json(playlistProd);
    });
  }
});

// assets
app.get("/recovignette", (req, res) => {
  const SQLartistReco =
    "SELECT DISTINCT recommendation_artist.nom FROM recommendation JOIN recommendation_artist ON recommendation.idArtist = recommendation_artist.id ORDER BY recommendation.id DESC LIMIT 5;";
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

// player
app.get("/audioplayer", (req, res) => {
  const SQLplayer = "SELECT * from `prod` ORDER BY releaseDate DESC";

  db.query(SQLplayer, (errPlayer, dataPlayer) => {
    if (errPlayer) return res.json(errPlayer);

    return res.json(dataPlayer);
  });
});
