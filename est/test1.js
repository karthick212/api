const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express(),
config =  require('./config/db'),
itemRoutes = require('./expressRoutes/itemRoutes');
commonRoutes = require('./expressRoutes/commonRoutes');
parcelRoutes = require('./expressRoutes/parcelRoutes');
sharingRoutes = require('./expressRoutes/sharingRoutes');
rentalRoutes = require('./expressRoutes/rentalRoutes');
advancedRoutes = require('./expressRoutes/advancedRoutes');
const apiadmin = require('./routes/admin')
const apidriver = require('./routes/driver')
const apicourier = require('./routes/courier')
const apiuser = require('./routes/user')
const apiparcel = require('./routes/parcel')
const apirental = require('./routes/rental')

config.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
      //app.use(express.bodyParser());
      app.use(express.static('public'));
	// app.use(body_parser.json());
      // app.use(body_parser.urlencoded({ extended: true }));
      app.use(body_parser.json({limit: '50mb'}));
      app.use(body_parser.urlencoded({limit: '50mb'}));
      app.use(cors());
      app.use('/courier', itemRoutes);
      app.use('/common', commonRoutes);
      app.use('/parcel', parcelRoutes);
app.use('/sharing', sharingRoutes);
      app.use('/rental', rentalRoutes);
app.use('/advanced', advancedRoutes);
app.use('/api/admin/', apiadmin)
app.use('/api/driver/', apidriver)
app.use('/api/user/', apiuser)
app.use('/api/courier/', apicourier)
app.use('/api/parcel/', apiparcel)
app.use('/api/rental/', apirental)

      const port = process.env.PORT || 4000;

      const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
      });

//const api_admin = require("./server/routes/admin");
// const api_driver = require("./routes/driver");


// app.use(morgan("combine"));

//app.use(express.static((__dirname, './dist/')));

// app.use(bodyParser.urlencoded({ extended: true }));
//app.use(body_parser.json());
//app.use(cors());

//app.use('/api/admin/', api_admin);

/*app.get('*',(req,res) => {
    res.sendfile(__dirname + "/dist/index.html")

});*/


// app.use('/api/diver',api_driver);

//app.listen(process.env.PORT || 8080);

