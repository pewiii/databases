var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('TEST');
      models.messages.get((data) => {
        res.send(JSON.stringify(data));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('posting');
      models.messages.post(req.body, (data) => {
        console.log(data);
        res.send(JSON.stringify(data));
      });
    } // a function which handles posting a message to the database

  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

