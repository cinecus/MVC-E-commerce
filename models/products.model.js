const mongodb = require('mongodb')
const db = require('./db')

const products = db.get('products')

module.exports = products