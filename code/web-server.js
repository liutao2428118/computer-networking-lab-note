// web服务器套接字作业
// 通过nodejs 创建socket web服务器
const net = require('net')
const fs = require('fs')

// Establish the connection
const server = net.createServer(function(socket) {
  console.log('client connected, address -  ', socket.remoteAddress, ' port - ', socket.remotePort);
  socket.setEncoding('utf-8')
  socket.on('data', function(data) {
    const head = data.split('\r\n')[0]
    const [method, url, version] = head.split(' ')
    const html = fs.readFileSync('./HelloWorld.html', 'utf-8')
    const stats = fs.statSync('./HelloWorld.html')
    // Send one HTTP header line into socket
    let header = `HTTP/1.1 200 OK\r\nConnection: close\r\nContent-Type: text/html\r\nContent-Length: ${stats.size}`
    
    // Send the content of the requested file to the client
    const httpMessage = `${header}\r\n
    
    ${html}`

    if(url === '/HelloWorld.html') {
      socket.write(httpMessage)
      socket.end()
    } else {
      // Send the content of the requested file to the client
      header =  `HTTP/1.1 404 Found\r\nConnection: close`
      socket.write(header)
      /// Close client socket
      socket.end()
    }
  })
  socket.on('end', function() {
    console.log('client disconnected')
  })
  socket.on('error', function(err) {
    console.log('socket error - ', err)
  })
})

// Prepare a sever socket 
server.maxConnections = 1
server.listen(6789, function() {
  console.log('echo server bound at port - 6789');
})
