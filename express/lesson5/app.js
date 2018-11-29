const express = require('express')
const async = require('async')
let app = express()
let count = 0
fetchUrl = function(url, callBack) {
  let delay = parseInt((Math.random() * 100000000) % 2000, 10)
  count++
  console.log(`现在并发数是 ${count},正在抓取的是：${url},耗时${delay}毫秒`)
  setTimeout(() => {
    count--
    callBack(null, `${url} html content`)
  }, delay)
}
let urls = []
for (let i = 0; i < 30; i++) {
  urls.push(`http://_dataresource_${i}`)
}
app.get('/', (req, res) => {})
async.mapLimit(
  urls,
  5,
  (url, callBack) => {
    fetchUrl(url, callBack)
  },
  (err, result) => {
    console.log(`finals`)
    // console.log(`result,${result}`)
    console.log(result)
  }
)
