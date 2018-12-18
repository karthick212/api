const express = require("express");
const router = express.Router();
const courierActivity = require("../controller/courier-Controller");

// OTP-API
router.post("/otp", function(request, response) {
  let otpdata = { mob: request.body.number };

  let ResMsg;
  if (otpdata != null) {
    courierActivity.courierDetails(otpdata, (err, row, fields) => {
      if (err) {
        response.json(err);
      } else {
        debugger;
        console.log(row);
        response.json(row);
      }
    });
  }
});

// Courier Calculation
router.post("/Calc", function(request, response) {
let ResMsg;
  //if (otpdata != null) 
  {
    courierActivity.AmountCalc(request.body, (err, res) => {
      if (err) {
        response.json(err);
      } else {
        debugger;
        //console.log(row);        
        res.Total=res.BAmt1+res.BAmt2+res.DAmt1+res.DAmt2;
        response.json(res);
      }
    });
  }
});

// Courier Booking
router.post('/AddBooking', (request, response)=> {
  let ResMsg;
  let RetVal={};
  //if (otpdata != null) 
  {
    courierActivity.BillNoGen((results)=>{
      
      request.body.bserial=results[0].cnt;
      request.body.bid='C'+FormatNumberLength(request.body.bserial,5);
      //console.log(results);
    courierActivity.AddBooking(request.body, (err, res) => {
      if (err) {
        response.json(err);
      } else {
        debugger;
        //console.log(row);        
        //res.Total=res.BAmt1+res.BAmt2+res.DAmt1+res.DAmt2;
        response.json(res);
      }
    })
  })
  }
});
function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

router.get("/test", (request, response) => {
  let a = courierActivity.test();
  response.json(a);
});
module.exports = router;
