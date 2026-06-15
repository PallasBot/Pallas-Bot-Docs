# 让 bot 一直活着

软件装好了，问题是 —— **你关掉 SSH，bot 就跟着死了**。

为啥？因为你 SSH 进来是开了个**登录 shell**，shell 里跑的所有进程都跟它「绑定」。shell 一关，进程跟着收尸。

要让 bot **退出 SSH 还在跑**，有两条路：

| 方案 | 原理 | 推荐度 |
| :--- | :--- | :--- |
| **`screen` / `tmux`** | 开个「虚拟终端」藏在后台，shell 关了它也不死 | ⭐⭐⭐ 临时用、调试时 |
| **systemd 守护** | 把 bot 注册成系统服务，开机自起 + 崩了自动重启 | ⭐⭐⭐⭐⭐ **生产首选** |

这一页主要讲 **systemd**，顺带讲怎么**查服务器资源**（`htop` / `df` / `free`）。`screen` / `tmux` 的细节看 [4. 常用小工具](/noobook/advance/linux/tools#screentmux-关-ssh-也不掉)。

> **Pallas-Bot 的具体 systemd 配置文件怎么写**？不在本页重复（避免内容打架），跳到 → [deploy/deployment.md#使用-systemd-守护-linux](/deploy/deployment#使用-systemd-守护-linux)  
> 本页只讲**「是什么、怎么用、怎么查」**。

---

## 一、systemd 是啥？为啥它管一切？

把 systemd 想象成 **Linux 的「物业管家」**：

- 开机时它**第一个起来**，把系统服务一个个按顺序叫醒
- 你**注册过的服务**（比如 nginx、mysql、你的 bot），它会**开机自动启动**
- 某个服务**意外死了**，它**自动拉起来**（崩溃自愈）
- **统一日志**：所有服务的输出都进 `journald`，一条命令查到底

> **小猪要懂**：现代主流 Linux 发行版（Ubuntu 16+、CentOS 7+、Debian 8+、Arch 全系）**都默认用 systemd**。所以学会这一套基本通吃。

---

## 二、`systemctl` 四件套

**所有操作前面加 `sudo`**（非 root 用户）。

| 你想干嘛 | 命令 | 记忆 |
| :--- | :--- | :--- |
| **启动**服务 | `sudo systemctl start pallas-bot` | start 启动 |
| **停止**服务 | `sudo systemctl stop pallas-bot` | stop 停 |
| **重启**服务 | `sudo systemctl restart pallas-bot` | restart 重启 |
| **重新加载配置**（不中断） | `sudo systemctl reload pallas-bot` | reload 重读 |
| **看状态** | `sudo systemctl status pallas-bot` | status 状态 |
| **开机自启** | `sudo systemctl enable pallas-bot` | enable 启用 |
| **取消自启** | `sudo systemctl disable pallas-bot` | disable 关 |
| **看是否自启** | `sudo systemctl is-enabled pallas-bot` | 输出 enabled / disabled |
| **看所有运行中的服务** | `sudo systemctl list-units --type=service --state=running` | 列表 |

### 经典组合拳：装好 bot 服务后必做

```bash
# 1. 启动一次（先看能不能跑起来）
sudo systemctl start pallas-bot

# 2. 看一眼状态（确认 active running）
sudo systemctl status pallas-bot

# 3. 注册开机自启
sudo systemctl enable pallas-bot

# 4. 以后改了配置要重载（不中断运行）
sudo systemctl reload pallas-bot
# 或者保险点直接 restart（会短暂中断）
sudo systemctl restart pallas-bot
```

### `status` 输出长啥样？

```
● pallas-bot.service - Pallas Bot (QQ chatbot)
     Loaded: loaded (/etc/systemd/system/pallas-bot.service; enabled)
     Active: active (running) since Mon 2026-06-08 09:30:00 CST; 2h ago
   Main PID: 12345 (python)
      Tasks: 8 (limit: 4663)
     Memory: 156.0M
        CPU: 12.345s
     CGroup: /system.slice/pallas-bot.service
             └─12345 /usr/bin/python3 /opt/Pallas-Bot/bot.py

6月 08 09:30:00 myhost systemd[1]: Started Pallas Bot (QQ chatbot).
6月 08 09:35:00 myhost python[12345]: [INFO] connected to napcat
```

关键看两行：
- **`Active: active (running)`** ← 正在跑 ✅
- **`Active: failed`** ← 挂了 ❌（往下翻日志找原因）

---

## 三、`journalctl`：服务日志的「时光机」

服务跑起来后报错咋办？不能像 Windows 那样去 `事件查看器` 翻，systemd 的日志在 `journald` 里，**一条命令看完**：

```bash
# 看 pallas-bot 全部日志
sudo journalctl -u pallas-bot

# 看最后 100 行（最常用！）
sudo journalctl -u pallas-bot -n 100

# 实时跟踪新日志（类似 tail -f）
sudo journalctl -u pallas-bot -f

# 只看今天的
sudo journalctl -u pallas-bot --since today

# 看某段时间的（排查崩溃时间点超好用）
sudo journalctl -u pallas-bot --since "2026-06-08 09:00" --until "2026-06-08 10:00"

# 只看错误级别（WARNING/ERROR）
sudo journalctl -u pallas-bot -p err

# 看启动失败原因
sudo journalctl -xe -u pallas-bot
```

| 标志 | 意思 | 记忆 |
| :--- | :--- | :--- |
| `-u xxx` | 指定服务名（unit） | **u**nit |
| `-n 100` | 末尾 100 行 | **n**umber |
| `-f` | 实时跟踪 | **f**ollow |
| `-p err` | 过滤优先级 | **p**riority |
| `-x` | 显示解释（增强信息） | e**x**tra |
| `--since` / `--until` | 时间范围 | |

> **小猪的肌肉记忆**：服务挂了第一件事 → `sudo journalctl -u 服务名 -n 100 --no-pager`

---

## 四、查服务器资源：四件套

bot 跑着跑着变卡、变慢、挂了？先看看资源是不是到瓶颈了。

### 1. `htop` 看 CPU 和内存（top 的升级版）

```bash
sudo apt install htop -y    # 没装的话先装
htop
```

- **顶部柱状图**：每个核心的 CPU 占用（多核就多列）
- **内存条**：绿色=已用，蓝色=缓冲，黄色=缓存
- **进程列表**：按 CPU/内存排序，谁是「吃资源大户」一目了然
- 快捷键：`F6` 按某列排序，`F9` 杀进程，`F10` 退出

> 不想装图形？用 `top` 也行（丑一点，所有 Linux 都有）。

### 2. `df -h` 看磁盘还剩多少

```bash
df -h
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/vda1        50G   12G   36G  25% /
# /dev/vdb1       200G  180G   20G  90% /data   ← 红色警报！快满了
```

> **「Avail」快到 0** = **bot 要崩了**（写不了日志、存不了新消息、可能起不来）！  
> 萌新最常见翻车：**日志文件把磁盘塞满**（`/var/log/` 几十 GB），定期清理或加 logrotate。

### 3. `free -h` 看内存

```bash
free -h
#               total    used    free   shared  buff/cache  available
# Mem:          3.8Gi   1.2Gi   500Mi    12Mi      2.1Gi      2.3Gi
# Swap:         2.0Gi   100Mi   1.9Gi
```

- 看 **`available`** 别看 `free`！`free` 很小不代表紧张（Linux 会拿空闲内存当缓存，`available` 才是真·能用的）
- **`available` 接近 0** = **OOM 风险**（系统会开始杀进程，你的 bot 可能就是被杀的）

### 4. `du -sh` 看「这个目录多大」

```bash
# 看当前目录多大
du -sh .

# 看某个目录里前 10 大的子目录
du -h /var/log/ | sort -hr | head -10
# 揪出占空间的元凶！

# 限制只看一层深度
du -h --max-depth=1 /opt/
```

> 这一招**专治「我啥也没干怎么磁盘满了」**——99% 是日志或上传文件堆的。

---

## 五、`systemctl` 还能干这些杂活

| 场景 | 命令 |
| :--- | :--- |
| 列出**所有**服务（含未启动的） | `systemctl list-unit-files --type=service` |
| 看服务**配置文件**在哪 | `systemctl show pallas-bot -p FragmentPath` |
| 服务挂了自动重启（**这才是真·守护**） | 服务文件里加 `Restart=on-failure`（详见 deployment.md） |
| **重新加载** systemd 自身配置（改了 .service 文件后） | `sudo systemctl daemon-reload` |

::: warning ⚠️ 改了 `.service` 文件忘了 `daemon-reload`？
systemd 不会自动发现新文件，**不 reload 的话 enable / start 都用的是旧配置**。  
**经典流程**：改完 `.service` → `sudo systemctl daemon-reload` → `sudo systemctl restart xxx`
:::

---

## 走完这页你能做到…… ✅

- [ ] 知道 systemd 是「系统服务管家」
- [ ] `systemctl start / stop / restart / status / enable / disable` 六件套玩得溜
- [ ] 挂了就 `journalctl -u 服务名 -n 100` 翻日志
- [ ] 用 `htop` / `df -h` / `free -h` / `du -sh` 四件套快速判断资源状况
- [ ] 改了 `.service` 文件知道要 `daemon-reload`

下一步 → 服务跑稳了，平时还要**看点文件、查点东西**：[常用小工具速查](/noobook/advance/linux/tools)
