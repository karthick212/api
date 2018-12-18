const dbconfig = require('../config/db')
const Request = require("request");
var CommonController = {
 MessageTemplate(msgcode,cb){
    let qry='select MessageTemplate from tbl_messagetemplate where MessageCode=?';
    dbconfig.query(qry,[msgcode],(err,results) => {
      return cb(results[0].MessageTemplate)
    })
   },
 SendSMS(mobno,msg,cb){
     var Otpurl = 'http://manage.rkadsindia.in/SendSMS/sendmsg.php?uname=DCARGO&pass=123456&send=DCARGO&dest=' + mobno + '&msg=' + msg
     var dd = Request.get(Otpurl,(err,results)=>{
     if(results.statusCode=='200'){
      return cb('success')
     }
   else{
      return cb(err)
   }

     })
   }     
};
module.exports = CommonController;

