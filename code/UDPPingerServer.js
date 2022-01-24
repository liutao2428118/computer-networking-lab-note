const dgram = require('dgram');

const server = dgram.createSocket("udp4");
server.on('message', function(msg, rinfo) {
  console.log('已接收客户端信息：', msg.toString());
  const rand = Math.random()*10;
  const message = msg.toString().toUpperCase();
  const buf = Buffer.from(message);
  if(rand < 4) {
    return false
  }
  server.send(buf,0,buf.length,rinfo.port,rinfo.address);
})
server.on('listening', function() {
  const address = server.address();
  console.log('服务器开始监听，地址 %j', address);
})
server.bind(12000, 'localhost');