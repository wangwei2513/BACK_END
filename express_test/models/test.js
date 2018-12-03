const mongoose = require('mongoose')
let testSchema = new mongoose.Schema({
  title: { type: String },
  label: { type: String },
  content: {type: String},
  file: {type: String},
  date: {type: String, default: Date.now}
})
const testModel = mongoose.model('weiWang_test', testSchema)
module.exports = testModel