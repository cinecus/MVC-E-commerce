var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const keys = require('./config/key')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const admin_passport = require('./config/admin_passport')
const user_passport = require('./config/user_passport');

var flash = require("express-flash")
var { check, validationResult } = require('express-validator')
var stripe = require('stripe')(keys.stripeSecretKey)

var multer = require('multer')
var upload = multer({dest:'./public/images'})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var productRouter = require('./routes/product');
var sellerRouter = require('./routes/seller');
var customerRouter = require('./routes/customer');

//passport config
admin_passport()
user_passport()

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize())
app.use(passport.session())

app.get('*',function(req,res,next){
  res.locals.user = req.user || null
  next()
})

app.locals.formatMoney = function(number){
  return parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/user', usersRouter);
app.use('/product', productRouter);
app.use('/seller', sellerRouter);
app.use('/customer', customerRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
