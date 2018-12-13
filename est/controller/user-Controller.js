var dbconfig = require('../config/db')

var UserController = {
 // User Registration
  AddUser(user,callback) {
        let insertQuery = 'INSERT INTO `tbl_userdetails`(id, Userid, Name, Mobile, Aadhar, isActive) select ifnull(max(id),0)+1,ifnull(max(id),0)+1,?,?,?,1 from tbl_userdetails'
        return dbconfig.query(insertQuery, [user.name, user.mobile, user.aadhar], (err, results) => {
        	if (results.affectedRows > 0) {
        return callback(null, results)
      		}
      		else {
      		return callback(null, results)	
      		}
        })
      },
  UpdateUser(user,callback) {
        let insertQuery = 'Update `tbl_userdetails` set Name=?,Gender=?,Email=?,Aadhar=?,VoterId=?,PAN=? where Mobile=?'
        return dbconfig.query(insertQuery, [user.name, user.gender, user.email, user.aadhar, user.voterid, user.pan, user.mobile], (err, results) => {
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
