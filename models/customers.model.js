const mongodb = require('mongodb')
const db = require('./db')

const customers = db.get('customers')

module.exports = customers