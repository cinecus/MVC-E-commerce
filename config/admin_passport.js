const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const admins = require('../models/admins.model')

module.exports = ()=>{
  passport.use('admin-local',new LocalStrategy({
    usernameField:'username',
    passwordField:'password'
  },
  function (username, password, done) {
    admins.find({ username: username }, function (err, user) {
      if (err) throw error
      if (user.length == 0) {
        return done(null, false, { message: 'ไม่พบผู้ใช้งานนี้' })
      }
      if (user.length > 0) {
        if (user[0].password == password) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'รหัสผ่านไม่ถูกต้อง' })
        }
      }
    })
  }))
  
  passport.serializeUser(function (user, done) {
    done(null, user[0]._id);
  });
  passport.deserializeUser(function (id, done) {
    admins.find({ _id: id }).then(function (row) {
      var user = row[0]
      done(null, user)
    });
  });
}