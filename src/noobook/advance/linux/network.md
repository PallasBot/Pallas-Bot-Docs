# 网络和防火墙：连不上 WebUI？八成是门被锁了

bot 服务跑起来了，**但从你电脑访问 WebUI 死活连不上**？  
**这 9 成是「门被锁了」**。这一页教你怎么定位是「门」的问题、还是「路」的问题。

> **前置**：先看 [「你需要知道的」里的 IP 和域名](/noobook/noob/u2know#ip和域名) 把 IP/端口/公网/内网的概念再过一遍，下面会直接用。

---

## 一、门有三层！先搞清在哪一层

小猪想从自己电脑访问服务器 WebUI，**有三道门**要过：

```
你的电脑  →  [第 1 道] 云服务商安全组
              ↓
          [第 2 道] 服务器内防火墙（ufw / firewalld）
              ↓
          [第 3 道] 应用本身（service 监听 0.0.0.0 还是 127.0.0.1？）
              ↓
           WebUI 端口（如 8080）
```

::: danger ❌ 萌新最高频翻车：「我都放行了为啥还是连不上？」
- ✅ 服务商安全组放行了 → ❌ 服务器内 ufw 没放行 → 还是连不上
- ✅ ufw 放行了 → ❌ 配置文件绑定了 `127.0.0.1` → 还是连不上
- **必须三道门全开**，路才通。
:::

排查顺序：**从外往里**（先看公网通不通，再看端口在不在听，最后看应用配置）→ 详见 [debug.md](/noobook/advance/linux/debug)

---

## 二、`curl` 和 `wget`：测试「能不能拉到东西」

```bash
# curl：现代首选，啥协议都能搞
curl https://www.baidu.com          # 看返回 HTML
curl -I https://www.baidu.com       # 只看响应头（看 HTTP 状态码）
curl -o file.zip https://xxx.com/x  # 下载并改名

# 测自家服务：在服务器上 curl 自己
curl http://127.0.0.1:8080
# 看到 HTML/JSON → 服务在跑
# Connection refused → 服务没跑或端口不对（先去 [systemd.md](/noobook/advance/linux/systemd) 查 status）

# wget：老牌，下载更「傻瓜」
wget https://xxx.com/file.zip
# 断点续传
wget -c https://xxx.com/big-file.zip
```

| 命令 | 特点 | 适合 |
| :--- | :--- | :--- |
| `curl` | 默认输出到屏幕，可配各种协议 | 调试 API、测试连通 |
| `wget` | 默认存成文件，递归下载强 | 「我要下这个文件」 |

> **小猪的肌肉记忆**：  
> 「服务在跑吗？」 → `curl http://127.0.0.1:端口`  
> 「能上外网吗？」 → `curl -I https://www.baidu.com`  
> 「下个文件」 → `wget URL`

---

## 三、`ping`：最基本的「通不通」测试

```bash
ping 192.168.1.100        # 测本机到目标
ping www.baidu.com        # 测外网（要 DNS 能解析）
ping -c 4 8.8.8.8         # 只 ping 4 次（默认无限，手 Ctrl+C 停）
```

> **小猪要懂**：`ping` 用的是 ICMP 协议，**很多服务器默认禁 ICMP**（怕被扫）。  
> `ping` 不通**不代表**机器死了，可能是防火墙**只挡了 ICMP**。  
> 这时候改用 `telnet 目标 端口` 或 `curl http://目标:端口` 测 TCP 才是真·通不通。

---

## 四、`ss` 和 `netstat`：看「服务器哪些门开着了」

```bash
# 看所有 TCP 监听端口（用 ss，新系统都带）
sudo ss -tlnp
# -t  TCP
# -l  Listen（监听中）
# -n  数字显示（不解析名字）
# -p  显示进程（要 root）

# 经典输出：
# State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port  Process
# LISTEN  0       128     0.0.0.0:22         0.0.0.0:*          sshd
# LISTEN  0       128     127.0.0.1:8080     0.0.0.0:*          python3
# LISTEN  0       128     0.0.0.0:8081       0.0.0.0:*          node
#                       ^^^^^^^^^^^^^^^^^^^
#                       这串就是「监听地址:端口」

# 老系统没 ss？用 netstat
sudo netstat -tlnp
```

> **关键看 `Local Address` 列**：
> - `0.0.0.0:8080` → **所有 IP 都能访问**（公网/内网都行）✅
> - `127.0.0.1:8080` → **只有本机能访问**（你从外面连会被拒）❌
> - `192.168.1.100:8080` → 只有这个内网 IP 能访问

> [「你需要知道的」](/noobook/noob/u2know) 提过的「`0.0.0.0` 是广播地址」就是这里用 —— 看到应用监听 `0.0.0.0` 才说明「**我的服务**」是开门的；如果只听 `127.0.0.1`，**改配置文件绑到 `0.0.0.0`**（比如 Pallas-Bot 的 `host` 配置项）。

---

## 五、双层门锁：服务商安全组 vs 服务器内防火墙

### 第 1 道门：云服务商「安全组」

腾讯云、阿里云、AWS、华为云都叫「安全组」（或「防火墙规则」），**是云厂商在你的服务器**外面**套的一层虚拟防火墙**。

- 控的是**进出云服务器的流量**
- 默认：只放行 22（SSH），其它全拦
- **不开放 → 服务器收不到任何包**，你 ufw 配了也白搭

| 厂商 | 控制台路径 |
| :--- | :--- |
| 腾讯云 | 云服务器 → 安全组 → 入站规则 |
| 阿里云 | ECS → 安全组 → 入站规则 |
| AWS | EC2 → Security Groups → Inbound Rules |
| 华为云 | ECS → 安全组 → 入站规则 |

> 每家控制台长得不一样，**搜「{厂商名} 安全组 放行端口」** 就有官方教程。

**典型入站规则**（WebUI 想外网访问 8080）：

| 协议类型 | 端口范围 | 源（IP） | 策略 |
| :--- | :--- | :--- | :--- |
| TCP | 8080 | 0.0.0.0/0 | 允许 |
| TCP | 22 | 你家 IP/32 | 允许（SSH 别全网开放！） |
| TCP | 80, 443 | 0.0.0.0/0 | 允许（如果跑网站） |

::: danger ❌ 千万别把 22 端口对 `0.0.0.0/0` 全网开放太久
SSH 22 端口**全网开放 + 弱密码** = **等着被黑**。  
要么用 [ssh.md 密钥登录](/noobook/advance/linux/ssh#二密钥登录推荐-一个文件当-电子钥匙)，要么**把源 IP 限制成自己家 IP**（动态 IP 的话用 `0.0.0.0/0` + 密钥 + 改端口三件套兜底）。
:::

### 第 2 道门：服务器内防火墙 `ufw` / `firewalld`

Linux 系统**自己也有**防火墙，默认是开着的。

**`ufw`**（Ubuntu 自带，最简单）：

```bash
# 看状态
sudo ufw status

# 默认拒绝入站（最安全的默认）
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 放行 22（SSH）
sudo ufw allow 22/tcp

# 放行 8080（WebUI）
sudo ufw allow 8080/tcp

# 放行某个来源 IP 才能访问（比如只让你家访问）
sudo ufw allow from 123.45.67.89 to any port 8080

# 启用
sudo ufw enable

# 删除某条规则
sudo ufw delete allow 8080/tcp
```

**`firewalld`**（CentOS / RHEL / Fedora 自带）：

```bash
# 看状态
sudo firewall-cmd --list-all

# 放行 8080（永久生效）
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload

# 删掉
sudo firewall-cmd --permanent --remove-port=8080/tcp
sudo firewall-cmd --reload
```

### 怎么看是「第 1 道」还是「第 2 道」挡住了？

| 测试 | 工具 | 含义 |
| :--- | :--- | :--- |
| `curl http://服务器公网IP:8080`（在自己电脑跑） | 网络 | 看到内容 → 两道门都通；超时 → 多半第一道挡了 |
| `curl http://127.0.0.1:8080`（在服务器跑） | 本机 | 看到内容 → 应用在跑；refused → 应用没起或端口不对 |
| `sudo ss -tlnp \| grep 8080` | 端口 | 看到 `0.0.0.0:8080` → 应用在听；只 `127.0.0.1` → 改配置 |

---

## 六、DNS：域名解析有问题

`ping www.baidu.com` 报 `Name or service not known`，**但 IP 能 ping 通**？那是 **DNS 挂了**。

```bash
# 看当前 DNS
cat /etc/resolv.conf
# 看到 nameserver 8.8.8.8 / 1.1.1.1 这种就是 OK 的

# 临时用别的 DNS 测一下
nslookup www.baidu.com 8.8.8.8
# 或
dig www.baidu.com @8.8.8.8

# 测 DNS 是否通畅
ping 8.8.8.8            # 先看能不能连 DNS 服务器
nslookup baidu.com      # 再看解析
```

> **常见 DNS 服务器**：`8.8.8.8`（Google）、`1.1.1.1`（Cloudflare）、`223.5.5.5`（阿里，国内快）

---

## 走完这页你能做到…… ✅

- [ ] 用 `curl` / `wget` 测服务在不在跑
- [ ] 用 `ss -tlnp` 看服务器开了哪些门、绑在哪个 IP
- [ ] 知道云服务商**安全组** vs 服务器内 `ufw` / `firewalld` 是两层门
- [ ] 知道「连不上」时**从外往里**一层层排查
- [ ] 知道 `0.0.0.0` vs `127.0.0.1` 监听地址的差别
- [ ] DNS 出问题知道查 `/etc/resolv.conf` 换 DNS

下一步 → 排错思路串起来：[出问题了？先看一眼这几处](/noobook/advance/linux/debug)
