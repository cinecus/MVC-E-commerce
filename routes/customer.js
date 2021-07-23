var express = require('express');
var router = express.Router();

//controller
const enSureAuthenticated = require('../controllers/users/user.auth')
const customer_get = require('../controllers/customers/customer.get')
const customer_post = require('../controllers/customers/customer.post')

//เพิ่มสินค้าลงตะกร้า
router.post('/cart/:id',enSureAuthenticated, customer_post.customer_postProductToCartById)

//แสดงหน้าตะกร้าสินค้า
router.get('/cart',enSureAuthenticated,customer_get.customer_getCart)
//ลบสินค้าในตะกร้า
router.get('/delete/:id',enSureAuthenticated,customer_get.customer_getDeleteProductInCartById)

//ข้อมูลลูกค้า
router.get('/info',enSureAuthenticated,customer_get.customer_getInfo)
router.post('/info',customer_post.customer_postInfo)

//ข้อมูลการจ่ายเงิน
router.post('/payment',customer_post.customer_postPayment)

//ติดตามการส่งสินค้า
router.get('/tracking',enSureAuthenticated,customer_get.customer_getTracking)


module.exports = router;