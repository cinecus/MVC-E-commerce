var express = require('express');
var router = express.Router();

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const user_get = require('../controllers/users/user.get');
const user_post = require('../controllers/users/user.post');
const { formValidateUser } = require('../controllers/users/user.middleware');


//get register
router.get('/register',user_get.user_getRegister)
//post register
router.post('/register',formValidateUser,user_post.user_postRegister)


//get login
router.get('/login',user_get.user_getLogin)
//post login by passport Local Strategy
router.post('/login', passport.authenticate('user-local', {
  failureRedirect: '/user/login',
  failureFlash: true
}),user_post.user_postLogin)

//logout
router.get('/logout', user_get.user_getLogout)


module.exports = router;
