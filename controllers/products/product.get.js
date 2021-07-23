const categories = require('../../models/categories.model')
const products = require('../../models/products.model')

const product_getSearchProduct = async(req,res,next)=>{
    const categoryname = req.query.category
    if(categoryname){
        const category = await categories.find({},{})
        const product = await products.find({category:categoryname},{})
        res.render('product/searchproduct',{categories:category,products:product})
    }
}

const product_getShowProductById  = async(req,res,next)=>{
    const category = await categories.find({},{})
    const product = await products.find(req.params.id,{})
    res.render('product/showproduct',{categories:category,products:product})
}
module.exports ={
    product_getSearchProduct,
    product_getShowProductById
}