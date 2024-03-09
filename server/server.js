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

app.post("/login", (req, res) => {
  const sentLoginUsername = req.body.LoginUsername;
  const sentLoginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM `user` WHERE username = ? && password = ?";
  const Values = [sentLoginUsername, sentLoginPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) return res.send({ error: err });
    if (results.length > 0) return res.send(results);
  });
});

// page

app.get("/home", (req, res) => {
  const SQLprodMonth = `SELECT COUNT(*) as nbProdMounth from prod WHERE MONTH(releaseDate) = ${currentMonth}`;
  const SQLprodTotal = "SELECT COUNT(*) as nbProd from `prod`";
  const SQLPlaylist =
    "SELECT tb.id AS id, tb.name AS name, p.cover AS cover FROM typebeat tb JOIN prod p ON tb.id = p.idTb JOIN (SELECT idTb, MAX(releaseDate) AS maxReleaseDate FROM prod WHERE releaseDate IS NOT NULL GROUP BY idTb) latest_prod ON p.idTb = latest_prod.idTb AND p.releaseDate = latest_prod.maxReleaseDate WHERE p.releaseDate IS NOT NULL;";

  db.query(SQLprodMonth, (errProdMonth, dataProdMonth) => {
    db.query(SQLprodTotal, (errProdTotal, dataProdTotal) => {
      db.query(SQLPlaylist, (errPlaylist, dataPlaylist) => {
        // Détection d'erreur
        if (errProdMonth) return res.json(errProdMonth);
        if (errProdTotal) return res.json(errProdTotal);
        if (errPlaylist) return res.json(errPlaylist);

        const result = {
          prodTotal: dataProdTotal,
          prodMonth: dataProdMonth,
          playlist: dataPlaylist,
        };
        return res.json(result);
      });
    });
  });
});

app.get("/prods", (req, res) => {
  const SQLprods = "SELECT * from `prod` ORDER BY releaseDate DESC";
  const SQLprodMonth = `SELECT COUNT(*) as nbProdMounth from prod WHERE MONTH(releaseDate) = ${currentMonth}`;
  const SQLprodTotal = "SELECT COUNT(*) as nbProd from `prod`";
  const SQLPlaylist =
    "SELECT tb.id AS id, tb.name AS name, p.cover AS cover FROM typebeat tb JOIN prod p ON tb.id = p.idTb JOIN (SELECT idTb, MAX(releaseDate) AS maxReleaseDate FROM prod WHERE releaseDate IS NOT NULL GROUP BY idTb) latest_prod ON p.idTb = latest_prod.idTb AND p.releaseDate = latest_prod.maxReleaseDate WHERE p.releaseDate IS NOT NULL;";

  db.query(SQLprods, (errProds, dataProds) => {
    db.query(SQLprodMonth, (errProdMonth, dataProdMonth) => {
      db.query(SQLprodTotal, (errProdTotal, dataProdTotal) => {
        db.query(SQLPlaylist, (errPlaylist, dataPlaylist) => {
          // Détection d'erreur
          if (errProds) return res.json(errProds);
          if (errProdMonth) return res.json(errProdMonth);
          if (errProdTotal) return res.json(errProdTotal);
          if (errPlaylist) return res.json(errPlaylist);

          const result = {
            prods: dataProds,
            prodTotal: dataProdTotal,
            prodMonth: dataProdMonth,
            playlist: dataPlaylist,
          };
          return res.json(result);
        });
      });
    });
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
