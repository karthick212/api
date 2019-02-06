const express = require('express')
const router = express.Router()
const Request = require('request')
const { parse } = require('querystring')
var multer = require('multer')
// var upload = multer({ dest: 'upload/driver' })
var FormData = require('form-data')
var form = new FormData()
// var jsonParser = body_parser.urlencoded()
const userActivity = require('../controller/user-Controller')
const jwt = require('jsonwebtoken')
var dbconfig = require('../config/db')

// Add User
router.post('/adduser', (request, response) => {  
  let ResMsg = {}  
  userActivity.AddUser(request.body, (err, rows) => {
    if (err) throw err
    if (rows.affectedRows>0) {      
      ResMsg.status = 'success'
    } else {
      ResMsg.message = 'Invalid Entry'
      ResMsg.status = 'fail'
    }
    response.json(ResMsg)
  })
})

// Update User
router.post('/updateuser', (request, response) => {  
  let ResMsg = {}  
  userActivity.UpdateUser(request.body, (err, rows) => {
    if (err) throw err

    if (rows.affectedRows) {      
      ResMsg.status = 'success'
    } else {
      ResMsg.message = 'Invalid Entry'
      ResMsg.status = 'fail'
    }
    response.json(ResMsg)
  })
})

// View User
router.get('/viewUser', (request, response) => {  
  let ResMsg = {}
var mobno=request.param("mobno");  
  userActivity.getUserValue(mobno, (err, rows) => {
    if (err) throw err
    if (rows) {      
      //ResMsg.status = 'success'
      ResMsg.data=rows
    } else {
      ResMsg.message = 'Invalid Entry'
      ResMsg.status = 'fail'
    }
    response.json(ResMsg)
//response.send(JSON.stringify(ResMsg))
  })
})

//Referral
router.get('/Referral',function(req,res,err){
  var itemss=  dbconfig.query("select ReferralCode from tbl_userdetails where mobile=?",[req.query.mobno],function(err,result,fields){
    if(err){
      res.json(err);
    }else{
      res.json(result);
    }  
  });  
});

module.exports = router
