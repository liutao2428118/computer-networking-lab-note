## wireshark 实验：入门（page52）

第一个实验是对 wireshark 抓包工具有个大概的了解，下面回答下实验中最后提到的问题：

输入 URL http://gaia.cs.umass.edu/wireshark-labs/INTRO-wireshark-file1.html，开始捕获。

**1. 列出上述步骤7中出现在未过滤的分组列表窗口的协议列中的3种不同的协议。

TCP UDP HTTP

**2. 从HTTP GET消息发送到HTTP OK回复需要多长时间？ (默认情况下，分组列表窗口中的时间列的值是自Wireshark开始捕获以来的时间(以秒为单位)。要想以日期格式显示时间，请选择Wireshark的“视图”下拉菜单，然后选择“时间显示格式”，然后选择“日期和时间”。)

5.675444 - 4.985546 = 0.6898

**3. gaia.cs.umass.edu(也称为wwwnet.cs.umass.edu)的Internet地址是什么？您的计算机的Internet地址是什么？

119.147.20.111

10.10.42.150

**4. 打印问题2提到的两个HTTP消息(GET和OK)。要这样做，从Wireshark的“文件”菜单中选择“打印”，然后选择“仅选中分组”和“按当前显示”按钮，然后单击确定。

## 实验资料

* 官方文档第六版 [Wireshark_Intro_v6.0.pdf](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/WiresharkLab/Wireshark%E5%AE%9E%E9%AA%8C-Intro/Wireshark_Intro_v6.0.pdf)

* 官方文档第七版 [Wireshark_Intro_v7.0.pdf](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/WiresharkLab/Wireshark%E5%AE%9E%E9%AA%8C-Intro/Wireshark_Intro_v7.0.pdf)

* 翻译 [Wireshark实验-Intro.md](https://github.com/moranzcw/Computer-Networking-A-Top-Down-Approach-NOTES/blob/master/WiresharkLab/Wireshark%E5%AE%9E%E9%AA%8C-Intro/Wireshark%E5%AE%9E%E9%AA%8C-Intro.md)
