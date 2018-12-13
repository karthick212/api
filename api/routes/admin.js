const express = require("express");
const router = express.Router();
const adminActivity = require("../controller/admin-Controller");
const jwt = require("jsonwebtoken");
SECRET_KEY = "thisismysecretkey";

router.get("/FetchAllData", function(req, res, next) {
  adminActivity.FetchAllDetails((err, rows) => {
    console.log(rows);
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/login", function(req, res, next) {
  adminActivity.LoginAdmin(req.body, (err, rows) => {
    if (err) {
      res.send("Server Error");
    } else {
      if (rows.length > 0) {
        let username;
        let password;
        console.log(rows[0]);
        for (let i = 0; i < rows.length; i++) {
          username = rows[i].username;
          password = rows[i].password;
        }
        var token = jwt.sign({ data: rows }, SECRET_KEY, { expiresIn: "10s" });
        // if (!username) {
        //     res.send("Please Enter Your Username")
        // }else if(!password){
        //     res.send("Please Enter Your Username")
        // }
        let result = {
          status: true,
          username: username,
          token: token
        };
        res.send(result);
      } else {
        res.send("Please Enter Your Username & Password");
      }
    }
  });
});

router.post("/addAdmin", (req, res, next) => {
  // console.log(req.body)
  adminActivity.RegisterAdmin(req.body, (err, count) => {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

module.exports = router;
