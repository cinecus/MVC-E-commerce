var express = require('express');
var router = express.Router();

//controller
const product_get = require('../controllers/products/product.get')

//search product by sidebar
router.get('/searchproduct/', product_get.product_getSearchProduct);
//show product by id
router.get('/showproduct/:id', product_get.product_getShowProductById)




module.exports = router;