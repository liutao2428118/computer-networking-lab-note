const dgram = require('dgram');

let beforeTime = null;
let tmp = 0
const clientSocket = dgram.createSocket("udp4", function(msg, rinfo) {
  tmp++
  let rtt = (Date.now() - beforeTime) / 1000;
  console.log('序号 %d 服务器地址 %s RTT = %d msg = %s', tmp, rinfo.address, rtt, msg);
  // clientSocket.close()
});
for(let i = 0; i <= 9; i++) {
  let message = Buffer.from("Ping" + i);
  (function (index) {
    clientSocket.send(message,0,message.length,12000,'localhost', function(err, bytes) {
      if(err) {
        console.log('发送数据丢失 %d。', index);
      } else {
        beforeTime = Date.now();
        console.log('已经发送 %d 字节数据 %d', bytes, index);
      }
    });
  })(i);
};

clientSocket.on('error', function(err) {
  console.log(err)
})

