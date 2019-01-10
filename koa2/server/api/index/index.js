'use strict'
const router = require('koa-router')()
const controller = require('./index.controller')
router.get('/getAll', controller.getAll)
router.post('/saveOne', controller.saveOne)
module.exports = router