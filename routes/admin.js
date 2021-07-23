const express = require('express');
const router = express.Router();

//controller
const admin_get = require('../controllers/admins/admin.get')
const admin_post = require('../controllers/admins/admin.post')
const { uploadImage, formValidateProduct, formValidateSlidebar, enSureAuthenticated } = require('../controllers/admins/admin.middleware');

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy


//login สำหรับ admin 
router.get('/login',admin_get.admin_getLogin);

router.get('/',admin_get.admin_redirectLogin)

router.post('/login', passport.authenticate('admin-local', {
  failureRedirect: '/admin/login',
  successRedirect:'/admin/manage',
  failureFlash: true
}),admin_get.admin_redirectManage)

router.get('/logout', admin_get.admin_getLogout)

//manage view
router.get('/manage',enSureAuthenticated,admin_get.admin_getManage)

//add categories
router.get('/addcategory',enSureAuthenticated,admin_get.admin_getAddCategory)
router.post('/addcategory', admin_post.admin_postCategory)


//add product
router.get('/addproduct',enSureAuthenticated,admin_get.admin_getAddProduct)
router.post('/addproduct',uploadImage,formValidateProduct,admin_post.admin_postProduct)


//view product list
router.get('/viewproduct',enSureAuthenticated,admin_get.admin_getViewProduct);

//edit product
router.get('/editproduct/:id',enSureAuthenticated, admin_get.admin_getEditProductById)
router.post('/editproduct',uploadImage,formValidateProduct,admin_post.admin_postEditProduct)

//delete
router.get('/deleteproduct/:id',enSureAuthenticated,admin_get.admin_getDeleteProductById);


//slide bar
router.get('/slidebar',enSureAuthenticated, admin_get.admin_getSlidebar)

//add slidebar
router.get('/slidebar/add',enSureAuthenticated,admin_get.admin_getAddSlidebar)
router.post('/slidebar/add',uploadImage,formValidateSlidebar,admin_post.admin_postSlidebar)

//edit slidebar
router.get('/slidebar/edit/:id',enSureAuthenticated,admin_get.admin_getEditSlidebarById)
router.post('/slidebar/edit',uploadImage,formValidateSlidebar,admin_post.admin_postEditSlidebar)

//delete slidebar
router.get('/deleteslidebar/:id',enSureAuthenticated, admin_get.admin_getDeleteSlidebarById);


module.exports = router;
