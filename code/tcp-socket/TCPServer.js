const net = require('net')

const server = net.createServer(function(socket) {
  console.log('client connected, address -  ', socket.remoteAddress, ' port - ', socket.remotePort);
  socket.setEncoding('utf-8')
  socket.on('data', function(data) {
    console.log('got data from client - ', data);
    socket.write('You said "' + data + '"');
  })

  socket.on('end', function() {
    console.log('client disconnected')
  })

  socket.on('error', function(err) {
    console.log('socket error - ', err)
  })
})

server.maxConnections = 80
server.listen(777, function() {
  console.log('echo server bound at port - 777');
})