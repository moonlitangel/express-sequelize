var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var express = require('express');
var router = express.Router();
var hasher = require('wordpress-hash-node');

module.exports = function () {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password'
  },
    function (id, password, done) {
      models.wd_users.find({ where: { user_login: id } }).then(function (user) {
        var checked = hasher.CheckPassword(password, user.user_pass);
        console.log(checked);
        if (!user) {
          done(null, false, { message: 'Unknown user' });
        } else if (!checked) {
          done(null, false, { message: 'Invalid password' });
        } else {
          done(null, user);
        }
      }).catch(function (err) {
        done(err);
        console.log('error');
      });
    }
  ));
}

//mysql-sequelize 버전으로 짠거.

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// // Serialize sessions
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   db.User.find({where: {id: id}}).success(function(user){
//     done(null, user);
//   }).error(function(err){
//     done(err, null);
//   });
// });

// // Use local strategy to create user account
// passport.use(new LocalStrategy(
//   function(id, password, done) {
//     var hash = hasher.HashPassword(password);
//     var checked = hasher.CheckPassword(password, hash); //This will return true;
//     model.wd_users.find({ where: { user_login: id }}).success(function(user) {
//       if (!user) {
//         done(null, false, { message: 'Unknown user' });
//       } else if (hash !== user.password) {
//         done(null, false, { message: 'Invalid password'});
//       } else {
//         done(null, user);
//       }
//     }).error(function(err){
//       done(err);
//     });
//   }
// ));