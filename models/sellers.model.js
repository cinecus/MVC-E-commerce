const mongodb = require('mongodb')
const db = require('./db')

const sellers = db.get('sellers')

module.exports = sellers