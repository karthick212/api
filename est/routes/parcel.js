const express = require("express");
const router = express.Router();
const parcelActivity = require("../controller/parcel-Controller");

// Parcel Calculation
router.get("/Calc", function(request, response) {
  let ResMsg={};
  //let param=request.param
console.log(request.query);


var flat=request.param('flat');
var flong=request.param('flong');
var tlat=request.param('tlat');
var tlong=request.param('tlong');
var tlong=request.param('flat');
var fromcity=request.param('fromcity');
var tocity=request.param('tocity');
var parcelcat=request.param('parcelcat');
var parceltype=request.param('parceltype');
var small1=request.param('small');
var medium1=request.param('medium');
var large1=request.param('large');
var xl1=request.param('xl');
//console.log(param);
  //let param=request.query;
  console.log("cat1==>"+parcelcat);
 parcelActivity.AmountCalc(flat,flong,tlat,tlong,fromcity,tocity,parcelcat,parceltype,small1,medium1,large1,xl1, (err, res) =>{
  if (err) {
        response.json(err);
      }
  else {
//console.log(res)
 var small=small1.substring(1,small1.length);
 var medium=medium1.substring(1,medium1.length);
 var large=large1.substring(1,large1.length);
 var xl=xl1.substring(2,xl1.length);
var ress=[];

if(parceltype.indexOf('loc')>=0)
{
  res.LSAmt*=small;
  res.LMAmt*=medium;
  res.LLAmt*=large;
  res.LXAmt*=xl;
}
else if(parceltype.indexOf('loc')!=0)
{
  res.DSAmt*=small;
  res.DMAmt*=medium;
  res.DLAmt*=large;
  res.DXAmt*=xl;
}
let Total=res.LSAmt+res.LMAmt+res.LLAmt+res.LXAmt+res.DSAmt+res.DMAmt+res.DLAmt+res.DXAmt+res.HAmt;
//ResMsg = res
//ResMsg.Total=Total

ress[0] = {'LSAmt':res.LSAmt,'LMAmt':res.LMAmt,'LLAmt':res.LLAmt,'DSAmt':res.DSAmt,'DMAmt':res.DMAmt,'DLAmt':res.DLAmt,'HAmt':res.HAmt,'Total':Total,'dist':res.dist}
ResMsg.data=ress;
//response.json(ResMsg);


response.json(ResMsg);
      }
    });
});



router.post('/AddBooking', (request, response)=> {
  let ResMsg;
  let RetVal={};
  //console.log(request);
  //if (otpdata != null)
  {
    parcelActivity.BillNoGen((results)=>{
      request.body.bserial=results[0].cnt;
      request.body.bid='P'+FormatNumberLength(request.body.bserial,5);
      //console.log(results);
    parcelActivity.AddBooking(request.body, (err, res) => {
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
  let a = parcelActivity.test();
  response.json(a);
});
module.exports = router;

