var express = require('express');
var app = express();
var itemRoutes = express.Router();
var dbconfig = require('../config/db');
//var tbl_RentalCompany = require('../server/controller/admin-Controller');

//Rental Rate
itemRoutes.route('/RentalRate').get(function(req,res,err){
//tbl_RentalRate.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select *,Hours1 as RentalPackage from tbl_rentalrate",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/RentalRate/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_rentalrate",function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

//Rental Rate - App
itemRoutes.route('/RentalRate/App').get(function(req,res,err){
//tbl_RentalRate.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select distinct RentalPackages as RentalPackage from vw_rentalrate",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
itemRoutes.route('/RentalRate/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_rentalrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 

 itemRoutes.route('/RentalRate/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_rentalrate VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"
  var itm= dbconfig.query(qry, [req.body.id, req.body.selectedvehicle, req.body.hours1, req.body.kms1, req.body.donkeyprice, req.body.offerprice, req.body.hours2, req.body.kms2, req.body.price, req.body.rentalprice,1, req.body.selectedcity]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

 itemRoutes.route('/RentalRate/update').post(function(req,res,err){
  var qry="update tbl_rentalrate set CategoryVehicle=?,Hours1=?,KMs1=?,donkeyprice=?,offerprice=?,Hours2=?,KMs2=?,Price=?,rentalprice=?,ServiceCity=? where id=?";
  var itm= dbconfig.query(qry, [req.body.selectedvehicle, req.body.hours1, req.body.kms1, req.body.donkeyprice, req.body.offerprice, req.body.hours2, req.body.kms2, req.body.price, req.body.rentalprice, req.body.selectedcity,req.body.id]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
         if (err) {
             res.json(err);
         }
         else {
             res.json(req.body);
         }
    //})
});

itemRoutes.route('/RentalRate/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from tbl_rentalrate where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

module.exports = itemRoutes;

