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

  const SQL = "INSERT INTO User (email, username, password) VALUES (?,?,?)";
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

  const SQL = "SELECT * FROM user WHERE username = ? && password = ?";
  const Values = [sentLoginUsername, sentLoginPassword];

  db.query(SQL, Values, (err, results) => {
    console.log(results)
    if (err) {
      res.send({ error: err });
  }
    if (results.length > 0) {
      res.send(results);
    }
  });
});
