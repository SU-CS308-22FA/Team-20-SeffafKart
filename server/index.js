const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "containers-us-west-71.railway.app",
  user: "root",
  password: "Ly5AlA40N7LKanhMhclm",
  database: "railway",
  port: "5462",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlLoginCheck =
    "SELECT * FROM users_mod WHERE email = ? AND password = ?";

  db.query(sqlLoginCheck, [email, password], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "Wrong email/password combination!" });
    }
    console.log(err, result);
  });
});

// app.put("/api/update", (req, res) => {
//   const id = req.body.id;
//   const name = req.body.userName;
//   const pass = req.body.password;
//   const email = req.body.email;
//   const info = req.body.userInfo;

//   const sqlUpdate = "UPDATE users SET userName = ?, password = ?, email = ?, userInfo = ? WHERE id = ?";

//     db.query(sqlUpdate,[name, pass, email, info, id] , (err, result) => {
//       if (err) console.log(err);
//     })
// });

app.delete("/api/delete/:userName", (req, res) => {
  const name = req.params.userName;

  const sqlDelete = "DELETE FROM users_mod WHERE username = ?";

    db.query(sqlDelete, name, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
   })
});

app.put("/api/updateusername", (req, res) => {
  const id = req.body.id;
  const userName = req.body.userName;
 
   const sqlUpdate = "UPDATE users_mod SET username = ? WHERE id = ?";
 
     db.query(sqlUpdate,[userName, id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
});

app.put("/api/updatepassword", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
 
   const sqlUpdate = "UPDATE users_mod SET password = ? WHERE id = ?";
 
     db.query(sqlUpdate,[password, id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
});

app.put("/api/updateemail", (req, res) => {
   const id = req.body.id;
   const email = req.body.email;
 
   const sqlUpdate = "UPDATE users_mod SET email = ? WHERE id = ?";
 
  db.query(sqlUpdate,[email, id] , (err, result) => {
    if (err) {
    console.log(err);
    } else {
    res.send(result);
    }
   })
});

app.put("/api/updateuserinfo", (req, res) => {
  const id = req.body.id;
  const userinfo = req.body.userInfo;
 
   const sqlUpdate = "UPDATE users_mod SET userinfo = ? WHERE id = ?";
 
     db.query(sqlUpdate,[userinfo, id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
});

app.post("/api/insert", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;

  const sqlInsert =
    "INSERT INTO users_mod (username,email,password,userinfo) VALUES (?,?,?,'Enter info here!')";
  db.query(sqlInsert, [userName, email, password], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.post("/api/createact", (req, res) => {
  const act_info = req.body.act_info;
  const act_game = req.body.act_game;
  const act_date = req.body.act_date;
  const act_time = req.body.act_time;
  const author_id = req.body.author_id;

  const sqlInsert =
    "INSERT INTO admin_act (author_id,act_info,act_date,act_time,act_game) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [author_id, act_info, act_date, act_time, act_game], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.get('/api/admin_acts', (req,res,next) => {
  //res.json({message: "ok"});
  db.query("SELECT * FROM admin_act", (err, result,fields) => {
    if(err) {res.send("ERROR")}
    else {res.send(result)}
  })
});

app.get('/api/users_mod/:id', (req,res,next) => {
  //res.json({message: "ok"});
  if(req.params.id !== undefined) {
    db.query("SELECT * FROM users_mod WHERE id = ?", [req.params.id],(err, result,fields) => {
      if(err) {res.json("ERROR")}
      else {res.json(result)}
      })
  }
});

app.post("/api/creatematch", (req, res) => {
  const location = req.body.location;
  const time = req.body.time;
  const date = req.body.date;
  const hometeam = req.body.home_team;
  const awayteam = req.body.away_team;

  const sqlInsert =
    "INSERT INTO football_match (location,time,date,home_team,away_team) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [location , time, date, hometeam, awayteam], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);})
  });

app.get('/api/admin_acts/:admin_act_id', (req,res,next) => {
  //res.json({message: "ok"});
  if(req.params.admin_act_id !== undefined) {
    db.query("SELECT * FROM admin_act WHERE admin_act_id = ?", [req.params.admin_act_id],(err, result,fields) => {
      if(err) {res.json("ERROR")}
      else {res.json(result)}
    })
  } 
});

app.put("/api/decreaseposrate", (req, res) => {
  const admin_act_id = req.body.admin_act_id;
  const user_id = req.body.user_id;

  if(req.body.user_id !== undefined) {
    const sqlUpdate = "UPDATE admin_act SET act_rate_pos = act_rate_pos - 1 WHERE admin_act_id = ?";
     db.query(sqlUpdate,[admin_act_id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
  }
});

app.put("/api/decreasenegrate", (req, res) => {
  const admin_act_id = req.body.admin_act_id;
  const user_id = req.body.user_id;

  if(req.body.user_id !== undefined) {
    const sqlUpdate = "UPDATE admin_act SET act_rate_neg = act_rate_neg - 1 WHERE admin_act_id = ?";
     db.query(sqlUpdate,[admin_act_id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
  }
});

app.put("/api/updateposrate", (req, res) => {
  const admin_act_id = req.body.admin_act_id;
  const act_rate_pos = req.body.act_rate_pos;
  const user_id = req.body.user_id;

  if(req.body.user_id !== undefined) {
    const sqlUpdate = "UPDATE admin_act SET act_rate_pos = ? WHERE admin_act_id = ?";
     db.query(sqlUpdate,[act_rate_pos,admin_act_id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
  }
});

app.put("/api/updatenegrate", (req, res) => {
  const admin_act_id = req.body.admin_act_id;
  const act_rate_neg = req.body.act_rate_neg;
  const user_id = req.body.user_id;

  if(req.body.user_id !== undefined) {
   const sqlUpdate = "UPDATE admin_act SET act_rate_neg = ? WHERE admin_act_id = ?";
     db.query(sqlUpdate,[act_rate_neg, admin_act_id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log("bruh");
});
