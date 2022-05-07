/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chatter'
    });
    dbConnection.connect();

    var tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercys name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];
        dbConnection.query(queryString, queryArgs, function(err, results) {
          if (err) { console.error(err); }
          // Should have one result:
          expect(results.length).to.equal(1);
          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercys name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO messages VALUES (?)';
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var queryArgs = [null, 'Men like you can never change!', date, date, 1, 1];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, [queryArgs], function(err) {
      if (err) {
        throw err;
      } else {
        dbConnection.query('UPDATE rooms SET roomname = "space" WHERE id = 1', (err, result) => {
          if (err) {
            throw err;
          } else {
            request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
              var messageLog = JSON.parse(body);
              expect(messageLog[0].text).to.equal('Men like you can never change!');
              expect(messageLog[0].room.roomname).to.equal('space');
              done();
            });
          }
        });
      }
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
    });
  });

  it('Should not insert duplicate users to the DB', function(done) {
    // Post the same user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      var queryString = 'SELECT * FROM users';
      var queryArgs = [];
      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) { console.error(err); }
        // Should have one result:
        expect(results.length).to.equal(1);
        expect(results[0].username).to.equal('Valjean');
        done();
      });
    });
  });
  it('Should not insert duplicate rooms to the DB', function(done) {
    // Post the same user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/messages',
      json: { username: 'HAL9000',
        text: 'I\'m sorry Dave, I\'m afraid I can\'t do that.',
        roomname: 'space'}
    }, function () {
      var queryString = 'SELECT * FROM rooms';
      var queryArgs = [];
      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) { console.error(err); }
        // Should have one result:
        expect(results.length).to.equal(1);
        expect(results[0].roomname).to.equal('space');
        done();
      });
    });
  });
});

