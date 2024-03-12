const mysql = require('mysql');

var db = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mysql_tongsun'
});

module.exports = db;

