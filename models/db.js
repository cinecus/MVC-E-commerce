const monk = require('monk')
const url = "mongodb+srv://cinecus:12345@cluster0.yulvt.mongodb.net/E-CommerceDB?retryWrites=true&w=majority"

var db = monk(url)

module.exports = db