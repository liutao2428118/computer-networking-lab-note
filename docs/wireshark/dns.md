### Wireshark实验：DNS (Page121)

#### 1.运行nslookup以获取一个亚洲的Web服务器的IP地址。该服务器的IP地址是什么？

nslookup www.baidu.com

```
服务器:  UnKnown
Address:  10.10.120.12

非权威应答:
名称:    www.a.shifen.com
Addresses:  183.232.231.174
          183.232.231.172
Aliases:  www.baidu.com

```

#### 2.运行nslookup来确定一个欧洲的大学的权威DNS服务器。

nslookup -type=NS  ox.ac.uk

```
服务器:  UnKnown
Address:  10.10.120.12

DNS request timed out.
    timeout was 2 seconds.
非权威应答:
ox.ac.uk        nameserver = dns1.ox.ac.uk
ox.ac.uk        nameserver = auth5.dns.ox.ac.uk
ox.ac.uk        nameserver = dns2.ox.ac.uk
ox.ac.uk        nameserver = auth4.dns.ox.ac.uk
ox.ac.uk        nameserver = dns0.ox.ac.uk
ox.ac.uk        nameserver = ns2.ja.net
ox.ac.uk        nameserver = auth6.dns.ox.ac.uk

dns1.ox.ac.uk   internet address = 129.67.1.191
auth5.dns.ox.ac.uk      internet address = 93.93.128.67
auth5.dns.ox.ac.uk      AAAA IPv6 address = 2a00:1098:0:80:1000::10
auth6.dns.ox.ac.uk      internet address = 185.24.221.32
auth6.dns.ox.ac.uk      AAAA IPv6 address = 2a02:2770:11:0:21a:4aff:febe:759

```

#### 3.运行nslookup，使用问题2中一个已获得的DNS服务器，来查询Yahoo!邮箱的邮件服务器。它的IP地址是什么？

找不到

#### 4.找到DNS查询和响应消息。它们是否通过UDP或TCP发送？

UDP

#### 5.DNS查询消息的目标端口是什么？ DNS响应消息的源端口是什么？

都是 53

#### 6.DNS查询消息发送到哪个IP地址？使用ipconfig来确定本地DNS服务器的IP地址。这两个IP地址是否相同？

10.10.120.12  是相等的

#### 7.检查DNS查询消息。DNS查询是什么"Type"的？查询消息是否包含任何"answers"？

查询请求的type = A  查询结果不包含结果

#### 8.检查DNS响应消息。提供了多少个"answers"？这些答案具体包含什么？

提供了 3 个答案：

第一个是查别名记录
后面是查 全域 ip 地址

```
Answers
    www.ietf.org: type CNAME, class IN, cname www.ietf.org.cdn.cloudflare.net
        Name: www.ietf.org
        Type: CNAME (Canonical NAME for an alias) (5)
        Class: IN (0x0001)
        Time to live: 633 (10 minutes, 33 seconds)
        Data length: 33
        CNAME: www.ietf.org.cdn.cloudflare.net
    www.ietf.org.cdn.cloudflare.net: type A, class IN, addr 104.16.45.99
        Name: www.ietf.org.cdn.cloudflare.net
        Type: A (Host Address) (1)
        Class: IN (0x0001)
        Time to live: 111 (1 minute, 51 seconds)
        Data length: 4
        Address: 104.16.45.99
    www.ietf.org.cdn.cloudflare.net: type A, class IN, addr 104.16.44.99
        Name: www.ietf.org.cdn.cloudflare.net
        Type: A (Host Address) (1)
        Class: IN (0x0001)
        Time to live: 111 (1 minute, 51 seconds)
        Data length: 4
        Address: 104.16.44.99
```

#### 9.考虑从您主机发送的后续TCP SYN数据包。 SYN数据包的目的IP地址是否与DNS响应消息中提供的任何IP地址相对应？

是对应的

#### 10.这个网页包含一些图片。在获取每个图片前，您的主机是否都发出了新的DNS查询？

没有，本地有 DNS 缓存信息，如果是其他域的资源可能需要重新 DNS