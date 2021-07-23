const mongodb = require('mongodb')
const db = require('./db')

const deliverybills = db.get('deliverybills')

module.exports = deliverybills