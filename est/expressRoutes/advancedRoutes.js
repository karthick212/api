var express = require('express');
var app = express();
var itemRoutes = express.Router();
var dbconfig = require('../config/db');
//var tbl_RentalCompany = require('../server/controller/admin-Controller');

//MessageTemplate
itemRoutes.route('/MessageTemplate').get(function(req,res,err){
//tbl_messagetemplate.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_messagetemplate",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/MessageTemplate/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_messagetemplate",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/MessageTemplate/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_messagetemplate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/MessageTemplate/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_messagetemplate VALUES (?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.mcode, req.body.mname, req.body.note,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/MessageTemplate/update').post(function(req,res,err){
  var qry="update tbl_messagetemplate set MessageCode=?,MessageName=?,MessageTemplate=? where id=?";
  var itm= dbconfig.query(qry, [req.body.mcode, req.body.mname, req.body.note, req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/MessageTemplate/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_messagetemplate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Offers
itemRoutes.route('/CommonOffers').get(function(req,res,err){
//tbl_CommonOffers.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_commonoffers",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CommonOffers/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_commonoffers",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CommonOffers/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_commonoffers where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/CommonOffers/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_commonoffers VALUES (?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedcity, req.body.selectedType, req.body.offercode, req.body.offerrate, req.body.note, req.body.image,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/CommonOffers/update').post(function(req,res,err){
  var qry="update tbl_commonoffers set ServiceCity=?,Type=?,OfferCode=?,OfferRate=?,Content=?,image=? where id=?";
  var itm= dbconfig.query(qry, [req.body.selectedcity, req.body.selectedType, req.body.offercode, req.body.offerrate, req.body.note, req.body.image, req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/CommonOffers/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_commonoffers where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//SharePass
itemRoutes.route('/SharePass').get(function(req,res,err){
//tbl_sharepass.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select *,(select ServiceArea from tbl_servicearea where id=tbl_sharepass.ServiceCityCode) as ServiceCity from tbl_sharepass",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/SharePass/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_sharepass",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/SharePass/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_sharepass where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/SharePass/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_sharepass VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedcity, req.body.selectedkms, req.body.selectedsize, req.body.rides, req.body.days, req.body.maxprice, req.body.disprice, req.body.flat, req.body.offerp, req.body.desc, req.body.image,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/SharePass/update').post(function(req,res,err){
  var qry="update tbl_sharepass set ServiceCityCode=?,KMs=?,Size=?,Rides=?,Days=?,MaxPrice=?,DispPrice=?,FlatPrice=?,OfferP=?,Description=?,Picture=? where id=?";
  var itm= dbconfig.query(qry, [ req.body.selectedcity, req.body.selectedkms, req.body.selectedsize, req.body.rides, req.body.days, req.body.maxprice, req.body.disprice, req.body.flat, req.body.offerp, req.body.desc, req.body.image, req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/SharePass/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_sharepass where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});


//FAQ
itemRoutes.route('/FAQ').get(function(req,res,err){
//tbl_faq.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_faq",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/FAQ/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_faq",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/FAQ/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_faq where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/FAQ/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_faq VALUES (?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.ques, req.body.link, req.body.desc, req.body.cuser, req.body.cdriver,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/FAQ/update').post(function(req,res,err){
  var qry="update tbl_faq set QuestionBody=?,QuestionLink=?,Description=?,isUser=?,isDriver=? where id=?";
  var itm= dbconfig.query(qry, [ req.body.ques, req.body.link, req.body.desc, req.body.cuser, req.body.cdriver, req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/FAQ/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_faq where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});


//Reason
itemRoutes.route('/Reason').get(function(req,res,err){
//tbl_reason.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_reason",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/Reason/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_reason",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/Reason/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_reason where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/Reason/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_reason VALUES (?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.reason, req.body.cuser, req.body.cdriver,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/Reason/update').post(function(req,res,err){
  var qry="update tbl_reason set Reason=?,isUser=?,isDriver=? where id=?";
  var itm= dbconfig.query(qry, [ req.body.reason, req.body.cuser, req.body.cdriver, req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/Reason/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_reason where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
module.exports = itemRoutes;

