# 网络层 IP 协议笔记

## 概述

在发送主机和接收主机之间传送段，在发送端将端封装到数据报中，接收方将该段解封装上交给传输层，网络层协议存在于每个主机月路由器中，路由器检查每一个经过它的 IP 数据报头部。

网络层的功能：

* 转发：将分组从路由器的输入接口转发到合适的输出接口
* 路由：使用路由算法来决定分组从发送主机到目标主机的路径，路由选择算法，路由选择协议

## 数据平面与控制平面

### 数据平面

本地每个路由器的功能，决定从路由器的输入接口到达的分组如何转发到输出接口，数据平面主要的工作是转发。

转发功能：

* 传统方式：基于目标地址+转发表
* SDN方式：基于多个字段+流表

### 控制平面

网络范围内的逻辑，决定数据报如何在路由器之间路由，决定数据报从源主机到目标主机之间的路径。

控制平面的方式：

* 传统路由算法：在路由器中被实现
* SDN(software-defined networking ): 在远程的服务器中实现

## 路由器的组成

路由器的构成可分为路由和转发，路由选择算法/协议-生产路由表，路由控制是同时与多个相邻的路由器之间交换信息来更新、维护路由表。转发是输入到输出链路交换数据报-根据路由表进行分组的转发，转发是单个路由器的独立完成的任务。

转发：

**输入端口：**

1. 在输入端口内存中的转发表中查找合适的输出端口，基于目标的转发仅仅是依赖于 IP 数据报的目标 IP 地址。通用转发是基于 IP 数据报头部字段的任意合计进行转发。

2. 输入端口的缓存：当交换机构的速率小于输入端口的汇聚速率时， 在输入端口可能要排队。

**输出端口：**

1. 输出端口从交换结构接收分组，然后发送到路由器外面的线路上。

2. 输出端口的缓存：当数据报从交换机构到达速率比传输速率快时需要输出端口缓存

**交换机构：**

将分组从输入缓冲区传输到合适的输出端口，交换速率：分组可以按照该速率从输入传输到输出

1. 通过内存交换：分组被拷贝到系统内存中，CPU 从分组的头部提前目标地址，查找转发表，找到对应的输出端口，拷贝到输出端口。转发速率被内存的带宽限制。一次只能转发一个分组。

2. 通过总线交换：数据报通过共享总线，从输入端口转发到输出端口，交换速率受限于总线带宽，一次处理一个分组。

3. 通过互联网络交换：Banyan（榕树）网络，crossbar (纵横)和其它的互联网络被开发，将多个处理器连接成多处理器。同时并发转发多个分组，克服总线带宽限制

## IP 协议

### IP 数据报格式

![Image text](./image/1645274504(1).png)

1. 版本号，4个字符，现有的版本有 IPv4 IPv6

2. 数据报头部长度，4个字符。IP 数据报的头部大小一般是 20 个字节

3. 数据类型，8个字符，一般不使用

4. 数据报总长度，16个字符，头部长度+数据长度

5. 标识，16位，IP 软件维持一个计数时，每产生一个数据报，计数器就加 1。当数据报长度超过网络的 MTU 而必须分片时，标识字段的值会被复制到所有的分片的标识字段中，为了最后能正确地重装为原来的数据报。

6. 标志，3位，最低位 MF = 1 时，表示后面还有分片，MF = 0 时，表示这是最后一个分片。中间的一位为 DF，DF = 1 时，表示不能分片， DF = 0 时，表示允许分片。

7. 片偏移，13位，分组在分片后，某分片在原分组中的相对位置，即相对于数据字段的起点，该片从何处开始。片偏移以 8 个字节为偏移单位，即分片长度为 8 字节的整数倍。

8. 生存时间，8个字符，英文缩写 TLL ，最大值为 255，路由器每次转发数据报是减 1，减到 0 是丢弃数据报

9. 上层协议，8字符，指出此数据报携带的数据使用何种协议，以便目的主机的 IP 层知道应将数据部分上交给哪个上层协议进行处理。

10. 首部检验和，16位，只检验数据报的首部字段，不包括数据部分，每经过一个路由器都要重新计算首部校验和。

11. 源地址，32位。

12. 目的地址，32位。

13. 选项字段，用来支持排错、测试以及安全等措施。

## 分片与重组

网络链路有 MTU （最大传输单元）- 链路层帧所携带的最大数据单元，不同的链路类型, MTU 也有所不同。如果 IP 数据报长度超过 MTU 就需要分片，数据报被分割成若干小的数据报，通过头部信息标识（上一节中的 5 6 7）每个小块，最后在目标主机重组小的数据报。

## IPv4 地址

IP 的地址是 32 位标示，对主机或者路由器的接口编，接口指的是主机/路由器和物理链路的关系，路由器通常拥有多个接口，主机也可以有多个接口，IP 地址和每个接口关联

### 子网

什么是子网，按现在的 IPv4 编址数量全球应该有4亿个 IP 地址，如果把这些 IP 地址全部查询一遍是不现实的，这里就需要通过子网来区分某一块的网络（每一个孤岛网络都可以称为子网），寻址时先到达该子网，在从区域子网到达目标主机。

子网在 ip 地址中的划分：

```js
IP 地址 = {<网络号>,<子网号>,<主机号>}
```
### IP 地址的分类

1. A 类地址：126 个子网络，每个子网160万个主机

2. B 类地址：16382 个子网，每个子网 6400 个主机

3. C 类地址：200 万个子网，每个子网 254 个主机

4. D 类地址：多播

5. E 类地址：预留给未来

A 类地址前 1 位标示网络类型，B 类地址是前 2 位，C 类地址是前 3 位。后续的位是标示子网号和主机号。

### 特殊的 IP 地址

* 子网部分全为 0 是本网络
* 主机部分全为 0 是本机
* 主机部分全为 1 是广播地址，这网络的所以主机

### 子网掩码

用协助 IP 地址区分那部分是子网号与主机号。不管有没有进行子网划分，只要把 IP 地址和子网掩码进行按位与，就能得到网络地址。

* A 类子网掩码：255.0.0.0
* B 类子网掩码：255.255.0.0
* C 类子网掩码：255.255.255.0

### 无类域间路由（CIDR）

子网部分可以在任意的位置，地址格式: a.b.c.d/x, 其中 x 是 地址中子网号的长度。

CIDR 下的子网掩码：

![Image text](./image/1645325085(1).png)

在子网掩码中 1 表示此位的 IP 地址位是子网，0 表示主机。在上面 CIDR 下的子网掩码例子中子网掩码应该是 255.255.254.0

简写的方式：200.23.16.0/23 这里的 23 表示有 23 个 1，也就是前 23 位都是表示子网，后面 9 位表示主机。

转发流程：

1. 获取 IP 数据报头部中的目标地址
2. 在路由器中转发表的表项是 IP地址 (IP Des addr) & 子网掩码 (mask)== 目标地址 (destination), 按照表项对应的接口转发数据报
3. 如果都没有找到,则使用默认表项转发数据报

### DHCP（动态主机配置协议）

允许主机在加入网络的时候，动态地从服务器那里获得IP地址。

DHCP工作概况: 
* 主机广播“DHCP discover” 报文[可选] 
* DHCP 服务器用 “DHCP offer”提供报文响应[可选] 
* 主机请求IP地址：发送 “DHCP request” 报文
* DHCP服务器发送地址：“DHCP ack” 报文

DHCP: 不仅仅是获取 IP addresses：
* IP 地址
* 第一跳路由器的IP地址（默认网关）
* DNS服务器的域名和IP地址
* 子网掩码 (指示地址部分的网络号和主机号)

## NAT（网络地址转换）

本地网络只有一个有效的 IP 地址，不需要从 ISP 分配一块地址，可用一个 IP 地址用于所有的（公司的局域网）设备-省钱。可以在局域网
改变设备地址情况下无须通知外界。可以改变 ISP 分配的地址，无须改变内部设备的地址。局域网内部的设备没有明确的地址，对外界是不可见的。

## IPv6

1. IPv4 是 32-bit地址空间即将很快用完，IPv6 的编址时 128-bit
2. IPv6 头部的格式可以加速处理和转发
3. IPv6 头部固定长度 40-bit
4. 扩展的地址层次结构。
5. 允许协议继续扩展
6. 支持即插即用（自动配置），因此不需要使用 DHCP。
7. 支持资源预分配，支持实时视像等要求保证一定的带宽和时延的应用
8. 首部改为 8 字节对齐。

IPv6 头部：

![Image text](./image/1645340626(1).png)

1. 版本，4位，该字段为 6
2. 通信量类，8位，为了区分不同的 IPv6 数据报的类别或优先级。
3. 流标号，20位，属于同一个流的数据报都有同样的流标号。
4. 有效载荷长度，16位，指明数据报除基本首部以外的字节数。
5. 下一个首部，8位，相当于 IPv4 的协议字段或可选字段。
6. 跳数限制，8位。
7. 源地址，128 位。
8. 目的地址，128 位。

其他变化：

1. Checksum （校验和）: 被移除掉，降低在每一段中的处理速度
2. Options （选择项）: 允许，但是在头部之外, 被 “Next Header” 字段标示
3. ICMPv6: ICMP的新版本
  * 附加了报文类型, e.g. “Packet Too Big”
  * 多播组管理功能

### IPv4 迁移 IPv6

隧道: 在IPv4路由器之间传输的IPv4数据报中携带IPv6数据报

## 通用转发与 SDN（软件定义网络）

传统的控制平面，每个路由器上都有实现路由算法元件（它们之间需要相互交互）- 形成传统IP实现方式的控制平面。互联网网络设备：传统方式都是通过分布式，每台设备的方法来实现数据平面和控制平面功能。造成的问题就是升级困难，管理困难

SDN方式的控制平面，一个不同的（通常是远程）控制器和CA交互，控制器决定分组转发的逻辑（可编程），CA所在设备执行逻辑。集中控制平面的工作，而不是想传统方式那样分布式的。远程服务器与路由器的 CA 交换，来实现控制平面的工作。

## 路由选择算法

### 路由的概念

按照某种指标找到一条从源节点到目标节点最优的路径。以网络（子网）为单位进行路由（路由通告+路由算法），网络（子网）为单位进行路由，路由信息传输、计算和匹配的代价低。前提条件是：一个网络所有节点地址前缀相同，且物理上聚集。路由就是：计算网络 到其他网络如何走的问题。

网络到网络的路由 = 路由器-路由器之间的路由

* 网络对应的路由器到其他网络对应的路由器的路由
* 在一个网络中：路由器-主机之间的通信，链路层解决
* 到了这个路由器就是到了这个网络

路由选择算法(routing algorithm):网络层软件的一部分,完成路由功能

路由最优化原则:
* 汇集树
  * 此节点到所有其它节点的最优路径形成的树
  * 路由选择算法就是为所有路由器找到并使用汇集树

### 路由选择算法的原则

* 正确性：算法必须是正确和完整的，使分组正确的一站一站接力达到目标主机。目标所有的站地址，在路由表中都能找到相应的表项；没有处理不了的目标站地址。
* 简单性：算法在计算的简单性，最优但复杂的算法，时间上延迟很大，不实用，不应为了获取路由信息增加很多的通信量。
* 健壮性(robustness):算法应能适应通信量和网络拓扑的变化：通信量变化，网络拓扑的变化算法能很快适应；不向很拥挤的链路发数据，不向断了的链路发送数据。

### 路由选择算法的分类

全局：
* 所有的路由器拥有完整的拓扑和边的代价的信息
* link state 算法

分布式：
* 路由器只知道与它有物理连接关系的邻居路由器，和到相应邻居路由器的代价值
* 叠代地与邻居交换路由信息、计算路由信息
* distance vector 算法

### link state（链路状态） 算法

LS路由的基本工作过程：
1. 发现相邻节点,获知对方网络地址
2. 测量到相邻节点的代价(延迟,开销)
3. 组装一个LS分组,描述它到相邻节点的代价情况
4. 将分组通过扩散的方法发到所有其它路由器以上4步让每个路由器获得拓扑和边代价
5. 通过Dijkstra算法找出最短路径（这才是路由算法）
  1. 每个节点独立算出来到其他节点（路由器=网络）的最短路径
  2. 迭代算法：第k步能够知道本节点到k个其他节点的最短路径


LS路由的工作原理（算法原理）：

D(v) 是源节点从已知最优路径到当前节点的代价
p(v) 当前节点的前序节点
(D(v), p(v)) 像这样就可以标记一个节点，例如：(20, w) 这里的20是源节点到当前的节点代价，w是当前节点到源节点的前序节点

会有两类节点，临时节点，永久节点，初始化时除了源节点外，其他的都是临时节点，从所有临时节点中找到一个节点代价最小的临时节点,将
之变成永久节点(当前节点)W，当前节点有会有相邻的节点，计算开销从新标记，添加到永久节点。一直这样循环下去。直到所有节点都添加的永久节点集合中。这样就可以计算是源节点到目标节点的最优路径了。

### distance vector （距离矢量） 算法

距离矢量路由选择的基本思想：
* 各路由器维护一张路由表
* 各路由器与相邻路由器交换路由表(待续)
* 根据获得的路由信息,更新路由表(待续)

代价及相邻节点间代价的获得：
* 跳数(hops), 延迟(delay),队列长度
* 相邻节点间代价的获得：通过实测

路由信息的更新:
* 根据实测得到本节点A到相邻站点的代价（如:延迟
* 根据各相邻站点声称它们到目标站点B的代价
* 计算出本站点A经过各相邻站点到目标站点B的代价
* 找到一个最小的代价，和相应的下一个节点Z，到达节点B经过此节点Z，并且代价为A-Z-B的代价
* 其它所有的目标节点一个计算法

核心原理：
* 每个节点都将自己的距离矢量估计值传送给邻居，定时或者DV有变化时，让对方去算
* 当x从邻居收到DV时，自己运算，更新它自己的距离矢量

##  因特网中自治系统内部的路由选择

在互联网中分为外部网关协议和内部网关协议，内部网关协议就是自治系统内部（ISP 可以看做一个自治系统）所使用的路由选择算法协议，下面介绍的
RIP 和 OSPF 都是内部网关协议，RIP 协议采用的是距离矢量算法，OSPF 协议采用的是链路状态算法

1. 内部网关协议 IGP

即在一个 AS 内使用的路由选择协议，目前使用的协议有多种，如 RIP 和 OSPF 等（这两个都是分布式路由选择协议）。

2. 外部网关协议 EGP

两个 AS 之间需要传递信息时，就需要一种协议将路由选择信息传递到另一个 AS，这样的协议就是外部网关协议。 目前使用的协议只有 BGP。


### RIP 协议

RIP 是一种分布式的基于距离矢量的路由选择协议，是互联网的标准协议，最大优点是简单。 RIP 要求网络中的每个路由器都得维护从它自己到其他每一个目的网络的距离记录。

特点：
1. 代价是跳数，一条链路上最多15个路由器，也是最多15跳，如果超过了15跳就表示无法到达，由此证明 RIP 只适合小型网络。
2. 每个30秒与邻居路由器交换距离矢量，通告。每个通告做多传25个子网的可达信息。如果在对方请求的情况下也会发送通告（距离矢量报文）
3. 因为 RIP 协议中的代价是跳数，它只选择一条具有最少路由器的路由，哪怕还存在一条高速但路由器较多的路由

如果180秒没收到通告表示宕机了邻居或者链路失效了，如果发现邻居失效了在形成新的通告告诉其他的邻居，邻居又会告诉它的邻居，一跳传一跳

RIP 是通过 传输层的 UDP 传送报文，网络层的协议使用了传输层的服务，以应用层实体的方式实现



### OSPF 协议
OSPF 最主要的特征是使用分布式的链路状态协议

1. 链路状态向全网（一个AS内部）泛洪，每个节点算出到目标的汇集树，然后装载路由表，让到来的分组进行转发。
2. OSPF 路由通告携带信息：
  * 传输链路状态的版本
  * TTL
  * 我的有哪些邻居节点，我到这些邻居的代价值

3. 只有当链路状态发生变化时，路由器才向所有路由器使用洪泛法发送此信息。不像 RIP，有无信息都要定期交换路由表信息。
4. 由于各路由器频繁的交换链路状态信息，最终所有路由器都能建立一个链路状态数据库，实际上就是全网拓扑结构图。

OSPF 的链路状态数据库能较快地进行更新，使各个路由器能及时更新其路由表，OSPF 的更新过程收敛快是其重要优点。

与 RIP 的不同：

1. 安全性：所以的 OSPF 报文都是经过认证的
2. 允许有多个代价相同的路径存在 (在RIP协议中只有一个)
3. 支持多播
4. 在大型网络中支持层次性OSPF

层次结构的区域划分

1. OSPF 还可以将自治系统细分为一个个区域，在区域内部的路由器只知道本区域的完整拓扑结构。
2. 在上层的区域叫主干区域（标识为 0.0.0.0），主干区域的作用是连通其他下层区域，区域之间通过区域边界路由器通信。
3. 每个区域至少有一个区域边界路由器，在主干区域内的路由器称为主干路由器。
4. 在主干区域还要有一个路由器和其他自治系统交换路由信息，这样的路由器被称为自治系统边界路由器。

## ISP 之间的路由选择: BGP

BGP (Border Gateway Protocol): 自治区域间路由协议“事实上的”标准

上节讲到的是 AS (路由器区域) 内部的路由选择算法，不管是 RIP 或者是 OSPF 都适合在小型网络中使用（某个区域内的路由器集合，自治系统）
，一个ISP可能包括1个或者多个AS，BGP 协议解决的就是 AS 之间路由选择的问题。这样路由就变成了两个层次路由，AS 内部的路由选择协议就是内部网关协议，只
负责 AS 内部路由路径选择，AS 间运行 AS 间路由协议，也就外部网关协议。

BGP 提供给每个AS以以下方法：
* eBGP: 从相邻的ASes那里获得子网可达信息
* iBGP: 将获得的子网可达信息传遍到AS内部的所有路由器
* 根据子网可达信息和策略来决定到达子网的“好”路径

允许子网向外其他网络通告“我在这里”，基于距离矢量算法（路径矢量）

![Image text](./image/1645445280(1).png)


![Image text](./image/1645445311(1).png)

## ICMP: 因特网控制报文协议

ICMP（Internet Control Message Protocol）Internet控制报文协议。它是TCP/IP协议簇的一个子协议，用于在IP主机、路由器之间传递控制消息。控制消息是指网络通不通、主机是否可达、路由是否可用等网络本身的消息。这些控制消息虽然并不传输用户数据，但是对于用户数据的传递起着重要的作用。

在网络可达性测试中使用的分组网间探测命令 ping 能产生 ICMP 回送请求和应答报文。目的主机收到 ICMP 回送请求报文后立刻回送应答报文，若源主机能收到 ICMP 回送应答报文，则说明到达该主机的网络正常。
