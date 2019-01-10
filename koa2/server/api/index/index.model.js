'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const indexSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
})
mongoose.model('Index', indexSchema)
