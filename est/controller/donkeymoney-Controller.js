const dbconfig = require('../config/db')
const Request = require("request");
const common = require('../controller/common-Controller')

var UserController = {
  AddMoney(user,callback) {
        var date = new Date();
        let todate = new Date().toISOString().slice(0, 10);
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        time = hours + ":" + minutes + ":" + seconds;
        let RandomOtp = Math.floor(1000 + Math.random() * 9000)
        let RandomOtp2 = Math.floor(1000 + Math.random() * 9000)

        let insertQuery = 'INSERT INTO `tbl_voucher` (`VoucherNo`, `Date`, `Time`, `VoucherType`,   `Userid`,   `Mobileno`,   `Debit`,    `Credit`, `RefNo`, `isActive`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        return dbconfig.query(insertQuery,            [user.vouno, todate,  time, user.vouchertype, user.userid,user.mobno,user.debit, user.credit, user.refno,'1'], (err, results) => {
          if (results.affectedRows > 0) {
            let ResMsg={};
            ResMsg.msg="success"           
            return callback(null, ResMsg)
          }
          else {
          return callback(null, results)  
          }
        })
      }, 
    VouNoGen(vtype,cb){
    let qry='select ifnull(max(VoucherNo),0)+1 as cnt from tbl_voucher where VoucherType=?';
    dbconfig.query(qry,[vtype],(err,results) => {
      //console.log(results);
      return cb(results)
    })
   },
  test() {
    return "c";
  }
};

module.exports = UserController;

