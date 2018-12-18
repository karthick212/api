const dbconfig = require('../config/db')
const Request = require("request");
const common = require('../controller/common-Controller')
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
AmountCalc(res, cb) { 
      let ResMsg = {};
      let fs=res.fromstate;
      let ts=res.tostate;
      let ctype=res.couriertype;
      let cname=res.couriername;
      let BL1=res.BL1;
      let BB1=res.BB1;
      let BH1=res.BH1;
      let BL2=res.BL2;
      let BB2=res.BB2;
      let BH2=res.BH2;

      let BT1=(BL1*BB1*BH1)/5000;
      let BT2=(BL2*BB2*BH2)/5000;

      let cond="";
     //console.log(ctype);
      if(ctype.indexOf('loc')>=0){ cond=' and Area=\'Local\'' ;}

      //let query = 'SELECT count(*) as cnt,ifnull((SELECT count(*) FROM tbl_userdetails WHERE isActive<>0 and Mobile=tbl_otplist.mobile),0) as usermob FROM tbl_otplist WHERE otp = ? and mobile = ? and role = ?'
      let query='select Oprice from tbl_courierrate where Couriername=? and DocumentLength=? and DocumentBreadth=? and FromState like ? and ToState like ?'+cond
      dbconfig.query(query, [cname,res.DL1,res.DB1,'%'+fs+'%','%'+ts+'%'], (err, rows) => { try{ ResMsg.DAmt1 = rows[0].Oprice; } catch (e) {  ResMsg.DAmt1=0 } });
      dbconfig.query(query, [cname,res.DL2,res.DB2,'%'+fs+'%','%'+ts+'%'], (err, rows) => { try{ ResMsg.DAmt2 = rows[0].Oprice; } catch(e) { ResMsg.DAmt2=0; } });

      query='select Oprice from tbl_courierrate where Couriername=? and BoxWeight>=? and FromState like ? and ToState like ? '+cond+'order by BoxWeight'
      dbconfig.query(query, [cname,BT1,'%'+fs+'%','%'+ts+'%'], (err, rows) => { try{ ResMsg.BAmt1 = rows[0].Oprice } catch(e) { ResMsg.BAmt1=0; }})
      dbconfig.query(query, [cname,BT2,'%'+fs+'%','%'+ts+'%'], (err, rows) => { try{ ResMsg.BAmt2 = rows[0].Oprice; } catch(e){ ResMsg.BAmt2=0; } return cb(null,ResMsg)})

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
