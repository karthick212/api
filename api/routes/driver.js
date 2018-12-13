const express = require('express')
const router = express.Router()
const Request = require('request')
const { parse } = require('querystring')
var multer = require('multer')
// var upload = multer({ dest: 'upload/driver' })
var FormData = require('form-data')
var form = new FormData()
// var jsonParser = body_parser.urlencoded()
const driverActivity = require('../controller/driver-Controller')
const jwt = require('jsonwebtoken')
// login
router.post('/login', function (req, res, next) {
  driverActivity.DriverLogin(req.body, (err, rows) => {
    if (err) {
      res.send('Server Error')
    } else {
      if (rows) {
        rows.map(data => {
          console.log(data)
        })
      }
      if (rows.length > 0) {
        let token = jwt.sign({ data: rows }, SECRET_KEY, { expiresIn: '10s' })
        let result = {
          status: true,
          username: rows[0].driver_name,
          token: token
        }
        res.send(result)
      } else {
        let result = {
          'message': 'Please Enter Valid Username & Password'
        }
        res.send(result)
      }
    }
  })
})

// router.get('/FetchAllDetails', function (req, res, next) {
//   driverActivity.FetchAllDetails((err, rows) => {
//     if (err) {
//       res.json(err)
//     } else {
//       res.json(rows)
//     }
//   })
// })

// router.get('/detail', function (req, res, next) {
//   console.log('di')
// })


// OTP-API
router.post('/otp', (request, response) => {
  let Mobilenum = request.body.number
  let Role = request.body.role
  let ResMsg = {}
  driverActivity.DriverOtp(Mobilenum, Role, (err, rows, otp) => {
    if (err) throw err
    if (rows) {
      const smsCont =
      'Dear Customer, your OTP for SMS notification registration is ' +
      otp +
      '. Use this OTP to register.';
      var Otpurl = 'http://manage.rkadsindia.in/SendSMS/sendmsg.php?uname=DCARGO&pass=123456&send=DCARGO&dest=' + Mobilenum + '&msg=' + smsCont
      let tokens = jwt.sign({ data: rows }, SECRET_KEY, { expiresIn: '10s' })
      Request.get(Otpurl)
      ResMsg.status = 'success'
      ResMsg.token = tokens
    } else {
      ResMsg.message = 'Invalid Mobile Number'
      ResMsg.status = 'fail'
    }
    response.json(ResMsg)
  })
})

// checkotp
router.post('/checkotp', (req, res) => {
  driverActivity.checkOtp(req.body, (err, row, status) => {
    if (err) throw err
    if (row.length) {
      let result = {'message': 'success','status':status }
      res.send(result)
    } else {
      let result = {'message': 'Wrong OTP','status':'' }
      res.send(result)
    }
  })
})

// create Profile
router.post('/createProfile', (req, res) => {
  driverActivity.Createprofiledetails(req.body, (err, count) => {
    if (err) {
      res.json(err)
    } else {
      
      res.json('success')
    }
  })
})

var storage = multer.diskStorage(
  {
      destination: 'upload/driver',
      filename: function ( req, file, cb ) {
          cb( null, file.originalname );
      }
  }
);
var upload = multer( { storage: storage } );

// Profile Image
// var cpUpload = upload.fields([{ name: 'driver_image', maxCount: 1, path }, { name: 'driver_aadhar', maxCount: 1 }])
router.post('/createProfileImage', upload.array('driver_files'), (req, res) => {
  let header;
 if(req.headers['driver_name']){
    header = req.headers['driver_name']
 }
let driver = [];
  req.files.map((res,index) => {
    driver[index]=res.path;
   })
// return driver
driverActivity.CreatprofilImages(driver, header,(err, result) => {
  if(err) throw err;
  if(result) {
    let result = {'message': 'success'}
      res.send(result)
  }
});
})
module.exports = router
