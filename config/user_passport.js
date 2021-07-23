const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('../models/users.model');
const bcrypt = require('bcryptjs')

const comparePassword= (password,hash,callback)=>{
    bcrypt.compare(password,hash,function(err,isMatch){
      callback(null,isMatch)
    })
}

module.exports =()=>{
    passport.serializeUser(function (user, done) {
        done(null, user[0]._id);
      });
      passport.deserializeUser(function (id, done) {
        users.find({ _id: id }).then(function (row) {
          var user = row[0]
          done(null, user)
        });
      });
      passport.use('user-local',new LocalStrategy(function(username,password,done){
        users.find({username:username},function(err,user){
          if(err) throw error
          if(user.length==0){
            return done(null,false,{ message: 'ไม่พบผู้ใช้งานนี้' })
          }
          if(user.length >0){
          comparePassword(password,user[0].password,function(err,isMatch){
            if(err) throw err
            if(isMatch){
              return done(null,user)
            }else{
              return done(null,false,{ message: 'รหัสผ่านไม่ถูกต้อง' })
            }
          })
        }
        })
      }))
}