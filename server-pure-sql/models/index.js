var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages JOIN users ON messages.user=users.id JOIN rooms ON messages.room=rooms.id', (err, result) => {
        if (err) {
          console.error(err);
        } else {
          callback(result);
        }
      });

    }, // a function which produces all the messages
    post: function (msg, callback) {
      var message = msg.text;

      db.query(`SELECT id FROM users WHERE username = '${msg.username}'`, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          var userid = result.length ? result[0].id : 0;
          db.query(`INSERT IGNORE INTO users VALUES (${userid || 'NULL'}, '${msg.username}')`, (err, result) => {
            if (err) {
              console.error(err);
            } else {
              userid = result.insertId ? result.insertId : userid;
              //userid = userid || result.insertedId;
              db.query(`SELECT id FROM rooms WHERE roomname = '${msg.roomname}'`, (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  var roomid = result.length ? result[0].id : 0;
                  db.query(`INSERT IGNORE INTO rooms VALUES (${roomid || 'NULL'}, '${msg.roomname}')`, (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      roomid = result.insertId ? result.insertId : roomid;
                      //roomid = roomid || result.insertedId;
                      db.query(`INSERT INTO messages VALUES (NULL, ${roomid}, '${msg.text}', ${userid})`, (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          callback(msg);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
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

