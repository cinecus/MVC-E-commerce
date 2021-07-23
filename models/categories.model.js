const mongodb = require('mongodb')
const db = require('./db')

const categories = db.get('categories')

module.exports = categories