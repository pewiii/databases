var mysql = require('mysql');
var sequelize = require('sequelize');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'chat'
// });

// con.connect((err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Connected to Database');
//   }
// });
var con = new sequelize('chatter', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = con;