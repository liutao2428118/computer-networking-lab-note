# Wireshark实验：探究DHCP (Page240)

1. DHCP 消息是通过 UDP 还是 TCP 发送的？

UDP

2. 绘制时间流图形。说明客户端和服务器之间第一次四个 DHCP 发现，DHCP提供，DHCP 请求以及 DHCP 响应的顺序，说明您的结果中对于每个数据包，指示源和目标端口号是否与本实验分配中给出的示例相同？

可以

3. 主机的链路层（例如以太网）地址是什么？

00:08:74:4f:36:23

4. DHCP 发现消息中的哪些值将此消息与 DHCP 请求消息区不同？

我发现有三处不同。首先是 DHCP 选项 53 不同，一个是 DHCP 发现，一个是
DHCP 请求。然后 DHCP 请求还比 DHCP 发现多了两个选项：54 DHCP 服务器标识-DHCP
服务器的信息，以及 81 客户端完全限定域名-猜测与域名解析有关？

5. 第一次四个 DHCP 发现，DHCP 提供，DHCP 请求以及 DHCP 响应的 Transaction-ID 值是多少？Transaction-ID 字段目的是什么。

都是 0x3e5e0ce3,这是个随机生成的值，当客户端请求和服务器一样使才会认为有效，这是一个安全性保证的措施。

6. 主机使用 DHCP 获取 IP 地址。主机在 DHCP 的 4 次问询和回答之后获取了地址。请问如果在这 4 次 DHCP 问询和回答中，如果主机没有 IP 地址，那么 IP 数据报的值是什么？请分别指出这 4 个 DHCP 的消息 IP 数据报源头和目标 IP。

主机如果没有 IP 地址，IP 数据报的值是 0.0.0.0，目的地址广播地址 255.255.255.255。

7. 您的 DHCP 服务器的 IP 地址是多少？

192.168.1.1

8. 发送 DHCP Offer 消息的 DHCP 服务器 IP 是什么，指示哪条 DHCP 消息包含提供的 DHCP 地址。

192.168.1.1 分配的地址是 192.168.1.101

9. 在作者的例子中，主机和 DHCP 服务器之间没有中继代理。 跟踪中的哪些值表明没有中继代理？ 您的实验中是否有中继代理？ 如果是这样，代理的IP 地址是什么？

没有

10. 解释 DHCP offer 消息中路由器和子网掩码字段的用途。

由上问可知路由器就起到了中续代理作用，而子网掩码就是区分该网段，可以得知相同网段的电脑 IP 范围，默认网关（路由地址）。

11. 在脚注 2 作者提供的抓包结果中，DHCP 服务器会向作者提供特定的 IP 地址（请见上面问题 8）。请问客户端接受使用是否对第一个提供 DHCP offer消息的 DHCP 地址？客户端的响应（DHCP 请求中）哪里是它所要求的地址。

192.168.1.101

12. 解释租约时间的目的。 您的实验中的租约时间有多长？

86400s

13. DHCP 释放消息的目的是什么？DHCP 服务器是否发出收到客户端 DHCP 释放请求的确认。如果客户端的 DHCP 释放消息丢了会发生什么。

客户端用来发出释放该 IP 不再租用的信息。如图服务器并没有发出 DHCP 释放请
求的确认，而是直接收回了 IP；如果客户端的 DHCP 释放消息丢了，猜测就会继续使
用这个 IP 判断是否到达租用时间，以及是否续订。

14. 从 Wireshark 窗口中清除 bootp 过滤器。 在 DHCP 数据包交换期间是否发送或接收了任何 ARP 数据包？ 如果接收到了，请说明这些 ARP 数据包的用途。

有，是查询 MAC 地址的