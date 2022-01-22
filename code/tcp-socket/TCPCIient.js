const net = require('net')
const readline = require('readline')

console.log('type "exit" or "quit" to quit.');

const socket = net.connect({port: 777}, function() {
  console.log('server connected')
  socket.setEncoding('utf-8')
  socket.write('Hello Echo Server\r\n')
})

socket.on('data', function(data) {
  console.log('got data from server - ', data);
  socket.destroy()
})

socket.on('error', function(err) {
  console.log('socket error - ', err);
})

socket.on('close', function () {
  console.log('echo client was closed');
  process.exit(0);
})