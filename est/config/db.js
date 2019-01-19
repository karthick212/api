const mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'donkeycargo.cmc4nhmz7bua.us-east-1.rds.amazonaws.com',
  user: 'donkey',
  password: 'donkey123',
  database: 'donkeycargo',
  timezone: 'utc'  

  /*host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'donkeycargo'*/
})

module.exports = connection
