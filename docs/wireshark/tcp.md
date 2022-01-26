# Wireshark实验：探究TCP (Page200)

3. 客户端计算机（源）将文件传输到 gaia.cs.umass.edu 所使用的 IP 地址和TCP 端口号是多少？

ip: 10.10.41.160 端口：58950

4. 用于在客户端计算机和 gaia.cs.umass.edu 之间启动 TCP 连接的 TCP SYN 区段的序列号是什么？ 将区段标识为 SYN 区段的区段有什么功能？

序列号为：0 用于建立连接

5. gaia.cs.umass.edu 发送给客户端计算机以回复 SYN 的 SYNACK 区段的序列
号是多少？ SYNACK 区段中的 Acknowledgment 栏位的值是多少？
Gaia.cs.umass.edu 是如何确定此 Acknowledgment 的数值的？ 在将区段标识
为 SYNACK 区段的区段在连线中有什么功能？

序列号：0  确定号：1 , 通过序列号，表示服务器确认连接，发送SYN-ACK确认，握手的第二步

6. 包含 HTTP POST 命令的 TCP 区段的序列号是多少？ 请注意，为了找到
POST 命令，您需要深入了解 Wireshark 窗口底部的数据包内容⫿段，在其
DATA 栏位中查找带有“POST”的区段。

152499

7. 将包含 HTTP POST 的 TCP 区段视为 TCP 连接中的第一个区段。在这个
TCP 连线中前六个 TCP 区段的序列号是什么（包括包含 HTTP POST 的
段）？ 每区段发送的时间是什么时候？ 收到的每个区段的 ACK 是什么时
候？ 鉴于发送每个 TCP 区段的时间与收到确认的时间之间的差异，六个区
段中每个区段的 RTT 值是多少？

seq=144279 TSval=2240144328 len=1444
....

8. 前六个 TCP 区段的长度是多少？

len=1444

9. 对于整个跟踪包，收到的最小可用缓冲区空间量是多少？ 缺少接收器缓冲
区空间是否会限制发送方传送 TCP 区段？

收到的最小缓冲窗口是 283, 会限制

10. 在跟踪文件中是否有重传的区段？ 为了回答这个问题，您检查了什么（在
跟踪包中）？

没发现重传，序列号一直在增加

11. 接收器通常在 ACK 中确认多少数据？ 您是否可以识别接收方每隔一个接收
到的区段才发送确认的情况（参见本文第 250 页的表 3.2）。

没有累计确认的情况

12. TCP 连接的吞吐量（每单位时间传输的⫿节数）是多少？ 解释你如何计算
这个值。

即吞吐量 =  数据传输大小/所用时间


13. 使用时序图（Stevens）绘图工具查看从客户端发送到 gaia.cs.umass.edu 服务
器的区段的序列号与时间关系图。您能否确定 TCP 的慢启动阶段的开始和
结束位置，以及拥塞避免接管的位置？ 评论测量数据与我们在文本中研究
的 TCP 的理想化行为的不同之处。


# 资料

* 官方文档第六版：[Wireshark_TCP_v6.01.pdf](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/WiresharkLab/Wireshark%E5%AE%9E%E9%AA%8C-TCP/Wireshark_TCP_v6.0.pdf)

* 官方文档第七版: [Wireshark_TCP_v7.0.pdf](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/WiresharkLab/Wireshark%E5%AE%9E%E9%AA%8C-TCP/Wireshark_TCP_v7.0.pdf)

* 翻译: [Wireshark_TCP_v7.0_Simplified_Chinese.pdf](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/WiresharkLab/Wireshark%E5%AE%9E%E9%AA%8C-TCP/Wireshark_TCP_v7.0_Simplified_Chinese.pdf)


