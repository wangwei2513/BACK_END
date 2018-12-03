const testModel = require('../models/test')
module.exports = {
  /**
   * @msg: 保存单条数据
   * @param {type}
   * @return:
   */
  saveOne(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
      testModel.create(data, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  /**
   * @msg: 查找全部
   * @param {type}
   * @return:
   */
  findAll(data = {}, fields = null, options = {}) {
    return new Promise((resolve, reject) => {
      testModel.find(data, fields, options, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  /**
   * @msg: 查找单个数据
   * @param {type}
   * @return:
   */
  findOne(data) {
    return new Promise((resolve, reject) => {
      testModel.findOne(data, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  /**
   * @msg: 通过id查找单条数据
   * @param {type}
   * @return:
   */
  findOneById(id) {
    return new Promise((resolve, reject) => {
      testModel.findById(id, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  },
  /**
   * @msg: 更新
   * @param {type}
   * @return:
   */
  updateOne(conditions, update) {
    return new Promise((resolve, reject) => {
      testModel.update(conditions, update, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(dco)
        }
      })
    })
  },
  /**
   * @msg: 删除
   * @param {type} 
   * @return: 
   */
  removeOne(conditions) {
    return new Promise((resolve, reject) => {
      testModel.remove(conditions, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })
  }
}
