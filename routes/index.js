var express = require('express');
var router = express.Router();
var mongodb = require('mongodb')
var db = require('../models/db')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var flash = require("express-flash")

//db
const categories = require('../models/categories.model')
const products = require('../models/products.model');
const slidebars = require('../models/slidebars.model');



router.get('/',async function(req,res,next){
  const category = await categories.find({},{})
  const product = await  products.find({},{})
  const slidebar = await slidebars.find({},{})
  res.render('index',{categories:category,products:product,slidebars:slidebar})
})

module.exports = router;
