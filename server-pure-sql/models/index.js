var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.Messages.findAll({
        include: [{
          model: db.Users,
          attributes: ['username']
        }, {
          model: db.Rooms,
          attributes: ['roomname']
        }]
        //attributes: [{exclude: ['roomid', 'userid']}]
      }).then(data => {
        callback(data);
      }).catch(err => {
        console.error(err);
      });
    }, // a function which produces all the messages
    post: function (msg, callback) {
      var userid;
      var roomid;
      db.Users.findOrCreate({
        where: {username: msg.username},
        defaults: {username: msg.username}
      }).then(data => {
        //console.log('USER', data[0]);
        userid = data[0].id;
        return db.Rooms.findOrCreate({
          where: {roomname: msg.roomname},
          defaults: { roomname: msg.roomname }
        });
      }).then(data => {
        roomid = data[0].id;
        return db.Messages.create({
          text: msg.text,
          'userId': userid,
          'roomId': roomid
        });
      }).then(data => {
        callback(msg);
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function (callback) {
      db.Users.findAll({
        // attributes: [{exclude: ['id']}]
      }).then(data => {
        callback(data);
      });
    // Ditto as above.
    },
    post: function (usrs, callback) {
      db.Users.findOrCreate({
        where: {username: usrs.username},
        defaults: {username: usrs.username}
      }).then(data => {
        callback(usrs);
      });
    }
  }
};

