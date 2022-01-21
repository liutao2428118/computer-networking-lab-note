# FTP: 文件传输协议 笔记

## 概述

向远程主机上传输文件或从远程主机接收文件

* 客户/服务器模式  
  * 客户端：发起传输的一方 
  * 服务器：远程主机

## FTP: 控制连接与数据连接分开

FTP客户端与FTP服务器通过端口 21 联系，并使用 TCP 为传输协议

客户端通过控制连接获得身份确认

客户端通过控制连接发送命令浏览远程目录

收到一个文件传输命令时，服务器打开一个到客户端的数据连接

一个文件传输完成后，服务器关闭连接

## FTP命令、响应

* 命令样例：
  * 在控制连接上以ASCII文本方式传送
  * USER username
  * PASS password
  * LIST：请服务器返回远程主机当前目录的文件列表
  * RETR filename：从远程主机的当前目录检索文件(gets)
  * STOR filename：向远程主机的当前目录存放文件(puts)

* 返回码样例：
  * 状态码和状态信息 (同HTTP)
  * 331 Username OK, password required
  * 125 data connection already open; transfer starting
  * 425 Can’t open data connection
  * 452 Error writing file