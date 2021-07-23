const { check, validationResult } = require('express-validator');

const categories = require('../../models/categories.model')
const products = require('../../models/products.model');
const slidebars = require('../../models/slidebars.model');

const admin_postCategory = (req,res,next)=>{
    categories.insert({ name: req.body.name }, {}, function (err) {
        if (err) throw err
        res.redirect('/admin/addcategory')
    })
}

const admin_postProduct = (req,res,next)=>{
        var result = validationResult(req)
        var errors = result.errors
        if (!result.isEmpty()) {
          categories.find({}, {}, function (err, category) {
            res.render('admin/addproduct', { categories: category, errors: errors })
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
            category: req.body.category
          }, {}, function (err) {
            if (err) throw err
            res.location('/admin/addproduct')
            res.redirect('/admin/addproduct')
          })
        }
}

const admin_postEditProduct = (req,res,next)=>{
var result = validationResult(req)
  var errors = result.errors
  if (!result.isEmpty()) {
    categories.find({}, {}, function (err, category) {
      res.render('admin/addproduct', { categories: category, errors: errors })
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
        res.location('/admin/viewproduct')
        res.redirect('/admin/viewproduct')
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
        res.location('/admin/viewproduct')
        res.redirect('/admin/viewproduct')
      })
    }
  }
}

const admin_postSlidebar = (req,res,next)=>{
    var result = validationResult(req)
    var errors = result.errors
    if (!result.isEmpty()) {
        res.render('admin/addslidebar', {errors: errors })
    }else {
      const slidebarimage = req.file.filename
        slidebars.insert({
        title:req.body.title,
        image:slidebarimage

      }, {}, function (err) {
        if (err) throw err
        res.location('/admin/slidebar')
        res.redirect('/admin/slidebar')
      })
  }
}

const admin_postEditSlidebar = (req,res,next)=>{
    var result = validationResult(req)
    var errors = result.errors
    if (!result.isEmpty()) {
        slidebars.find({ _id: req.body.id }, {}, function (err, slidebar) {
            res.render('admin/editslidebar', {errors: errors ,slidebars:slidebar})
    })
    }else{
    if (req.file) {
      var slidebarimage = req.file.filename
      slidebars.update({ _id: req.body.id }, {
        $set: {
          title: req.body.title,
          image: slidebarimage
        }
      }, function (err) {
        if (err) throw err
        res.location('/admin/slidebar')
        res.redirect('/admin/slidebar')
      })
    } else {
      slidebars.update({ _id: req.body.id }, {
        $set: {
          title: req.body.title,
        }
      }, function (err) {
        if (err) throw err
        res.location('/admin/slidebar')
        res.redirect('/admin/slidebar')
      })
    }
  }
}


module.exports = {
    admin_postCategory,
    admin_postProduct,
    admin_postEditProduct,
    admin_postSlidebar,
    admin_postEditSlidebar
}