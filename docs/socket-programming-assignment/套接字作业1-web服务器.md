# 套接字作业-web服务器

通过是 nodejs 实现，实现的很简易，只是为了完成作业！

`node server.js` 启动下面的服务

```js
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

```

运行截图

![Image text](./image/1642837669(1).png)

![Image text](./image/1642837572(1).png)

![Image text](./image/1642837759(1).png)

# 资料

* 官方文档 [Socket1_WebServer.pdf](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/SocketProgrammingAssignment/%E4%BD%9C%E4%B8%9A1-Web%E6%9C%8D%E5%8A%A1%E5%99%A8/Socket1_WebServer.pdf)
* 翻译 [作业1-Web服务器-翻译.md](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/SocketProgrammingAssignment/%E4%BD%9C%E4%B8%9A1-Web%E6%9C%8D%E5%8A%A1%E5%99%A8/%E4%BD%9C%E4%B8%9A1-Web%E6%9C%8D%E5%8A%A1%E5%99%A8-%E7%BF%BB%E8%AF%91.md)

