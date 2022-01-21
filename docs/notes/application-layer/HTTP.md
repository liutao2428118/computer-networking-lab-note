# HTTP 笔记

## HTTP概况

HTTP: 超文本传输协议

Web的应用层协议

客户/服务器模式

建立在 TCP 协议之上，TCP 协议层传输数据

HTTP1.0 非持久连接，最多只有一个对象在TCP连接上发送，下载多个对象需要多个TCP连接。

HTTP1.1 持久连接，多个对象可以在一个（在客户端和服务器之间的）TCP连接上传输，HTTP/1.1 默认使用持久连接

HTTP是无状态的，服务器并不维护关于客户的任何信息

## HTTP请求报文

两种类型的HTTP报文：请求、响应

* 请求报文：

![Image text](./image/1642752031(1).png)

![Image text](./image/1642752094(1).png)

* 响应报文：

![Image text](./image/1642752201(1).png)

* HTTP 方法类型

HTTP/1.0: GET POST  HEAD

HTTP/1.1: GET POST HEAD PUT DELETE 等

## 用户-服务器状态：cookies

![Image text](./image/1642752454(1).png)

## Web缓存 (代理服务器)

缓存既是客户端又是服务器

通常缓存是由ISP安 装 (大学、公司、居民区ISP)

为什么要使用Web缓存？

* 降低客户端的请求响应时间

* 可以大大减少一个机构内部网络与Internent接入链路上的流量

* 互联网大量采用了缓存：可以使较弱的ICP也能够有效提供内容

![Image text](./image/1642752647(1).png)