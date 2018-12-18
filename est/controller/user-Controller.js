var dbconfig = require('../config/db')

var UserController = {
 // User Registration
  AddUser(user,callback) {
        let insertQuery = 'INSERT INTO `tbl_userdetails`(id, Userid, Name, Mobile, Aadhar,Email, DOB, isActive) select ifnull(max(id),0)+1,ifnull(max(id),0)+1,?,?,?,?,?,1 from tbl_userdetails'
        return dbconfig.query(insertQuery, [user.name, user.mobno, user.aadhar,user.email,user.dob], (err, results) => {
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
        return dbconfig.query(insertQuery, [user.mobno], (err, results) => {
          if (results.affectedRows > 0) {
        return callback(null, results)
          }
          else {
          return callback(null, results)  
          }
        })
      }

}

module.exports = UserController
