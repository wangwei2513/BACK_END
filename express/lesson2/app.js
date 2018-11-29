let express = require('express')
let utility = require('utility')

let app = express()
app.get('/', function (req,res) {
  let q = req.query.q
  // 调用utility.md5方法
  let md5Value = utility.md5(q)
  res.send(md5Value)
})
app.listen(3000, function (req, res) {
  console.log('OK')
})
