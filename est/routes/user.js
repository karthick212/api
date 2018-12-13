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

// Add User
router.post('/adduser', (request, response) => {  
  let ResMsg = {}  
  userActivity.AddUser(request.body, (err, rows) => {
    if (err) throw err
    if (rows) {      
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
  userActivity.AddUser(request.body, (err, rows) => {
    if (err) throw err
    if (rows) {      
      ResMsg.status = 'success'
    } else {
      ResMsg.message = 'Invalid Entry'
      ResMsg.status = 'fail'
    }
    response.json(ResMsg)
  })
})

module.exports = router