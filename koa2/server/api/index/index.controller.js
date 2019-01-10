'use strict'
require('./index.model')
const indexModel = require('mongoose').model('Index')
exports.getAll = async ctx => {
  try {
    ctx.set('loginfo', encodeURI('test-index'))
    ctx.body = await indexModel.find({}).exec()
  } catch (error) {
    console.log(error)
    return ctx.throw(
      500,
      err.code
        ? { code: err.code, message: err.message }
        : { code: 4001, message: '系统内部错误' }
    )
  }
}
exports.saveOne = async ctx =>{
  try {
    ctx.set('loginfo', encodeURI('test-save'))
    const testArr = await indexModel.find({})
    let flag = false
    for (const key in testArr) {
      const item = testArr[key]
      if (item.name === ctx.request.body.name) {
        flag = true
      }  
    }
    if (flag) {
      ctx.throw(500, { code: 4008, message: '名称重复' })
    }
    // const addingOne = new indexModel(_.mer)
    const newOne = await indexModel.create(ctx.request.body)
    ctx.body = [newOne._id]
    ctx.status = 201
  } catch (error) {
    console.log(err)
    ctx.throw(500, { code: 4000, message: '服务器端错误' })
  }
} 
