// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../routes/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {

    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      // find a user whose username is the same as the forms username
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'teacher.username' :  username }, function(err, user) {
        // if there are any errors, return the error
        if (err)
        return done(err);

        // check to see if theres already a user with that username
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {

          // if there is no user with that username
          // create the user
          var newUser            = new User();

          // set the user's local credentials
          newUser.teacher.username    = username;
          newUser.teacher.password = newUser.generateHash(password);
          newUser.teacher.jsondata = "";

          // save the user
          newUser.save(function(err) {
            if (err)
            throw err;
            return done(null, newUser);
          });
        }

      });

    });

  }));











  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'teacher.username' :  username }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err)
      return done(err);

      // if no user is found, return the message
      if (!user)
      return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if (!user.validPassword(password))
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    });

  }));








  passport.use('data-json', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with our json id an d json data
    usernameField : 'idss',
    passwordField : 'jsondata',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, idss, jsondata, done) {
    process.nextTick(function() {
      // find a user whose username is the same as the forms username
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'codeJson.idss' :  idss }, function(err, user) {
        // if there are any errors, return the error
        if (err)
        return done(err);

        // check to see if theres already a user with that username
        if (user) {
          user.codeJson.jsondata = jsondata;
          user.save(function (err) {
            if (err) {
              console.log(err);
            }
          });
          //return done(null, false, req.flash('kMessage', 'That username is already taken.'));
        } else {

          // if there is no user with that username
          // create the user
          var newData            = new User();

          // set the user's local credentials
          newData.codeJson.idss   = idss;
          newData.codeJson.jsondata = jsondata;

          // save the user
          newData.save(function(err) {
            if (err)
            throw err;
            return done(null, newData);
          });
        }

      });

    });

  }));




  passport.use('teacher-data-json', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with our json id an d json data
    usernameField : 'username',
    passwordField : 'jsondata',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, username, jsondata, done) {
    process.nextTick(function() {
      // find a user whose username is the same as the forms username
      // we are checking to see if the user trying to login already exists
      User.findOne({ 'teacher.username' :  username }, function(err, user) {
        // if there are any errors, return the error
        if (err)
        return done(err);

        // check to see if theres already a user with that username
        if (user) {
          user.teacher.jsondata = jsondata;
          user.save(function (err) {
            if (err) {
              console.log(err);
            }
          });
          //return done(null, false, req.flash('kMessage', 'That username is already taken.'));
        } 

    });

  });

}));





};