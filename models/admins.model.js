const mongodb = require('mongodb')
const db = require('./db')

const admins = db.get('admin')

module.exports = admins