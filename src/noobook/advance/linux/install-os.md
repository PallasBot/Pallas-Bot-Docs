# 在物理机上装 Linux

这一页**亲手带你装一台 Linux 猪机**。  
**走物理机为蓝本是写得最完整的**——写 U 盘、改 [BIOS](https://en.wikipedia.org/wiki/BIOS)、装系统向导、分区……**云服务器 / 虚拟机 只是把「写 U 盘 + 改 BIOS」这两步让厂商/软件帮你跳过了**。所以看完这一篇，三种部署方式都搞定了。

> **你的进度**：[选择你的系统和部署方式](/noobook/advance/linux/install) → **你在这里** → [连上你的 Linux 猪机](/noobook/advance/linux/ssh)

---

## 🗺 总流程图

```
┌─────────────────────────────────────────┐
│  1. 准备阶段：下 ISO + 写 U 盘           │  ← 云/虚：跳过
├─────────────────────────────────────────┤
│  2. 引导阶段：改 BIOS + 从 U 盘启动      │  ← 云/虚：跳过
├─────────────────────────────────────────┤
│  3. 装系统向导：分区 + 装基础包          │  ← 三种都走
├─────────────────────────────────────────┤
│  4. 装完第一件事：更新 + 建用户 + 配 SSH  │  ← 三种都走
└─────────────────────────────────────────┘
```

> ☁️ **云服务器用户**：跳过「准备 + 引导」两节（厂商帮你做完了），从「三、装系统向导」开始看；云控制台选系统镜像那步见 [选择你的系统和部署方式#选好了-点这个去装系统](/noobook/advance/linux/install#三选好了-点这个去装系统)。
> 
> 💻 **虚拟机用户**：跳过「改 BIOS」，看「准备」+「创建虚拟机」+「装系统向导」。

---

## 一、准备阶段（云/虚：跳过）

### 1. 下系统镜像（ISO）

去 [Ubuntu 官网](https://ubuntu.com/download/server) 下 **Ubuntu Server 最新 LTS ISO**，或者去 [Debian 官网](https://www.debian.org/distrib/) 下 **Debian stable netinst ISO**（netinst = 网络安装包，最小体积、装的时候再下其他软件包）。

> ⚠️ **一定下 Server 版**！Server 没图形界面、占资源少；**别下错 Desktop**（带 GUI），对 bot 没用。

### 2. 写 U 盘

ISO 是个**镜像文件**，不是直接拷到 U 盘就行的（直接拷电脑会以为是损坏的 DVD）。要用「**写盘工具**」把 ISO 烧到 U 盘：

| 工具 | 平台 | 免费 |
| :--- | :--- | :--- |
| **[Rufus](https://rufus.ie/)** | Windows | ✅ 萌新首选 |
| **[balenaEtcher](https://etcher.balena.io/)** | Win / Mac / Linux | ✅ 跨平台、UI 最简 |
| **dd 命令** | Linux / Mac | ✅ 终端大佬用 |
| **UltraISO / 软碟通** | Windows | ❌ 收费（没必要花钱） |

**Rufus 操作步骤**（最常见）：

1. 插一个**至少 4GB**的 U 盘（**里面的数据会被清空**！先备份）
2. 打开 Rufus → 设备选你的 U 盘
3. 引导选择 → 点「SELECT」选刚下的 ISO
4. 其他默认 → 点「开始」
5. 等进度条跑完 → U 盘就变成「启动盘」了

---

## 二、引导阶段（云/虚：跳过）

### 1. 改 BIOS 启动顺序

1. 把 U 盘**插到物理机上**（**别插到 USB Hub 上**，直接插主板）
2. 开机，**狂按 BIOS 键**进入 BIOS 设置（不同主板不一样）：
   - 戴尔台式 / 笔记本：**F2**
   - 联想：**F1 / F2**
   - 华硕：**F2 / Del**
   - 惠普：**F10**
   - 微星：**Del**
   - 实在不知道就「开机狂按 F2/F12/Del/Esc」挨个试
3. 找到 **「Boot」/「启动」** 那一项
4. 把 **USB / Removable Device** 调到**第一启动**
5. 保存退出（一般是 F10）

> 💡 **UEFI 新主板可能要先关 Secure Boot**：在「Security / 安全」里找 Secure Boot 改成 Disabled。Debian/Ubuntu 都能正常从 U 盘启动，但 Secure Boot 开着偶尔会出问题。

### 2. 从 U 盘启动

保存 BIOS 后电脑会重启，**如果一切顺利会从 U 盘启动**——你看到类似：

```
GNU GRUB version 2.06
Try or Install Ubuntu Server
```

光标默认在第一项，**直接回车**就开始装系统向导了。

> ❌ **如果重启后又进了 Windows/旧系统**——说明 BIOS 没改对，**回到第 1 步重来**。

---

## 三、装系统向导（三种都走）

这一步对**所有部署方式都一样**。  
装系统时**最常踩的坑**也在这里，提前标好：

### 安装步骤对照表

| 步骤 | 萌新选择 | 注意事项 |
| :--- | :--- | :--- |
| **语言** | English 或 中文 | 随你喜欢 |
| **键盘** | 美式 / 汉语 | **别选错**！选错后面所有键位都乱 |
| **网络** | 默认 DHCP | 自动拿 IP；插网线（比 WiFi 稳） |
| **主机名** | 给你的猪机起个名 | 例：`pallas-bot-server` |
| **用户 / 密码** | 建第一个**非 root** 用户 | ⚠️ **记住这个用户名和密码**！装完登录用 |
| **分区** | **Use entire disk**（用整块盘） | 萌新无脑选；自动分好不用纠结 |
| **软件选择** | **只勾「SSH server」** | ⚠️ **这个必勾！** 不勾就没法远程连 |
| **GRUB 引导** | 装到主硬盘（默认就是） | 物理机这步很关键，**别装到 U 盘上** |

> 💡 **💻 虚拟机用户**：装系统时可能默认没有「SSH server」选项，或者装完发现 `sshd` 没启动：
> ```bash
> sudo apt install openssh-server -y
> sudo systemctl enable --now sshd
> ```

### ⚠️ 萌新最高频翻车

::: danger ❌ 装的时候忘了勾「SSH server」→ 装完发现 SSH 连不上 → 又要重装
**装到「软件选择」那步时一定一定一定勾上 SSH server**！  
这一步是装系统时**唯一**会被萌新漏掉的、事后不能简单补救的设置。
:::

---

## 四、装完系统后的「第一件事清单」

不管你用云 / 虚 / 物哪种方式，**拿到一个能登录的 Linux 机器后**，**立刻**做这几件事：

### 1. 登录 & 更新系统

```bash
# 登录（云服务器/物理机/虚拟机都通用）
ssh 你的用户名@你的IP

# 更新包索引 + 升级所有包（最最最重要！）
sudo apt update && sudo apt upgrade -y
# 这一步要花几分钟，取决于网速
```

### 2. 建一个专门跑 bot 的普通用户（**别用 root 跑 bot**）

```bash
# 建用户（跟着提示设密码、填信息，信息都可以空着回车）
sudo adduser pallas

# 把这个用户加进 sudo 组（让它能借 root 权限）
sudo usermod -aG sudo pallas

# 切换过去试试
su - pallas
whoami    # 应该输出 pallas
```

### 3. 给这个用户配 SSH 密钥（强烈建议）

免去每次输密码的烦恼，且安全性提升 10 倍。详见 [连上你的 Linux 猪机#二密钥登录](/noobook/advance/linux/ssh#二密钥登录推荐一个文件当-电子钥匙)。

### 4. （云服务器）禁用 root SSH 密码登录

配好密钥后，把 `/etc/ssh/sshd_config` 里的：

```bash
PermitRootLogin yes           # 改成 no
PasswordAuthentication yes    # 改成 no
```

```bash
sudo systemctl restart sshd
```

> 这样黑客就算知道 root 密码也进不来 —— 走密钥才让进，私钥在你本地电脑。

### 5. 设置时区（云服务器常是 UTC）

```bash
sudo timedatectl set-timezone Asia/Shanghai
date    # 看下时间对不对
```

### 6. 设个主机名（看着舒服点）

```bash
sudo hostnamectl set-hostname pallas-bot-server
# 退出重进终端就生效
```

### 7. 🖥️ 物理机专属：想办法拿到 IP

```bash
ip addr    # 看 inet 192.168.x.x 之类的内网 IP
```

- 插网线（推荐，比 WiFi 稳）
- 从你主电脑 `ssh 你的用户名@192.168.x.x` 试一下
- ⚠️ 物理机**远程外网访问**得做**内网穿透**（frp / tailscale / zerotier）—— 这**远超萌新范围**，建议先上云

---

## 走完这页你能做到…… ✅

- [ ] 系统**装好了**，`apt update && apt upgrade` 跑过一遍
- [ ] 建了**非 root 用户**（pallas 之类），并加进 sudo 组
- [ ] 给新用户配了 **SSH 密钥登录**
- [ ] 知道云/虚/物三者在装系统时的**区别在哪里**（写 U 盘 + 改 BIOS 被跳过）

下一步 → 装好了、用户也建好了，**该连上去了**：[连上你的 Linux 猪机](/noobook/advance/linux/ssh)
