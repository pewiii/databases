var mysql = require('mysql');
var Sequelize = require('sequelize');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var db = new Sequelize('chatter', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

var Messages = db.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING
  }
});

var Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  }
});

var Rooms = db.define('rooms', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  roomname: {
    type: Sequelize.STRING
  }
});

Users.hasMany(Messages);
Rooms.hasMany(Messages);
Messages.belongsTo(Users);
Messages.belongsTo(Rooms);

db.sync({force: true})
  .then((err, result) => {
    console.log('Database Synced');
  });

module.exports = {Rooms, Messages, Users};