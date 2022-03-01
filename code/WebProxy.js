const net = require('net')
const fs = require('fs')

let clientSocket

const server = net.createServer(function(socket) {
  console.log('client connected, address -  ', socket.remoteAddress, ' port - ', socket.remotePort);
  socket.setEncoding('utf-8')
  socket.on('data', function(data) {
    const httpList = data.split('\r\n')
    const head = httpList[0]
    const host = httpList[1].split(':')[1]
    const [method, url, version] = head.split(' ')
    const filename = url.split('/')[2]
    var folder_exists = fs.existsSync('./'+filename)
    if(folder_exists) {
      const html = fs.readFileSync('./'+filename, 'utf-8')
      socket.write(html)
    } else {
      // 这块是伪代码，请求源数据需要HTTP 协议 请求
      clientSocket = net.connect({host:host+url, port: 80}, function() {})

      clientSocket.on('data', function(data) {
        fs.writeFileSync('./'+filename, data)
        socket.write(data)
      })
    }
  })
  socket.on('end', function() {
    console.log('client disconnected')
  })
  socket.on('error', function(err) {
    console.log('socket error - ', err)
  })
})


server.maxConnections = 1
server.listen(8899, function() {
  console.log('echo server bound at port - 8899');
})
