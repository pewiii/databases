var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((data) => {
        res.send(JSON.stringify(data));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, (data) => {
        res.send(JSON.stringify(data));
      });
    } // a function which handles posting a message to the database

  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((data) => {
        res.send(JSON.stringify(data));
      });
    },
    post: function (req, res) {
      models.users.post(req.body, (data) => {
        res.send(JSON.stringify(data));
      });
    }
  }
};

