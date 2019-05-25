const dbconfig = require('../config/db')
const Request = require("request");
const express = require("express");
const router = express.Router();
const moneyaCtivity = require("../controller/donkeymoney-Controller");

router.post('/AddMoney', (request, response)=> {
  let ResMsg;
  let RetVal={};
  //console.log(request);
  //if (otpdata != null)
  let reqq=request.body;
  {
    moneyaCtivity.VouNoGen(reqq.vouchertype,(results)=>{
      request.body.vouno=results[0].cnt;
      moneyaCtivity.AddMoney(request.body, (err, res) => {
        if (err) {
          response.json(err);
        } else {
        //console.log(row);
        response.json(res);
      }
    })
    })
  }
});

router.get("/GetMoney", (request, response) => {
  let req=request.query;
  let qry='select Balance,moneyHeader from vw_customerbalance where Mobile=?';
    let qq=dbconfig.query(qry,[req.mobno],(err,results) => {
      response.json(results);
      //return cb(results)
    })
    //console.log(qq);
  //response.json(a);
});

function FormatNumberLength(num, length) {
  var r = "" + num;
  while (r.length < length) {
    r = "0" + r;
  }
  return r;
}

router.get("/test", (request, response) => {
  let a = moneyaCtivity.test();
  response.json(a);
});
module.exports = router;


