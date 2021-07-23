const categories = require('../../models/categories.model')
const products = require('../../models/products.model');
const slidebars = require('../../models/slidebars.model');

const admin_getLogin = (req,res,next)=>{
    res.render('admin/login');
}

const admin_redirectLogin = (req,res,next)=>{
    res.redirect('/admin/login')
}

const admin_getManage = (req,res,next)=>{
    res.render('admin/manage')
}

const admin_redirectManage = (req,res,next)=>{
    res.redirect('/admin/manage')
}

const admin_getLogout = (req,res,next)=>{
    req.logout()
    res.redirect('/admin/login')
}
const admin_getAddCategory = (req,res,next)=>{
    res.render('admin/addcategory')
}

const admin_getAddProduct = async (req,res,next)=>{
    const category = await categories.find({},{})
    res.render('admin/addproduct', { categories: category })
}

const admin_getViewProduct = async (req,res,next)=>{
    const category = await categories.find({},{})
    const product = await products.find({},{})
    res.render('admin/viewproduct',{categories:category,products:product})
}

const admin_getEditProductById = async (req,res,next)=>{
    const category = await categories.find({},{})
    const product = await products.find({_id:req.params.id},{})
    res.render('admin/editproduct',{categories:category,products:product})
}

const admin_getDeleteProductById = (req,res,next)=>{
    products.remove({_id:req.params.id})
    res.redirect('/admin/viewproduct')
}

const admin_getSlidebar = async (req,res,next)=>{
    const slidebar = await slidebars.find({},{})
    res.render('admin/slidebar',{slidebars:slidebar})
}

const admin_getAddSlidebar = (req,res,next)=>{
    res.render('admin/addslidebar')
}

const admin_getEditSlidebarById = async(req,res,next)=>{
    const slidebar = await slidebars.find({_id:req.params.id},{})
    res.render('admin/editslidebar', { slidebars:slidebar})
}

const admin_getDeleteSlidebarById = (req,res,next)=>{
    slidebars.remove({_id:req.params.id})
    res.redirect('/admin/slidebar')
}

module.exports = {
    admin_getLogin,
    admin_redirectLogin,
    admin_getManage,
    admin_redirectManage,
    admin_getLogout,
    admin_getAddCategory,
    admin_getAddProduct,
    admin_getViewProduct,
    admin_getEditProductById,
    admin_getDeleteProductById,
    admin_getSlidebar,
    admin_getAddSlidebar,
    admin_getEditSlidebarById,
    admin_getDeleteSlidebarById
}

