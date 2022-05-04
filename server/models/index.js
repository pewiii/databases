var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', (err, result) => {
        if (err) {
          console.error(err);
        } else {
          callback(result);
        }
      });

    }, // a function which produces all the messages
    post: function (msg, callback) {
      db.query(`INSERT INTO messages VALUES (NULL, "${msg.roomname}", "${msg.text}", "${msg.username}" )`, (err, result) => {
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
    get: function () {
      db.query('SELECT * FROM users', (err, result) => {
        console.log(result);
      });
    },
    post: function (usrs) {
      db.query(`INSERT INTO users VALUES ( ${usrs.username}`, (err, result) => {
        if (err) {
          console.log('insert error');
        } else {
          console.log('record updated');
        }
      });
    }
  }
};

