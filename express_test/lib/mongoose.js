const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost:27017/express_test')
module.exports = db