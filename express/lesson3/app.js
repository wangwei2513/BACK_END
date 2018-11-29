const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')
let app = express()
app.get('/', function(req, res, next) {
  // 用superagent抓取页面内容
  superagent.get('https://cnodejs.org/').end(function(err, sres) {
    if (err) {
      return next(err)
    }
    // sres.text里面存储着网页的html内容将它传给cheerio.load
    let $ = cheerio.load(sres.text)
    let names = []
    $('#topic_list .user_avatar').each(function(idx, element) {
      var $element = $(element)
      // console.log($element)
      names.push({
        name: $element.attr('href').split('/')
      })
    })
    let items = []
    $('#topic_list .topic_title').each(function(idx, element) {
      var $element = $(element)
      let name = names[idx].name[names[idx].name.length-1]
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href'),
        name: name
      })
    })
    res.send(items)
  })
})
app.listen(3000, function(req, res) {
  console.log('OK')
})
