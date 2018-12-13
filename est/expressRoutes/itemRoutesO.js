var express = require('express');
var app = express();
var itemRoutes = express.Router();
var dbconfig = require('../config/DB');
var tbl_CourierCompany = require('../server/controller/admin-Controller');


itemRoutes.route('/CourierCompany').get(function(req,res,err){
//tbl_CourierCompany.FetchAllDetails((err,result,fields)=>{
dbconfig.query("select * from tbl_CourierCompany",(err,result,fields)=>{
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CourierCompany/Auto').get(function(req,res,err){
var itemss=  dbconfig.query("select ifnull(max(id),0)+1 as id from tbl_CourierCompany",function(err,result,fields){
  console.log("id:"+result);
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/CourierCompany/Del/:id').get(function(req,res,err){
var id = req.params.id;  
  var qry="Delete from tbl_CourierCompany where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});
 
 itemRoutes.route('/CourierCompany/add').post(function(req,res,err){
  var qry="INSERT INTO tbl_CourierCompany VALUES (?,?,?);"
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
  var qry="update tbl_CourierCompany set CourierName=? where id=?";
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
  var qry="select * from tbl_CourierCompany where id="+id; 
var itemss=  dbconfig.query(qry,function(err,result,fields){
  console.log(result);
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});  
});

itemRoutes.route('/add').post(function(req,res,err){
  var itm= dbconfig.query("INSERT INTO sample VALUES (?,?,?)", [null,req.body.name, req.body.price]);
  //adminActivity.RegisterAdmin(req.body, (err, count) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    //})
});

itemRoutes.route('/').get(function(req,res,err){
var itemss=  dbconfig.query("select * from sample",function(err,result,fields){
  //console.log(result);
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});
//console.log(dbconfig.query("select * from sample"));
});

itemRoutes.route('/edit/:id').get(function(req,res,err){
  var id = req.params.id;  
  var qry="select * from sample where id="+id;
  //console.log(qry);

 var tes= dbconfig.query(qry,function(err,result,fields){
  //console.log(fields);
if(err){
  res.json(err);
}else{
  res.json(result);
}  
});
//console.log(dbconfig.query("select * from sample"));
});

// Defined store route
itemRoutes.route('/addO').post(function (req, res) {
  var item = new Item(req.body);
      item.save()
    .then(item => {
    res.status(200).json({'item': 'Item added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
itemRoutes.route('/O').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

// Defined edit route
itemRoutes.route('/editO/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

//  Defined update route
itemRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.name = req.body.name;
      item.price = req.body.price;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
		if(err) res.json(err);
		else res.json('Successfully removed');
	});
});

module.exports = itemRoutes;
