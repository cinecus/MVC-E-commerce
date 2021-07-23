const { check, validationResult } = require('express-validator');

const categories = require('../../models/categories.model')
const products = require('../../models/products.model');
const deliverybills = require('../../models/deliverybills.model');

const seller_postProduct = (req,res,next)=>{
    const result = validationResult(req)
    const errors = result.errors
    const user = req.user
    if (!result.isEmpty()) {
        categories.find({}, {}, function (err, category) {
          res.render('seller/addproduct', { categories: category, errors: errors ,user:user})
    })
    } else {
    if (req.file) {
      var productimage = req.file.filename
    } else {
      var productimage = "No image"
    }
    products.insert({
      name: req.body.name,
      description: req.body.description,
      image: productimage,
      price: parseFloat(req.body.price),
      category: req.body.category,
      seller:req.body.seller
    }, {}, function (err) {
      if (err) throw err
      res.location('/seller/addproduct')
      res.redirect('/seller/addproduct')
    })
  }
}

const seller_postEditProductById = (req,res,next)=>{
    var result = validationResult(req)
  var errors = result.errors
  if (!result.isEmpty()) {
    categories.find({}, {}, function (err, category) {
      res.render('/editproduct', { categories: category, errors: errors })
    })
  } else {
    if (req.file) {
      var productimage = req.file.filename
      products.update({ _id: req.body.id }, {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          image: productimage
        }
      }, function (err) {
        if (err) throw err
        res.location('/seller/viewproduct')
        res.redirect('/seller/viewproduct')
      })
    } else {
      products.update({ _id: req.body.id }, {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category
        }
      }, function (err) {
        if (err) throw err
        res.location('/seller/viewproduct')
        res.redirect('/seller/viewproduct')
      })
    }
  }
}

const seller_postTracking = (req,res,next)=>{
    deliverybills.findOneAndUpdate({_id:req.body.bill_id},{
        $set:{
          trackingnumber:req.body.trackingnumber
        }
      },function(err){
        if(err) throw err
        res.location('/seller/tracking')
        res.redirect('/seller/tracking')
    })
}


module.exports ={
    seller_postProduct,
    seller_postEditProductById,
    seller_postTracking
}