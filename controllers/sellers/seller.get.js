const moment = require('moment')

const categories = require('../../models/categories.model')
const products = require('../../models/products.model');
const deliverybills = require('../../models/deliverybills.model');

const seller_getManage = (req,res,next)=>{
    res.render('seller/manage')
}

const seller_getAddProduct = async(req,res,next)=>{
    const category = await categories.find({},{})
    res.render('seller/addproduct', { categories: category })
}

const seller_getViewProduct = async(req,res,next)=>{
    const category = await categories.find({},{})
    const product = await products.find({seller:req.user.username},{})
    res.render('seller/viewproduct', { categories: category, products: product });
}

const seller_getEditProductById = async(req,res,next)=>{
    const category = await categories.find({},{})
    const product = await products.find({_id:req.params.id},{})
    res.render('seller/editproduct', { categories: category, products: product })
}

const seller_getDeleteProductById = (req,res,next)=>{
    products.remove({_id:req.params.id})
    res.redirect('/seller/viewproduct')
}

const seller_getTracking = async(req,res,next)=>{
    const deliverybill = await deliverybills.find({seller:req.user.username},{})
    res.render('seller/sellertracking',{deliverybills:deliverybill,moment:moment})
}

const seller_getAddTrackingById = async(req,res,next)=>{
    res.render('seller/addtracking',{deliverybill_id:req.params.id})
}

module.exports = {
    seller_getManage,
    seller_getAddProduct,
    seller_getViewProduct,
    seller_getEditProductById,
    seller_getDeleteProductById,
    seller_getTracking,
    seller_getAddTrackingById
}