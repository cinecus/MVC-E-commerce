var express = require('express');
var router = express.Router();

//controller
const { uploadImage,formValidateProduct } = require('../controllers/sellers/seller.middleware');
const enSureAuthenticated = require('../controllers/users/user.auth')
const seller_get = require('../controllers/sellers/seller.get');
const seller_post = require('../controllers/sellers/seller.post');

//manage seller
router.get('/manage',enSureAuthenticated,seller_get.seller_getManage)
//add product
router.get('/addproduct',enSureAuthenticated,seller_get.seller_getAddProduct)
router.post('/addproduct',enSureAuthenticated,uploadImage,formValidateProduct,seller_post.seller_postProduct)

//show product list
router.get('/viewproduct',enSureAuthenticated,seller_get.seller_getViewProduct)

//edit product
router.get('/editproduct/:id',enSureAuthenticated,seller_get.seller_getEditProductById)
router.post('/editproduct', uploadImage,formValidateProduct,seller_post.seller_postEditProductById)

//delete
router.get('/deleteproduct/:id',enSureAuthenticated,seller_get.seller_getDeleteProductById);

//show tracking
router.get('/tracking',enSureAuthenticated,seller_get.seller_getTracking)

//add tracking
router.get('/addtracking/:id',enSureAuthenticated,seller_get.seller_getAddTrackingById)
router.post('/addtracking',seller_post.seller_postTracking)

module.exports = router;