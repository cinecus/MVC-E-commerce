const mongodb = require('mongodb')
const db = require('./db')

const bills = db.get('bills')

module.exports = bills