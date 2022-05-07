// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.

var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    // TODO: Make sure the app loads data from the API
    // continually, instead of just once at the start.
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // TODO: Use the data to update Messages and Rooms
      if (typeof data === 'string') {
        data = JSON.parse(data);
        console.log(data);
      }
      console.log(data);
      //data = data.results;
      data.forEach((msg) => {
        if (!msg.username) {
          msg.username = msg.user.username;
          msg.roomname = msg.room.roomname;
        }
        Rooms.add(msg.roomname);
        Messages.addMessage(msg);
      });
      RoomsView.render();
      //MessagesView.render();
      // and re-render the corresponding views.
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
