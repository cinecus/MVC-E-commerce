const mongodb = require('mongodb')
const db = require('./db')

const users = db.get('users')

module.exports = users