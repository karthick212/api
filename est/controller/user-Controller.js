var dbconfig = require('../config/db')


var UserController = {
 // User Registration
  AddUser(user,callback) {
        let dg=Math.random().toString(36).slice(2);
        let referral=dg.substring(dg,5).toUpperCase();
        let insertQuery = 'INSERT INTO `tbl_userdetails`(id, Userid, Name, Mobile, Aadhar,Email, DOB, isActive,ReferralCode,CusRefCode) select ifnull(max(id),0)+1,ifnull(max(id),0)+1,?,?,?,?,?,1,?,? from tbl_userdetails'
        return dbconfig.query(insertQuery, [user.name, user.mobno, user.aadhar,user.email,user.dob,referral,user.refcode], (err, results) => {
        	if (results.affectedRows > 0) {
        return callback(null, results)
      		}
      		else {
      		return callback(null, results)	
      		}
        })
      },

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
