const dbconfig = require('../config/db')
const Request = require("request");
const common = require('../controller/common-Controller')
var distance = require('google-distance');
distance.apiKey = 'AIzaSyCZsnc36jrvx7sdu0iHfhAbtGGZXFOJ2nA';

var UserController = {
  courierDetails(otpdata, callback) {
    let resp;
    let RandomOtp = Math.floor(100000 + Math.random() * 900000);
    let smsCont =
      "Dear Customer, your OTP for SMS notification registration is " +
      RandomOtp +
      ". Use this OTP to register.";
    let sendMsg =
      "http://manage.rkadsindia.in/SendSMS/sendmsg.php?uname=DCARGO&pass=123456&send=DCARGO&dest=" +
      otpdata.mob +
      "&msg=" +
      smsCont;
    return dbconfig.query(
      "UPDATE tbl_otplist SET otp = '" +
      RandomOtp +
      "' WHERE mob ='" +
      otpdata.mob +
      "'",
      function (error, results, fields) {
        if (results > 0) {
          // Request.get(sendMsg);
          resp = [{ otp: RandomOtp }];
          callback(null, success)
        } else {
          let insertQuery = "INSERT INTO tbl_otplist VALUES (?,?,?)";
          dbconfig.query(
            insertQuery,
            [otpdata.id, otpdata.mob, RandomOtp],
            callback
          );
          // Request.get(sendMsg);
          resp = [{ otp: RandomOtp }];
          callback(null, success)
        }
      }
    );
  },
AmountCalc(flat,flong,fs,ts,ctype,cname,DL1,DB1,DL2,DB2,BL1,BB1,BH1,BL2,BB2,BH2,res, cb)  {  
      let ResMsg = {};
      /* let flat=res.flat
      let flong=res.flong
      let fs=res.fromstate;
      let ts=res.tostate;
      let ctype=res.couriertype;
      let cname=res.couriername;
      let BL1=res.BL1;
      let BB1=res.BB1;
      let BH1=res.BH1;
      let BL2=res.BL2;
      let BB2=res.BB2;
      let BH2=res.BH2;*/

      let BT1=(BL1*BB1*BH1)/5000;
      let BT2=(BL2*BB2*BH2)/5000;

      let cond="";
      if(ctype.indexOf('loc')>=0){ cond=' and Area=\'Local\'' ;console.log(cond);}

      let query='select Oprice from tbl_courierrate where Couriername=? and DocumentLength=? and DocumentBreadth=? and CourierType=? and FromState like ? and ToState like ?'+cond
      dbconfig.query(query, [cname,DL1,DB1,'Document','%'+fs+'%','%'+ts+'%'], (err, rows) => { try{ ResMsg.DAmt1 = rows[0].Oprice} catch(e) { ResMsg.DAmt1=0; } })
      dbconfig.query(query, [cname,DL2,DB2,'Document','%'+fs+'%','%'+ts+'%'], (err, rows) => { try{ ResMsg.DAmt2 = rows[0].Oprice} catch(e) { ResMsg.DAmt2=0; } })

      query='select Oprice from tbl_courierrate where Couriername=? and BoxWeight>? and CourierType=? and FromState like ? and ToState like ? and BoxWeight>0 '+cond+'order by BoxWeight'
      if(BT1>0){ dbconfig.query(query, [cname,BT1,'Box','%'+fs+'%','%'+ts+'%'], (err, rows) => { try{ ResMsg.BAmt1 = rows[0].Oprice } catch(e) { ResMsg.BAmt1=0; }})} else {ResMsg.BAmt1=0 }
      if(BT2>0){ dbconfig.query(query, [cname,BT2,'Box','%'+fs+'%','%'+ts+'%'], (err, rows) => { try{ ResMsg.BAmt2 = rows[0].Oprice; } catch(e){ ResMsg.BAmt2=0; }})} else { ResMsg.BAmt2=0 }

      let dqry='SELECT id,latitude,longitude,Area, ( 3959 * acos( cos( radians(?) ) * cos( radians( Latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( Latitude ) ) ) ) AS distance FROM tbl_courierlink HAVING distance < 25 ORDER BY distance LIMIT 0 , 1'
      dbconfig.query(dqry,[flat,flong,flat],(err,rows)=>{
        //let gqry='https://maps.googleapis.com/maps/api/distancematrix/json?origins='+res.flat+','+res.flong+'&destinations='+rows[0].latitude+','+rows[0].longitude+'&mode=driving&language=en-EN&sensor=false&key=AIzaSyCZsnc36jrvx7sdu0iHfhAbtGGZXFOJ2nA'
          let Amt=0;
          distance.get({origin:flat+','+flong,destination:rows[0].latitude+','+rows[0].longitude },(err,rowss)=>{
          let query='select * from tbl_courierconfig'
          let dist=rowss.distanceValue/1000
          dbconfig.query(query, (err, rows) => { 
          try {             
          let firstkm=rows[0].studentMinRate+rows[0].DMinRate
          let secndkm=rows[0].studentAddlRate+rows[0].DAddlRate
          Amt=firstkm;
          let diff=dist-1.2
          if(Math.sign(diff)!=-1)
          {
            for(var i=0;i<parseInt(diff);i++)
              Amt+=secndkm
          }
          ResMsg.SAmt=Amt
          return cb(null,ResMsg)
        } 
        catch(e) { } 
        })                  
      })
        //console.log(dc)
      });     

      //return cb(null,ResMsg)
   },
AddBooking(user,callback) {
        var date = new Date();
        let todate = new Date().toISOString().slice(0, 10);
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        time = hours + ":" + minutes + ":" + seconds;
        let RandomOtp = Math.floor(1000 + Math.random() * 9000)
        let insertQuery = 'INSERT INTO `tbl_courierbooking` (`BookingId`, `BookingSerial`, `BookingDate`, `BookingTime`, `FromRange`, `ToRange`, `FromAddress`, `ToAddress`, `CourierType`, `CourierName`, `ProductType`, `LocalAdd1`, `LocalAdd2`, `LocalAdd3`,          `DL1`,      `DB1`,    `DAmt1`,   `DL2`,   `DB2`,  `DAmt2`,    `BL1`,   `BB1`,  `BH1`,   `BW1`,  `BAmt1`,   `BL2`,   `BB2`,  `BH2`,    `BW2`, `BAmt2`,     `Total`, `PaymentMode`, `CouponCode`, `CouponAmt`,     `NetTotal`,   `isCancel`, `isActive`, `MobileNo`, `OTP`, `BankRefNo`, `UserID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return dbconfig.query(insertQuery,                  [user.bid,    user.bserial,    todate,          time,       user.fromrange,user.torange,user.fromadd,user.toadd, user.ctype,       user.cname,  user.product,   user.localadd1,user.localadd2,user.localadd3,user.dl1,user.db1,user.damt1,user.dl2,user.db2,user.damt2,user.bl1,user.bb1,user.bh1,user.bw1,user.bamt1,user.bl2,user.bb2,user.bh2,user.bw2,user.bamt2,user.total,user.paymode,user.couponcode,user.couponamt,user.nettotal,user.iscancel,'1',user.mobno,RandomOtp,user.bankrefno,user.userid], (err, results) => {
          if (results.affectedRows > 0) {
            let ResMsg={};
            ResMsg.msg="success"           
            common.MessageTemplate("BOOKOTP",(results)=>{
              let temp=results;
              temp=temp.replace('$bid$',user.bid);
              temp=temp.replace('$otp$',RandomOtp);
              //console.log(temp);
              common.SendSMS(user.mobno,temp,(results)=>{
                if(results!='success')
                  return callback(null,results)
              });
            });
            return callback(null, ResMsg)
          }
          else {
          return callback(null, results)  
          }
        })
      }, 
    BillNoGen(cb){
    let qry='select ifnull(max(BookingSerial),0)+1 as cnt from tbl_courierbooking';
    dbconfig.query(qry,(err,results) => {
      //console.log(results);
      return cb(results)
    })
   },
  test() {
    return "c";
  }
};
module.exports = UserController;
