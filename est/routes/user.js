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
var nodemailer = require('nodemailer');


router.post('/sendmail', (request, response) => {  
  var res=request.body;

  //create the path of email template folder 
    // var templateDir = path.join(__dirname, "../", 'templates')

    // var testMailTemplate = new EmailTemplate(templateDir);
    // var locals = {
    //     userName: "XYZ" //dynamic data for bind into the template
    //   };
console.log(res);
      var transporter = nodemailer.createTransport({
        service: res.Service,
        host: res.Host,  
        secureConnection: true,
        port: res.Port,
        auth: {
      user: res.Username, // generated ethereal user
      pass: res.Password // generated ethereal password
    }
//     ,
//     tls:{
// secureProtocol: "TLSv1_method"
// }
});

      // testMailTemplate.render(locals, function (err, temp) {
      //   if (err) {
      //     console.log("error", err);

      //   } 
      //   else
        {
          var mailOptions = {
        from: res.From,
        to: res.To,
        subject: res.Subject,        
        html: res.Text
      };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
    //console.log(error);
    response.json({"msg": error});
  } else {
    //console.log('Email sent: ' + sd);
    console.log(res.Text);
    response.json({"msg":info.response});
  }
});
        }
        })

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
