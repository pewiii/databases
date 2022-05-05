var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages JOIN users ON messages.user=users.username JOIN rooms ON messages.room=rooms.roomname', (err, result) => {
        if (err) {
          console.error(err);
        } else {
          callback(result);
        }
      });

    }, // a function which produces all the messages
    post: function (msg, callback) {
      var message = msg.text;
      var roomname = msg.roomname;
      var username = msg.username;
      var sql1 = `INSERT INTO rooms VALUES (NULL, "${roomname}"); `;
      var sql2 = `INSERT INTO users VALUES (NULL, "${username}"); `;
      var sql3 = `INSERT INTO messages VALUES (NULL, "${message}");`;

      db.query('BEGIN;' + sql1 + sql2 + sql3 + 'COMMIT;', (err, result) => {
        if (err) {
          console.error(err);
        } else {
          callback(msg);
          console.log('record updated');
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT * FROM users', (err, result) => {
        callback(result);
      });
    },
    post: function (usrs, callback) {
      db.query(`INSERT INTO users VALUES (NULL, "${usrs.username}")`, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          callback(result);
        }
      });
    }
  }
};

