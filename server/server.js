const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

app.listen(8081, () => {
  console.log("Server running on port 8081");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "oftynprod",
});

app.post("/register", (req, res) => {
  const sendEmail = req.body.Mail;
  const sendUsername = req.body.Username;
  const sendPassword = req.body.Password;

  const SQL = "INSERT INTO `user` (email, username, password) VALUES (?,?,?)";
  const Values = [sendEmail, sendUsername, sendPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      console.log("User inserted successfully!");
      res.send({ Message: "User added!" });
    }
  });
});

app.post("/login", (req, res) => {
  const sentLoginUsername = req.body.LoginUsername;
  const sentLoginPassword = req.body.LoginPassword;

  const SQL = "SELECT * FROM `user` WHERE username = ? && password = ?";
  const Values = [sentLoginUsername, sentLoginPassword];

  db.query(SQL, Values, (err, results) => {
    if (err) {
      res.send({ error: err });
    }
    if (results.length > 0) {
      res.send(results);
    }
  });
});

app.get("/home", (req, res) => {
  const SQLprodMonth = `SELECT COUNT(*) as nbProdMounth from prod WHERE MONTH(releaseDate) = ${currentMonth}`;
  const SQLprodTotal = "SELECT COUNT(*) as nbProd from `prod`";
  const SQLPlaylist = "SELECT * FROM `typebeat`";
  const SQLartistReco =
    "SELECT recommendation_artist.nom FROM recommendation JOIN recommendation_artist ON recommendation.idArtist = recommendation_artist.id ORDER BY recommendation.id DESC LIMIT 5;";
  const SQLnb = "SELECT COUNT(*) as nb FROM `recommendation`";
  const SQLnbArtist =
    "SELECT COUNT(*) AS nbArtist FROM `recommendation_artist`";

  db.query(SQLprodMonth, (errProdMonth, dataProdMonth) => {
    db.query(SQLprodTotal, (errProdTotal, dataProdTotal) => {
      db.query(SQLPlaylist, (errPlaylist, dataPlaylist) => {
        db.query(SQLartistReco, (errArtistReco, dataArtistReco) => {
          db.query(SQLnb, (errNb, dataNb) => {
            db.query(SQLnbArtist, (errNbArtist, dataNbArtist) => {
              // Détection d'erreur
              if (errProdMonth) return res.json(errProdMonth);
              if (errProdTotal) return res.json(errProdTotal);
              if (errPlaylist) return res.json(errPlaylist);
              if (errArtistReco) return res.json(errArtistReco);
              if (errNb) return res.json(errNb);
              if (errNbArtist) return res.json(errNbArtist);

              const result = {
                artistReco: dataArtistReco,
                nb: dataNb,
                nbArtist: dataNbArtist,
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
  });
});

app.get("/test", (req, res) => {
  const SQLAAMO =
    "SELECT recommendation.* FROM recommendation JOIN recommendation_artist ON recommendation.idArtist = recommendation_artist.id WHERE recommendation_artist.nom = 'AAMO';";

  db.query(SQLAAMO, (errAAMO, dataAAMO) => {
    if (errAAMO) return res.json(errAAMO);
    const result = {
      AAMO: dataAAMO,
    };
    return res.json(result);
  });
});
