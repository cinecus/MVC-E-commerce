const multer = require('multer')
const { check, validationResult } = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".jpg")
    }
  })

const upload = multer({ storage: storage })
const uploadImage =  upload.single("image")

const formValidateProduct = [
    check('name', 'กรุณาระบุชื่อสินค้า').not().isEmpty(),
    check('description', 'กรุณาระบุคำอธิบายสินค้า').not().isEmpty(),
    check('price', 'กรุณาระบุราคาสินค้า').not().isEmpty(),
    check('category', 'กรุณาระบุหมวดหมู่ให้ถูกต้อง').not().isEmpty()
]

module.exports = {
    uploadImage,
    formValidateProduct
}