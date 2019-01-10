const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`) // 打印URL
  await next() // 调用下一个middleware
})

app.use(async (ctx, next) => {
  const start = new Date().getTime() // 当前时间
  await next() // 调用下一个middleware
  const ms = new Date().getTime() - start // 耗费时间
  console.log(`Time: ${ms}ms`) // 打印耗费时间
})

// app.use(async (ctx, next) => {
//   await next()
//   ctx.response.type = 'text/html'
//   ctx.response.body = '<h1>Hello, koa2!</h1>'
// })
router.get('/home/:name', async (ctx, next) => {
  let name = ctx.pramas
  console.log(name)
  ctx.response.body = `<h1>${name}</h1>`
})
app.use(router.routes())
app.listen(3000)
console.log('app started at port 3000')
