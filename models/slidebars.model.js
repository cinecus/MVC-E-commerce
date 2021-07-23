const mongodb = require('mongodb')
const db = require('./db')

const slidebars = db.get('slidebars')

module.exports = slidebars