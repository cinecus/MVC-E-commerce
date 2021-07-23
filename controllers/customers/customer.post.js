var stripe = require('stripe')('sk_test_51J5sztExKBWaCkFD1sRYIR6kRpEOiSYeB2UpccBIJXoxhT44GHZueDoBeMeqcfq9SyKlCn2R0AVQyRsbckEdmjYt00YpgLOfVu')

const products = require('../../models/products.model')
const bills = require('../../models/bills.model')
const deliverybills = require('../../models/deliverybills.model')
const users = require('../../models/users.model')

const customer_postProductToCartById = (req,res,next)=>{
    var product_id = req.body.product_id
    req.session['cart'] = req.session['cart'] || {}
    products.find({
        _id:product_id
    },{},function(err,product){
        //กรณีซื้อชิ้นเดิมมากกว่า 1 ชิ้น
        if(req.session.cart[product_id]){
            req.session.cart[product_id].qty++;
        }else{
            product.forEach(function(item){
                req.session.cart[product_id] ={
                    item:item._id,
                    title:item.name,
                    price:item.price,
                    qty:1
                }
            })
        }
        res.redirect('/')
        //cart id, name , price , qty  
    }) 
}

const customer_postInfo = (req,res,next)=>{
    users.findOneAndUpdate({ username: req.user.username }, {
        $set: {
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
        }
      }, function (err) {
        if (err) throw err
        res.location('/customer/info')
        res.redirect('/customer/info')
      })
}


const customer_postPayment = async (req,res,next)=>{
    var token = req.body.stripeToken
    var amount = req.body.amount
    var cart = req.session.cart
    var charge = stripe.charges.create({
    amount:amount,
    currency:"usd",
    source:token
  }
  ,function(err,charge){
    if(err) throw err
  })
  const bill =await bills.insert({
    customer:req.user.username,
    name:req.body.name,
    tel:req.body.tel,
    address:req.body.address,
    date: new Date(),
    cart:req.session.cart
    },{})
    await Object.values(cart).forEach(async item=>{
        const product = await products.find({_id:item.item},{})
        await product.forEach(entry=>{
            deliverybills.insert({
                bill_id:bill._id,
                product_id:entry._id,
                seller:entry.seller,
                product_name:entry.name,
                customer:req.user.username,
                address:req.body.address,
                qty:item.qty,
                date:new Date(),
                trackingnumber:"",
                status:"Wait"
                },{},function(err){
                if (err) throw err
                })
        })
    })
    req.session.cart = null
    res.redirect('/')
}

module.exports = {
    customer_postProductToCartById,
    customer_postInfo,
    customer_postPayment
}