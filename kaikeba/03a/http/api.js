const http = require('http')
const fs = require('fs')

const app = http.createServer((req, res) => {
  const { url, method } = req
  console.log('req:', url, method)
  if (method === 'GET' && url === '/') {
    fs.readFile('./index.html', (err, data) => {
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (method === 'GET' && url === '/api/users') {
    console.log('req:', req.headers.cookie)
    // 设置cookie
    res.setHeader('Set-Cookie', 'cookie1=va222;')
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify([{ name: 'tom' }]))
  } else if (method === 'POST' && url === '/api/save') {
    let reqData = []
    let size = 0
    req.on('data', data => {
      console.log('>>>req on', data)
      reqData.push(data)
      size += data.length
    })
    req.on('end', function() {
      console.log('end')
      const data = Buffer.concat(reqData, size)
      console.log('data:', size, data.toString())
      res.end(`formdata:${data.toString()}`)
    })
  }

  // else if (method === 'OPTIONS' && url === '/api/users') {
  //   // 预检options中和/users接口中均需添加
  //   res.setHeader('Access-Control-Allow-Credentials', 'true')

  //   res.writeHead(200, {
  //     'Access-Control-Allow-Origin': 'http://localhost:3000',
  //     'Access-Control-Allow-Headers': 'X-Token,Content-Type',
  //     'Access-Control-Allow-Methods': 'PUT'
  //   })
  //   res.end()
  // }
})
// app.listen(3000)
module.exports = app
