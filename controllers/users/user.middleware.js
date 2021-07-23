const {check,validationResult} = require('express-validator')
const users = require('../../models/users.model');

const formValidateUser = [
    check('username','กรุณาระบุ Username').not().isEmpty().custom(value=>{
      return users.find({username:value}).then(user=>{
        if (user.length >0) {
          return Promise.reject('Username นี้ถูกใช้งานแล้ว');
        }
      })
    }),
    check('password','กรุณาระบุ Password').not().isEmpty(),
    check('email','กรุณาระบุ Email').isEmail().custom(value=>{
      return users.find({email:value}).then(user=>{
        if (user.length >0) {
          return Promise.reject('Email นี้ถูกใช้งานแล้ว');
        }
      })
    }),
    check('role','กรุณาระบุประเภทผู้ใช้งาน').not().isEmpty()
]


module.exports = {
    formValidateUser
}