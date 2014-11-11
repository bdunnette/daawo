Patients = new Mongo.Collection('patients')

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Accounts.onLogin(function (users) {
    /* if there's only one user, add that user to admin group */
    if (Meteor.users.find().count() === 1) {
      Roles.addUsersToRoles(users.user._id, ['admin']);
    }
  });
}

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('hello', {
    data: function () { return {patients: Patients.find()} }
  });
}, {
  name: 'hello'
});

Router.route('admin', {
    path:'/admin',
    template: 'accountsAdmin'
});