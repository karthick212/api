var express = require('express');
var app = express();
var itemRoutes = express.Router();
var dbconfig = require('../config/db');
//var tbl_ParcelCompany = require('../server/controller/admin-Controller');

//Parcel Company
itemRoutes.route('/ParcelCompany').get(function(req,res,err){
//tbl_ParcelCompany.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_parcelcompany",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ParcelCompany/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_parcelcompany",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ParcelCompany/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_parcelcompany where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/ParcelCompany/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_parcelcompany VALUES (?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.parcelname, req.body.selectedcity, req.body.lati, req.body.long,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/ParcelCompany/update').post(function(req,res,err){
  var qry="update tbl_parcelcompany set ParcelName=?,City=?,Latitude=?,Longitude=? where id=?";
  var itm= dbconfig.query(qry, [req.body.parcelname,req.body.selectedcity,req.body.lati,req.body.long,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/ParcelCompany/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_parcelcompany where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//ParcelConfig
itemRoutes.route('/ParcelConfig').get(function(req,res,err){
dbconfig.query("select * from tbl_parcelconfig where id=1",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ParcelConfig/update').post(function(req,res,err){
  var qry="update tbl_parcelconfig set driverminRate=?,driveraddlRate=?,DMinRate=?,DAddlRate=? where id=1";
  var itm= dbconfig.query(qry, [req.body.sminRate, req.body.saddRate,req.body.dminRate, req.body.daddRate]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

//Parcel Rate
itemRoutes.route('/ParcelRate').get(function(req,res,err){
//tbl_ParcelRate.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_parcelrate",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ParcelRate/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_parcelrate",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ParcelRate/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_parcelrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/ParcelRate/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_parcelrate VALUES (?,?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedparcel, req.body.selectedsize, req.body.selectedfrom, req.body.selectedto, req.body.parcelprice, req.body.donkeyprice, req.body.offerprice,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/ParcelRate/update').post(function(req,res,err){
  var qry="update tbl_parcelrate set ParcelName=?,ParcelSize=?,FromCity=?,ToCity=?,parcelprice=?,donkeyprice=?,offerprice=? where id=?";
  var itm= dbconfig.query(qry, [req.body.selectedparcel, req.body.selectedsize, req.body.selectedfrom, req.body.selectedto, req.body.parcelprice, req.body.donkeyprice, req.body.offerprice,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/ParcelRate/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_parcelrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Hiring Rate
itemRoutes.route('/HiringRate').get(function(req,res,err){
//tbl_HiringRate.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_hiringrate",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/HiringRate/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_hiringrate",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/HiringRate/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_hiringrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/HiringRate/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_hiringrate VALUES (?,?,?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedcategory, req.body.selectedcity, req.body.sminRate, req.body.saddRate,req.body.dminRate, req.body.daddRate,1,req.body.tminRate, req.body.taddRate]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/HiringRate/update').post(function(req,res,err){
  var qry="update tbl_hiringrate set Category=?,ServiceCity=?,driverminRate=?,driveraddlRate=?,DMinRate=?,DAddlRate=?,tMinRate=?,tAddlRate=? where id=?";
  var itm= dbconfig.query(qry, [req.body.selectedcategory,req.body.selectedcity,req.body.sminRate, req.body.saddRate,req.body.dminRate, req.body.daddRate,req.body.tminRate, req.body.taddRate,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/HiringRate/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_hiringrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
module.exports = itemRoutes;

