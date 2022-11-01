const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//In case you forget, comments are mine

// This allows us to specify what happens when someone reaches a directory
// Since we specified / (root) it will show what should happen when you are on root.
//req = require, what you require from the user, this is how we will get info from the frontend.
//res = response, how will you respond?
/*
var sqlInsert =
    "INSERT INTO users (username,userpassword,userinfo) VALUES ('zeNnGg','malrol','integeri');";
  db.query(sqlInsert, (err, result) => {
    res.send("hello ");
  });
*/
// app.delete("/api/delete/:userName", (req, res) => {
//   const name = req.params.userName;

//   const sqlDelete =
//     "DELETE FROM users_mod WHERE username = ?";

//     db.query(sqlDelete, name, (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         res.send(result);
//       }
//     })
// });

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlLoginCheck = "SELECT * FROM users_mod WHERE email = ? AND password = ?";

  db.query(sqlLoginCheck, [email, password], (err, result)=> {
    if (err) {
      res.send({err: err});
    }
    if(result.length > 0){
      res.send(result);
    }
    else{
      res.send({message: "Wrong email/password combination!"});
    }
    console.log(err, result);
  })
});
// app.post("/api/insert", (req, res) => {
//   const userName = req.body.userName;
//   const password = req.body.password;

//   const sqlInsert =
//     "INSERT INTO users (username,userpassword,userinfo) VALUES (?,?,'Enter info here!')";
//   db.query(sqlInsert, [userName, password], (err, result) => {
//     console.log(err);
//   });
// });

app.listen(3001, () => {
  console.log("bruh");
});

