const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')
const async = require('async')
const url = require('url')
let app = express()
let count = 0
let arr
fetchUrl = function(url, callBack) {
  let delay = parseInt((Math.random() * 100000000) % 2000, 10)
  count++
  console.log(`现在并发数是 ${count},正在抓取的是：${url},耗时${delay}毫秒`)
  setTimeout(() => {
    count--
    callBack(null, `${url} html content`)
    superagent.get(url).end((err, res) => {
      if (err) {
        return next(err)
      }
      let $ = cheerio.load(res.text)
      arr.push({
        title: $('.top_full_title')
          .text()
          .trim(),
        href: url,
        comment1: $('.reply_content')
          .eq(0)
          .text()
          .trim()
      })
    })
  }, delay)
}
// let urls = []
// for (let i = 0; i < 30; i++) {
//   urls.push(`http://_dataresource_${i}`)
// }
// app.get('/', (req, res) => {})
// async.mapLimit(
//   urls,
//   5,
//   (url, callBack) => {
//     fetchUrl(url, callBack)
//   },
//   (err, result) => {
//     console.log(`finals`)
//     // console.log(`result,${result}`)
//     console.log(result)
//   }
// )
let codeUrl = 'https://cnodejs.org/'
app.get('/', (req, res) => {
  superagent.get(codeUrl).end((err, sres) => {
    if (err) {
      return console.err(err)
    }
    let topicUrls = []
    let $ = cheerio.load(sres.text)
    // 获取首页全部链接
    $('#topic_list .topic_title').each((idx, element) => {
      var $element = $(element)
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(codeUrl, $element.attr('href'))
      topicUrls.push(href)
    })
    async.mapLimit(
      topicUrls,
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
    // let ep = new eventproxy()
    // ep.after('topic_html', topicUrls.length, topics => {
    //   // topic为数组 包含40
    //   topics = topics.map(topicPair => {
    //     let topicUrl = topicPair[0]
    //     let topicHtml = topicPair[1]
    //     let $ = cheerio.load(topicHtml)
    //     return {
    //       title: $('.top_full_title')
    //         .text()
    //         .trim(),
    //       href: topicUrl,
    //       comment1: $('.reply_content')
    //         .eq(0)
    //         .text()
    //         .trim()
    //     }
    //   })
    //   console.log(topics)
    // })
    // topicUrls.forEach(topicUrl => {
    //   superagent.get(topicUrl).end((err, res) => {
    //     console.log(`fetch ${topicUrl} successful`)
    //     ep.emit(`topic_html`, [topicUrl, res.text])
    //   })
    // })
  })
})
app.listen(3000, () => {
  console.log('OK')
})
