let express = require('express')
// 调用express实例
let app = express()
app.get('/', function (req,res) {
  res.send('hello world')  
})
app.listen(3000, function () {
  console.log('app is listening at port 3000!')
})
