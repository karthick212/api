var express = require('express');
var app = express();
var itemRoutes = express.Router();
var dbconfig = require('../config/db');
//var tbl_CourierCompany = require('../server/controller/admin-Controller');

//Product Type
itemRoutes.route('/ProductType').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_producttype",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Product Type - App
itemRoutes.route('/ProductType/App').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select ProductType from tbl_producttype",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Product Type - Courier
itemRoutes.route('/ProductType/Courier').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select ProductType from tbl_producttype where isCourier='True'",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Product Type - Parcel
itemRoutes.route('/ProductType/Parcel').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select ProductType  from tbl_producttype where isParcel='True'",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ProductType/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_producttype",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ProductType/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_producttype where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/ProductType/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_producttype VALUES (?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.cname,1,req.body.ccourier,req.body.cparcel]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/ProductType/update').post(function(req,res,err){
  var qry="update tbl_producttype set ProductType=?,isCourier=?,isParcel=? where id=?";
  var itm= dbconfig.query(qry, [req.body.cname,req.body.ccourier,req.body.cparcel,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/ProductType/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_producttype where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});


//State Master
itemRoutes.route('/StateMaster').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_state",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/StateMaster/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_state",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/StateMaster/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_state where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/StateMaster/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_state VALUES (?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.cname,req.body.desc,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/StateMaster/update').post(function(req,res,err){
  var qry="update tbl_state set State=?,Description=? where id=?";
  var itm= dbconfig.query(qry, [req.body.cname,req.body.desc,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/StateMaster/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_state where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//City Master - Search
itemRoutes.route('/CityMaster/Search').post(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_city where State=?",[req.body.state],(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//City Master
itemRoutes.route('/CityMaster').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_city",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CityMaster/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_city",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CityMaster/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_city where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/CityMaster/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_city VALUES (?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.state, req.body.cname,req.body.desc,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/CityMaster/update').post(function(req,res,err){
  var qry="update tbl_city set State=?,City=?,Description=? where id=?";
  var itm= dbconfig.query(qry, [req.body.state,req.body.cname,req.body.desc,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/CityMaster/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_city where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Service Area - App
itemRoutes.route('/ServiceArea/CoverArea').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
  let reqq=req.query;
  //let reqq=request.body;
  let type=reqq.type;
  
  let cond=""
  if(type.indexOf('cour')>=0)
    cond=" and isCourier='true'"
  else if(type.indexOf('shar')>=0)
    cond=" and isSharing='true'"
  else if(type.indexOf('parc')>=0)
    cond=" and isParcel='true'"
  else if(type.indexOf('rent')>=0)
    cond=" and isRental='true'"

dbconfig.query("select * from vw_servicearea where ServiceArea=?"+cond,[reqq.servicearea],(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});


//Service Area
itemRoutes.route('/ServiceArea').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_servicearea",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ServiceArea/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_servicearea",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/ServiceArea/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_servicearea where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/ServiceArea/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_servicearea VALUES (?,?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.servicearea, req.body.long,req.body.lati,req.body.ccourier,req.body.cparcel,req.body.csharing,req.body.crental,1]);
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
  var qry="update tbl_servicearea set ServiceArea=?,Longitude=?,Latitude=?,isCourier=?,isParcel=?,isSharing=?,isRental=? where id=?";
  var itm= dbconfig.query(qry, [req.body.servicearea,req.body.long,req.body.lati,req.body.ccourier,req.body.cparcel,req.body.csharing,req.body.crental,req.body.id]);
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
  var qry="select * from tbl_servicearea where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Daily Discount
itemRoutes.route('/DailyDiscount').get(function(req,res,err){
dbconfig.query("select * from tbl_dailydiscount",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/DailyDiscount/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_dailydiscount",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/DailyDiscount/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_dailydiscount where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/DailyDiscount/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_dailydiscount(id,Day,ServiceArea,ServiceType,Discount,isActive) VALUES (?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedday, req.body.selectedSarea, req.body.selectedType, req.body.disc,1]);
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
});

 itemRoutes.route('/DailyDiscount/update').post(function(req,res,err){
  var qry="update tbl_dailydiscount set Day=?,ServiceArea=?,ServiceType=?,Discount=? where id=?";
  var itm= dbconfig.query(qry, [req.body.selectedday, req.body.selectedSarea, req.body.selectedType, req.body.disc,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/DailyDiscount/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_dailydiscount where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});


//Vehicle Rate
itemRoutes.route('/VehicleType').get(function(req,res,err){
//tbl_SharingRate.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_vehicletype",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/VehicleType/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_vehicletype",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/VehicleType/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_vehicletype where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/VehicleType/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_vehicletype VALUES (?,?,?,?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedcategory, req.body.vehiclename, req.body.length, req.body.breadth, req.body.heightt, req.body.desc,1, req.body.isParcel, req.body.isSharing, req.body.isRental]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/VehicleType/update').post(function(req,res,err){
  var qry="update tbl_vehicletype set Category=?,VehicleName=?,Length=?,Breadth=?,Height=?,Description=?,isParcel=?,isSharing=?,isRental=? where id=?";
  var itm= dbconfig.query(qry, [req.body.selectedcategory,req.body.vehiclename, req.body.length, req.body.breadth, req.body.heightt, req.body.desc, req.body.isParcel, req.body.isSharing, req.body.isRental,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/VehicleType/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_vehicletype where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});


//Category Master
itemRoutes.route('/CategoryMaster').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_category",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CategoryMaster/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_category",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CategoryMaster/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_category where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/CategoryMaster/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_category VALUES (?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.cname,req.body.desc,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/CategoryMaster/update').post(function(req,res,err){
  var qry="update tbl_category set Category=?,Description=? where id=?";
  var itm= dbconfig.query(qry, [req.body.cname,req.body.desc,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/CategoryMaster/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_category where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//User Master
itemRoutes.route('/UserMaster').get(function(req,res,err){
//tbl_producttype.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_user",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/UserMaster/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_user",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/UserMaster/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_user where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/UserMaster/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_user VALUES (?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.cname,req.body.pass,req.body.usertype,1]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/UserMaster/update').post(function(req,res,err){
  var qry="update tbl_user set UserName=?,Password=?,UserType=? where id=?";
  var itm= dbconfig.query(qry, [req.body.cname,req.body.pass,req.body.usertype,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/UserMaster/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_user where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

module.exports = itemRoutes;

