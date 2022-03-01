const net = require('net')

// Mail content
const subject = "I love computer networks!"
const contenttype = "text/plain"
const msg = "I love computer networks!"
const endmsg = "\r\n.\r\n"

const mailserver = 'smtp.163.com'

const fromaddress = "liutao2428118@163.com"
const sq = "YEXUCHVEMVAJVHTY"
const toaddress = "564310762@qq.com"

const  username = Buffer(fromaddress).toString('base64')
const password = Buffer(sq).toString('base64')

const socket = net.connect({host: mailserver, port: 25}, function() {
  console.log('server connected')
  socket.setEncoding('utf-8')
  socket.setEncoding('utf-8')
  socket.write('HELO Alice\r\n')
  socket.setEncoding('utf-8')
  socket.write('AUTH LOGIN\r\n')
  socket.setEncoding('utf-8')
  socket.write(username + '\r\n')
  socket.setEncoding('utf-8')
  socket.write(password + '\r\n')
  socket.setEncoding('utf-8')
  socket.write('MAIL FROM: <' + fromaddress + '>\r\n')
  socket.setEncoding('utf-8')
  socket.write('RCPT TO: <' + toaddress + '>\r\n')
  socket.setEncoding('utf-8')
  socket.write('DATA\r\n')

  let message = 'from:' + fromaddress + '\r\n'
  message += 'to:' + toaddress + '\r\n'
  message += 'subject:' + subject + '\r\n'
  message += 'Content-Type:' + contenttype + '\t\n'
  message += '\r\n' + msg
  socket.setEncoding('utf-8')
  socket.write(message)

  socket.setEncoding('utf-8')
  socket.write(endmsg)

  socket.setEncoding('utf-8')
  socket.write('QUIT\r\n')
  // socket.destroy()

})

socket.on('data', function(data) {
  let code = data.slice(0, 3)
  console.log(data)
})

socket.on('error', function(err) {
  console.log('socket error - ', err)
})

socket.on('close', function () {
  console.log('echo client was closed')
  process.exit(0)
})