const dbconfig = require('../config/db')

var driverController = {
  // OTP
  DriverOtp(otp, role, callback) {
    var date = new Date();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    time = hours + ":" + minutes + ":" + seconds
    let RandomOtp = Math.floor(100000 + Math.random() * 900000)
    let status = 'verified'
    let todate = new Date().toISOString().slice(0, 10);
    let updateQry = "UPDATE tbl_otplist SET otp = '" + RandomOtp + "', date = '" + todate + "', time = '" + time + "'  WHERE mobile ='" + otp + "' and role='"+ role +"'"
    return dbconfig.query(updateQry, (err, results) => {
      // if (err) throw err;
      if (results.affectedRows > 0) {
        return callback(null, results, RandomOtp)
      } else {

        let insertQuery = 'INSERT INTO `tbl_otplist` (mobile, otp, date, time, role)VALUES (?,?,?,?,?)'
        return dbconfig.query(insertQuery, [otp, RandomOtp, todate, time, role], callback(null, results, RandomOtp))
      }
    })
  },
  // OTP Check
  checkOtp(userdata, cb) {
    let query = 'SELECT count(*) as cnt,ifnull((SELECT count(*) FROM tbl_userdetails WHERE isActive<>0 and Mobile=tbl_otplist.mobile),0) as usermob FROM tbl_otplist WHERE otp = ? and mobile = ? and role = ?'
    return dbconfig.query(query, [userdata.otp, userdata.number, userdata.role], (err, rows) => {
      if (rows[0].cnt > 0)
       {
        if(rows[0].usermob>0)
          return cb(null,cb,"Exist")
        else
          return cb(null,cb,"New")
       }
       else{
        return cb(null,0,"")        
       }
    })
  },

  // Driver Login
  DriverLogin(data, callback) {
    var username = data.username
    var password = data.password
    let query = 'SELECT * FROM tbl_driver_login WHERE driver_name = ? AND driver_password=?'
    dbconfig.query(query, [username, password], callback)
  },

  // driver List
  FetchAllDetails(callback) {
    return dbconfig.query('select * from driver', callback)
  },
  // Create Driver Profile
  Createprofiledetails(profileData, callback) {
    
    let querys = 'INSERT INTO `tbl_driver_general_detail` (`driver_name`, `driver_email`, `driver_phone`, `driver_lan`, `driver_address`, `driver_city`, `driver_pan_no`, `driver_adhaar_no`) VALUES (?,?,?,?,?,?,?,?)'
     return dbconfig.query(querys, [profileData.driver_name, profileData.driver_email, profileData.driver_phone, profileData.driver_lan, profileData.driver_address, profileData.driver_city, profileData.driver_pan_no, profileData.driver_adhaar_no], callback())
  },
 // FIle Uplaod
 CreatprofilImages(ImageData, header, callback){
  if (ImageData) {
    let updateQry = "UPDATE tbl_driver_general_detail SET driver_image = '" + ImageData[0] + "', driver_aadhar = '" + ImageData[1] + "', driver_license = '" + ImageData[2] + "', driver_voterId = '" + ImageData[3] + "', driver_vehicleImage = '" + ImageData[4] + "'  WHERE driver_name ='" + header + "'";
    return dbconfig.query(updateQry, callback)
  } else {
    return 'no-data'
  }
}
}

module.exports = driverController

