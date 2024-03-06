const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

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
  const sendEmail = req.body.Email;
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
  const SQLreco = "SELECT * FROM `recommendation` ORDER BY id DESC LIMIT 4";
  const SQLnb = "SELECT COUNT(*) as nb FROM `recommendation`";
  const SQLnbArtist =
    "SELECT COUNT(DISTINCT artist) AS nbArtist FROM `recommendation`";
  // const SQLprodMonth = "";
  const SQLprodTotal = "SELECT COUNT(*) from `prod`";

  db.query(SQLreco, (errReco, dataReco) => {
    db.query(SQLnb, (errNb, dataNb) => {
      db.query(SQLnbArtist, (errNbArtist, dataNbArtist) => {
        // db.query(SQLprodMonth, (errProdMonth, dataProdMonth) => {
          db.query(SQLprodTotal, (errProdTotal, dataProdTotal) => {
            if (errReco) return res.json(errReco);
            if (errNb) return res.json(errNb);
            if (errNbArtist) return res.json(errNbArtist);
            // if (errProdMonth) return res.json(errProdMonth);
            if (errProdTotal) return res.json(errProdTotal);

            const result = {
              reco: dataReco,
              nb: dataNb,
              nbArtist: dataNbArtist,
              // prodMonth: dataProdMonth,
              prodTotal: dataProdTotal,
            };
            return res.json(result);
          });
        });
      });
    // });
  });
});
