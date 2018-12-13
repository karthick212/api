var express = require('express');
var app = express();
var itemRoutes = express.Router();
var dbconfig = require('../config/db');
//var tbl_SharingCompany = require('../server/controller/admin-Controller');


//Sharing Rate
itemRoutes.route('/SharingRate').get(function(req,res,err){
//tbl_SharingRate.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_sharingrate",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/SharingRate/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_sharingrate",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/SharingRate/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_sharingrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/SharingRate/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_sharingrate VALUES (?,?,?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedcity, req.body.selectedsize, req.body.sharingprice, req.body.donkeyprice, req.body.offerprice, req.body.SAddlRate, req.body.SMaxRate, req.body.SDispRate,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/SharingRate/update').post(function(req,res,err){
  var qry="update tbl_sharingrate set ServiceArea=?,SharingSize=?,sharingprice=?,donkeyprice=?,offerprice=?,SAddlRate=?,SMaxRate=?,SDispRate=? where id=?";
  var itm= dbconfig.query(qry, [req.body.selectedcity, req.body.selectedsize, req.body.sharingprice, req.body.donkeyprice, req.body.offerprice, req.body.SAddlRate, req.body.SMaxRate, req.body.SDispRate,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/SharingRate/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_sharingrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Service Area
itemRoutes.route('/ServiceArea').get(function(req,res,err){
//tbl_ServiceArea.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_servicearea1",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ServiceArea').get(function(req,res,err){
//tbl_ServiceArea.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_servicearea1",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ServiceArea/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_servicearea1",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ServiceArea/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_servicearea1 where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/ServiceArea/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_servicearea1 VALUES (?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedcity, req.body.servicearea, req.body.lati, req.body.long, req.body.radius, req.body.note,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/ServiceArea/update').post(function(req,res,err){
  var qry="update tbl_servicearea1 set ServiceCity=?,ServiceArea=?,Latitude=?,Longitude=?,Radius=?,Notes=? where id=?";
  var itm= dbconfig.query(qry, [req.body.selectedcity, req.body.servicearea, req.body.lati, req.body.long, req.body.radius, req.body.note,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/ServiceArea/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_servicearea1 where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

module.exports = itemRoutes;

