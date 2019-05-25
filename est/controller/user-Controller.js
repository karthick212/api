var dbconfig = require('../config/db')


var UserController = {
 // User Registration
     AddUser(user,callback) {

  let dg=Math.random().toString(36).slice(2);
  let referral=dg.substring(dg,5).toUpperCase();
  var date = new Date();
  let todate = new Date().toISOString().slice(0, 10);
  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_userdetails",(err2,result2)=>{
    if(user.refcode!='')
    {
     dbconfig.query("select id from tbl_couponmaster where isActive<>'0' and couponType='Referral'",(err1,ress1)=>{
      let ret=dbconfig.query("select * from tbl_userdetails where ReferralCode=?",[user.refcode],(err,ress)=>{
        if(ress.length>0){
          var arr=[]
          let qry = " INSERT INTO `tbl_coupondetails` (`Date`, `UserId`, `Mobileno`, `Couponid`, `Debit`, `Credit`, `isActive`) VALUES ('"+todate+"', ?, ?,?, '1', '0', '1')"
          arr.push(ress[0].Userid); 
          arr.push(ress[0].Mobile); 
          arr.push(ress1[0].id); 
          dbconfig.query(qry,arr);  
        }
        else
        {
          console.log('Referral Failed');
        }
      })
    })
    }

    dbconfig.query("select id from tbl_couponmaster where isActive<>'0' and couponType='Starter'",(err1,result1)=>{
      if(result1) { 
        result1.map(d=>{ 
          var arr=[]
          let qry = " INSERT INTO `tbl_coupondetails` (`Date`, `UserId`, `Mobileno`, `Couponid`, `Debit`, `Credit`, `isActive`) VALUES ('"+todate+"', '"+result2[0].id+"', ?,?, '1', '0', '1')"
          arr.push(user.mobno); 
          arr.push(d.id); 
          dbconfig.query(qry,arr);
        })
      }
    })

      var arr1=[user.name, user.mobno, user.aadhar,user.email,user.dob,referral,user.refcode,todate]
      let insertQuery = "INSERT INTO `tbl_userdetails`(id, Userid, Name, Mobile, Aadhar,Email, DOB, isActive,ReferralCode,CusRefCode,Date) select ifnull(max(id),0)+1,ifnull(max(id),0)+1,?,?,?,?,?,1,?,?,? from tbl_userdetails  "
      return dbconfig.query(insertQuery, arr1, (err, results) => {
        if (results.affectedRows > 0) {
          return callback(null, results)
        }
        else {
          return callback(null, results)  
        }
      })  
  })
} ,

  UpdateUser(user,callback) {
        let insertQuery = 'Update `tbl_userdetails` set Name=?,Gender=?,Email=?,Aadhar=?,DocType=?,DocNo=?,dob=?  where Mobile=?'
        return dbconfig.query(insertQuery, [user.name, user.gender, user.email, user.aadhar, user.doctype, user.docno, user.dob, user.mobno], (err, results) => {
          if (results.affectedRows > 0) {
        return callback(null, results)
          }
          else {
          return callback(null, results)  
          }
        })
      },
  getUserValue(user,callback) {
        let insertQuery = 'select * from tbl_userdetails where Mobile=?'
        return dbconfig.query(insertQuery,user, (err, results) => {
console.log(results)
          if (results.affectedRows > 0) {
	console.log(results)
        return callback(null, results)
          }
          else {
          return callback(null, results)  
          }
        })
      }

}

module.exports = UserController
