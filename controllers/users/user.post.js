const users = require('../../models/users.model');
const sellers = require('../../models/sellers.model');
const customers = require('../../models/customers.model');
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')


const user_postRegister = async(req,res,next)=>{
    const result = validationResult(req)
    const errors = result.errors
    if(!result.isEmpty()){
        res.render('user/register',{errors:errors})
    }else{
    //insert Data
    const username = req.body.username
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const email = req.body.email
    const role = req.body.role
    newuser = {
      username:username,
      password:hashedPassword,
      email:email,
      role:role,
      address:"",
      name:"",
      tel:""
    }
    users.insert(newuser,function(err,success){
      if(err){
        res.send(err)
      }
    })
    if(newuser.role=="seller"){
      sellers.insert({username:username},function(err,success){
        if(err){
          res.send(err)
        }else{
          res.location('/user/login')
          res.redirect('/user/login')
        }
      })
    }
    if(newuser.role=="customer"){
      customers.insert({username:username},function(err,success){
        if(err){
          res.send(err)
        }else{
          res.location('/user/login')
          res.redirect('/user/login')
        }
      })
    }
  }
}

const user_postLogin = (req,res,next)=>{
    if(req.user[0].role=="seller"){
        res.redirect('/seller/manage')
    }
    if(req.user[0].role=="customer"){
        res.redirect('/')
    }
}

module.exports = {
    user_postRegister,
    user_postLogin
}