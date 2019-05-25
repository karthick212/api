const dbconfig = require('../config/db')
const Request = require("request");
const common = require('../controller/common-Controller')
var distance = require('google-distance');
var geocoder = require('node-geocoder');
distance.apiKey = 'AIzaSyCZsnc36jrvx7sdu0iHfhAbtGGZXFOJ2nA';
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCZsnc36jrvx7sdu0iHfhAbtGGZXFOJ2nA', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geo = geocoder(options);

var UserController = {

AddBooking(user,callback) {
    console.log(user)
        var date = new Date();
        let todate = new Date().toISOString().slice(0, 10);
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();        
        time = hours + ":" + minutes + ":" + seconds;
        let RandomOtp = Math.floor(1000 + Math.random() * 9000)
        //let RandomOtp2 = Math.floor(1000 + Math.random() * 9000)
        let insertQuery = 'INSERT INTO `tbl_rentalbooking` (`BookingId`, `BookingSerial`, `BookingDate`, `BookingTime`, `FromRange`, `FromAddress`, `RentalPackage`,      `ProductType`,      `VehicleType`, `Amount`, `PaymentMode`, `CouponCode`, `CouponAmt`, `NetTotal`, `isCancel`, `isActive`, `Mobileno`, `OTP`, `BankRefNo`, `UserID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  let dd= dbconfig.query(insertQuery,                         [user.bid,    user.bserial,    todate,          time, user.fromrange,   user.fromadd, user.rentalpackage, user.producttype,  user.vehicletype,  user.amt,user.paymode,user.couponcode,user.couponamt,user.nettotal,user.iscancel,'1',user.usermob,RandomOtp,user.bankrefno,user.userid], (err, results) => {
          if (results.affectedRows > 0) {
            let ResMsg={};
            ResMsg.msg="success"+":"+RandomOtp;           
            common.MessageTemplate("RLBKOTP",(results)=>{
              let temp=results;
              temp=temp.replace('$bid$',user.bid);
              temp=temp.replace('$otp$',RandomOtp);
              //console.log(temp);
              common.SendSMS(user.usermob,temp,(results)=>{
                if(results!='success')
                  return callback(null,results)
              });
            });
           // if(ctype.indexOf('loc')>=0)
           // {
           //  common.MessageTemplate("CRBKOTPR",(results)=>{
           //    let temp=results;
           //    temp=temp.replace('$otp$',RandomOtp2);
           //    //console.log(temp);
           //    common.SendSMS(user.recmobile,temp,(results)=>{
           //      if(results!='success')
           //        return callback(null,results)
           //    });
           //  });
           // }
             return callback(null, ResMsg)
          }
          else {
          return callback(null, results)  
          }
        })
        //console.log(dd)
      }, 
    RentalRates(city,pack,cb){
//    let qry='select CategoryVehicle,offerprice from vw_Rentalrate where ServiceCity=? and RentalPackages=?';


console.log(city)
 let qry='select CategoryVehicle,offerprice from vw_rentalrate where ServiceCity=? and RentalPackages=?';

    dbconfig.query(qry,[city,pack],(err,results) => {
      return cb(null,results)
    })
   },  
    BillNoGen(cb){
    let qry='select ifnull(max(BookingSerial),0)+1 as cnt from tbl_rentalbooking';
    dbconfig.query(qry,(err,results) => {
      //console.log(results);
      return cb(results)
    })
   },
  DistCalc(rate1,rate2,dist,cb)
  {
    let ResMsg = {}
    try {             
      let firstkm=rate1
      let secndkm=rate2
      Amt=firstkm;
      let diff=dist-4
      if(Math.sign(diff)!=-1)
      {
        for(var i=0;i<parseInt(diff);i++)
          Amt+=secndkm
      }
      ResMsg.SAmt=Amt
      ResMsg.localdist=dist
      return cb(ResMsg)
    } 
    catch(e) { } 
  }
};
module.exports = UserController;

