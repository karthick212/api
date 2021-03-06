var express = require('express');
var app = express();
var itemRoutes = express.Router();
var dbconfig = require('../config/db');
//var tbl_couriercompany = require('../server/controller/admin-Controller');

//Courier Company
itemRoutes.route('/CourierCompany').get(function(req,res,err){
//tbl_couriercompany.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_couriercompany",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CourierCompany/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_couriercompany",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CourierCompany/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_couriercompany where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/CourierCompany/add').post(function(req,res,err){
  console.log(req.body.id+','+req.body.cname);
  var qry="INSERT INTO tbl_couriercompany VALUES (?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.cname,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/CourierCompany/update').post(function(req,res,err){
  var qry="update tbl_couriercompany set CourierName=? where id=?";
  var itm= dbconfig.query(qry, [req.body.cname,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/CourierCompany/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_couriercompany where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Courier Company
itemRoutes.route('/CourierRate').get(function(req,res,err){
dbconfig.query("select * from tbl_courierrate",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CourierRate/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_courierrate",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CourierRate/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_courierrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/CourierRate/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_courierrate(id,CourierName,CourierType,DocumentLength,DocumentBreadth,BoxWeight,FromState,ToState,Area,CPrice,DPrice,OPrice,Description,isActive) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.couriername, req.body.selectedType, req.body.len, req.body.wid, req.body.perkg, req.body.fromState, req.body.ToState, req.body.area, req.body.courierprice, req.body.donkeyprice, req.body.offerprice, req.body.desc,1]);
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
});

 itemRoutes.route('/CourierRate/update').post(function(req,res,err){
  var qry="update tbl_courierrate set CourierName=?,CourierType=?,DocumentLength=?,DocumentBreadth=?,BoxWeight=?,FromState=?,ToState=?,Area=?,CPrice=?,DPrice=?,OPrice=?,Description=? where id=?";
  var itm= dbconfig.query(qry, [req.body.couriername, req.body.selectedType, req.body.len, req.body.wid, req.body.perkg, req.body.fromState, req.body.ToState, req.body.area, req.body.courierprice, req.body.donkeyprice, req.body.offerprice, req.body.desc,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/CourierRate/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_courierrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//CourierConfig
itemRoutes.route('/CourierConfig').get(function(req,res,err){
dbconfig.query("select * from tbl_courierconfig where id=1",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CourierConfig/update').post(function(req,res,err){
  var qry="update tbl_courierconfig set studentminRate=?,studentaddlRate=?,DMinRate=?,DAddlRate=? where id=1";
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

module.exports = itemRoutes;

