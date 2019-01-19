const express = require("express");
const router = express.Router();
const rentalActivity = require("../controller/rental-Controller");

// Parcel Calculation
router.post("/Calc", function(request, response) {
  let ResMsg={};
  let param=request.body;
  //let param=request.query;
  rentalActivity.AmountCalc(param, (err, res) =>{
  if (err) {
        response.json(err);
      } 
  else {
//console.log(res)    
let small=param.small.substring(1,param.small.length);
let medium=param.medium.substring(1,param.medium.length);
let large=param.large.substring(1,param.large.length);
let xl=param.xl.substring(2,param.xl.length);

if(param.parceltype.indexOf('loc')>=0)
{
  res.LSAmt*=small;
  res.LMAmt*=medium;
  res.LLAmt*=large;
  res.LXAmt*=xl;
}
else if(param.parceltype.indexOf('loc')!=0)
{
  res.DSAmt*=small;
  res.DMAmt*=medium;
  res.DLAmt*=large;
  res.DXAmt*=xl;
}
let Total=res.LSAmt+res.LMAmt+res.LLAmt+res.LXAmt+res.DSAmt+res.DMAmt+res.DLAmt+res.DXAmt+res.HAmt;
ResMsg = res
ResMsg.Total=Total

response.json(ResMsg);
      }
    });
});

// Parcel Booking
router.post('/AddBooking', (request, response)=> {
  let ResMsg;
  let RetVal={};
  //if (otpdata != null) 
  {
    rentalActivity.BillNoGen((results)=>{
      request.body.bserial=results[0].cnt;
      request.body.bid='R'+FormatNumberLength(request.body.bserial,5);
      //console.log(results);
    rentalActivity.AddBooking(request.body, (err, res) => {
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
  let a = rentalActivity.test();
  response.json(a);
});


/*
router.post("/FindRate", (request, response) => {
  let param=request.body;
  //let param=request.query;
  rentalActivity.RentalRates(param,(err,res)=>{
    console.log(res)
    response.json(res)
  });
});*/



router.get("/FindRate", (request, response) => {
 // let param=request.body;
  var city=request.param('city');
  var pack=request.param('pack');
  //var flat=request.param('pack');
  //let param=request.query;  
  console.log(city+"--"+pack);
 let ResMsg={};
  rentalActivity.RentalRates(city,pack,(err,res)=>{
    console.log(res)
	ResMsg.data=res;
    response.json(ResMsg)
  });
});


module.exports = router;

