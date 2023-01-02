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
  const match_id = req.body.match_id;
  const act_date = req.body.act_date;
  const act_time = req.body.act_time;
  const author_id = req.body.author_id;

  const sqlInsert =
    "INSERT INTO admin_act (author_id,act_info,act_date,act_time,match_id) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [author_id, act_info, act_date, act_time, match_id], (err, result) => {
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

app.get('/api/football_match', (req,res,next) => {
  //res.json({message: "ok"});
  db.query("SELECT * FROM football_match ORDER BY match_id DESC", (err, result,fields) => {
    if(err) {res.send("ERROR")}
    else {res.send(result)}
  })
});

app.get('/api/football_match/:match_id', (req,res,next) => {
  //res.json({message: "ok"});
  if(req.params.match_id !== undefined) {
    db.query("SELECT * FROM football_match WHERE match_id = ?", [req.params.match_id],(err, result,fields) => {
      if(err) {res.json("ERROR")}
      else {res.json(result)}
    })
  } 
});

app.get('/api/admin_acts/match_id=:match_id', (req,res,next) => {
  //res.json({message: "ok"});
  if(req.params.match_id !== undefined) {
    db.query("SELECT * FROM admin_act WHERE match_id = ?", [req.params.match_id],(err, result,fields) => {
      if(err) {res.json("ERROR")}
      else {res.json(result)}
    })
  } 
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
    res.send(result);
  })
});

app.post("/api/rateadminact", (req,res) => {
  const user_id = req.body.user_id;
  const rate_type = req.body.rate_type;
  const act_id = req.body.act_id;

  if(req.body.user_id !== undefined) {
    const sqlUpdate = "INSERT INTO rate_act (user_id,rate_type,act_id) VALUES (?,?,?)";
     db.query(sqlUpdate,[user_id,rate_type,act_id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
  }
})

app.get("/api/ratingadminact/act_id=:act_id&user_id=:user_id", (req,res) => {
  if(req.params.act_id !== undefined && req.params.user_id !== undefined) {
    db.query("SELECT * FROM rate_act WHERE act_id = ? AND user_id = ?", [req.params.act_id,req.params.user_id],(err, result,fields) => {
      if(err) {res.json("ERROR")}
      else {res.json(result)
      console.log(result)}
    })
  } 
})

app.put("/api/updaterateadminact", (req,res) => {
  const user_id = req.body.user_id;
  const rate_type = req.body.rate_type;
  const act_id = req.body.act_id;

  if(req.body.user_id !== undefined) {
    const sqlUpdate = "UPDATE rate_act SET rate_type = ? WHERE user_id = ? AND act_id = ?";
     db.query(sqlUpdate,[rate_type,user_id,act_id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
  }
})

app.delete("/api/deleterate/:id", (req, res) => {
  const id = req.params.id;

  const sqlDelete = "DELETE FROM rate_act WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send(result);
      }
   })
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

app.put("/api/assignofficials", (req, res) => {
  const match_id = req.body.match_id;
  const main_referee = req.body.main_referee;
  const first_assistant_referee = req.body.first_assistant_referee;
  const second_assistant_referee = req.body.second_assistant_referee;

   const sqlUpdate = "UPDATE football_match SET main_referee = ?, first_assistant_referee = ?, second_assistant_referee = ? WHERE match_id = ?";
 
     db.query(sqlUpdate,[main_referee,first_assistant_referee, second_assistant_referee, match_id] , (err, result) => {
      if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
   })
});

app.post("/api/ratereferee", (req, res) => {
  const match_id = req.body.match_id;
  const user_id = req.body.user_id;
  const value = req.body.value;
  const referee_num = req.body.referee_num;

  if(req.body.user_id !== undefined) {
    const sqlUpdate = "INSERT INTO rate_referee (match_id,user_id,value,referee_num) VALUES (?,?,?,?)";
    db.query(sqlUpdate,[match_id,user_id, value, referee_num] , (err, result) => {
     if (err) {
       console.log(err);
       } else {
       res.send(result);
       }
  })
  }
});

app.get("/api/ratingreferee/match_id=:match_id&user_id=:user_id&referee_num=:referee_num", (req,res) => {

  if(req.params.match_id !== undefined && req.params.user_id !== undefined && req.params.referee_num !== undefined) {
    db.query("SELECT * FROM rate_referee WHERE match_id = ? AND user_id = ? AND referee_num = ?", [req.params.match_id,req.params.user_id,req.params.referee_num],(err, result,fields) => {
      if(err) {res.json("ERROR")}
      else {res.json(result)}
    })
  } 
})

app.get("/api/ratingreferee/match_id=:match_id", (req,res) => {

  if(req.params.match_id !== undefined) {
    db.query("SELECT * FROM rate_referee WHERE match_id = ?", [req.params.match_id],(err, result,fields) => {
      if(err) {res.json("ERROR")}
      else {res.json(result)}
    })
  } 
})

app.put("/api/updateratereferee", (req,res) => {
  const match_id = req.body.match_id;
  const user_id = req.body.user_id;
  const referee_num = req.body.referee_num;
  const value = req.body.value;

  if(req.body.user_id !== undefined) {
    const sqlUpdate = "UPDATE rate_referee SET value = ? WHERE match_id = ? AND user_id = ? AND referee_num = ?";
    db.query(sqlUpdate,[value,match_id,user_id,referee_num] , (err, result) => {
     if (err) {
       console.log(err);
       } else {
       res.send(result);
       }
  })
  }
})

app.get('/api/comment_match/match_id=:match_id', (req,res,next) => {
  //res.json({message: "ok"});
  if(req.params.match_id !== undefined) {
    db.query("SELECT * FROM comment_match WHERE match_id = ?", [req.params.match_id],(err, result,fields) => {
      if(err) {res.json("ERROR")}
      else {res.json(result)}
    })
  } 
});


app.listen(3001, () => {
  console.log("bruh");
});
