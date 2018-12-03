var express = require('express')
var router = express.Router()
const api = require('../lib/api')
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Header', 'Content-Type,Access-Token')
  res.header(
    'Access-Control-Allow-Methods',
    'PUT,POST',
    'GET',
    'DELETE',
    'OPTIONS'
  ),
    res.header('X-Powered-By', '3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
router.post('/addOne', (req, res, next) => {
  let one = {
    title: req.body.title,
    label: req.body.label,
    content: req.body.content,
    file: req.body.file,
    date: req.body.date
  }
  api.saveOne(one).then(result => {
    if (result) {
      res.send({
        data: result,
        success: true
      })
    } else {
      res.send({
        success: false
      })
    }
  })
})
router.get('getAll', (req, res, next) => {
  let _id = req.body._id
  let obj
  if (_id) {
    obj = {
      _id
    }
  }
  api.findAll(obj).then(result => {
    if (result) {
      res.send({
        data: result,
        success: true
      })
    } else {
      res.send({
        success: false
      })
    }
  })
})
router.get('/getOne', (req, res, next) => {
  let _id = req.body._id
  let obj
  if (_id) {
    obj = {
      _id: _id
    }
  }
  api.findOne(obj).then(result => {
    if (result) {
      res.send({
        data: result,
        success: true
      })
    } else {
      res.send({
        success: false
      })
    }
  })
})
router.delete('/removeOne', (req, res, next) => {
  let obj = {
    _id: req.body._id
  }
  api.removeOne(obj).then(result => {
    if (result) {
      res.send({
        data: result,
        success: true
      })
    } else {
      res.send({
        success: false
      })
    }
  })
})
router.put('/update', (req, res, next) => {
  let id = req.body._id
  let condition = {
    id
  }
  api.updateOne(condition, req.body).then(result => {
    if (result) {
      res.send({
        data: result,
        success: true
      })
    } else {
      res.send({
        success: false
      })
    }
  })
})
module.exports = router
