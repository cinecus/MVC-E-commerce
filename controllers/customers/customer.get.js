const moment = require('moment')
const key = require('../../config/key')
const stripe = require('stripe')(key.stripeSecretKey)

const bills = require('../../models/bills.model')
const deliverybills = require('../../models/deliverybills.model')
const users = require('../../models/users.model')
// const products = require('../../models/products.model');
// const deliverybills = require('../../models/deliverybills.model');

const customer_getCart = (req,res,next)=>{
    const displayCart = {items:[],total:0}
    let total=0
    
    for(item in req.session.cart){
        displayCart.items.push(req.session.cart[item])
        total += req.session.cart[item].qty * req.session.cart[item].price
    }
    displayCart.total = total
    users.find({username:req.user.username},{},function(err,user){
        res.render('customer/cart',{cart:displayCart,users:user,stripePublishableKey:key.stripePublishableKey})
    })
}

const customer_getDeleteProductInCartById = (req,res,next)=>{
    var cart = req.session.cart
    var id = req.params.id
    delete req.session.cart[id]
    res.redirect('/customer/cart')
}

const customer_getInfo = async(req,res,next)=>{
    const user = await users.find({username:req.user.username},{})
    res.render('customer/info',{users:user})
}

const customer_getTracking = async(req,res,next)=>{
    const bill = await bills.find({customer:req.user.username},{})
    const deliverybill = await deliverybills.find({customer:req.user.username},{})
    res.render('customer/customertracking',{bills:bill,moment:moment,deliverybills:deliverybill})
}

module.exports = {
    customer_getCart,
    customer_getDeleteProductInCartById,
    customer_getInfo,
    customer_getTracking
}