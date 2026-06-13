# 出问题了？先看一眼这几处

小猪装完 bot 跑了几天，**某天突然死了 / 报错 / 连不上 / 卡死** —— 别慌，这一页就是「**出问题时第一反应**」的 cheat sheet。

> **核心思想**：Linux 排错就 4 步 —— **看服务状态 → 看日志 → 看资源 → 看配置**。90% 的问题在这 4 步里就解决了。

---

## 一、四件套排查法（萌新救命口诀）

```bash
# 1️⃣ 服务状态：服务在跑吗？挂了还是停着？
sudo systemctl status pallas-bot

# 2️⃣ 最近日志：错在哪里？为啥挂？
sudo journalctl -u pallas-bot -n 100 --no-pager

# 3️⃣ 资源状况：是 OOM 了？磁盘满了？CPU 100%？
htop          # 进程和 CPU/内存
df -h         # 磁盘
free -h       # 内存

# 4️⃣ 配置和端口：配置改了吗？端口被占了吗？
sudo ss -tlnp | grep 8080
cat /opt/Pallas-Bot/config/pallas.toml
```

> 上面这套顺序**几乎能解决所有「昨晚还好好的，今天突然挂了」**的问题。  
> 跑完一圈还没头绪，再考虑去看 [网络和防火墙](/noobook/advance/linux/network)。

---

## 二、按症状对号入座

| 症状 | 第一反应 | 命令 |
| :--- | :--- | :--- |
| 服务**起不来** | 看 status 的「Active: failed」下面几行 | `systemctl status xxx` |
| 服务**启动后又挂** | 看日志最后报错 | `journalctl -u xxx -n 50` |
| 启动**巨慢** | 可能是 DNS / 网络回环问题 | `systemd-analyze blame` 看卡哪步 |
| **连不上 WebUI** | 三层门：安全组 / 内防火墙 / 应用监听 | 看 [5. 网络和防火墙](/noobook/advance/linux/network) |
| 跑几天后**越来越卡** | 资源 | `htop` + `df -h` + `free -h` |
| 突然**端口被占** | 谁占了？ | `sudo ss -tlnp \| grep 端口` |
| **磁盘告警** | 谁占空间？ | `sudo du -h /var/log \| sort -hr \| head` |
| **SSH 突然连不上** | 是不是改了 sshd_config + 没重启？或者密码改错了 | 云控制台 VNC 登录救场 |

### 「端口被占」详细排查

```bash
# 看谁占了 8080
sudo ss -tlnp | grep 8080
# 输出：LISTEN 0 128 0.0.0.0:8080 0.0.0.0:* users:(("python3",pid=1234,fd=3))
#                                       ^^^^^^^^^^     ^^^^^^^^^^^^^^^^
#                                       进程名         PID

# 看进程详情
ps -p 1234 -o pid,user,cmd

# 杀掉它（看清楚再杀！）
sudo kill 1234        # 温柔：发 SIGTERM，让它自己收尸
sudo kill -9 1234     # 强硬：SIGKILL，进程没机会善后（数据库类慎用）
```

### 「磁盘告警」详细排查

```bash
# 1. 看哪块盘满了
df -h

# 2. 看哪个目录占空间
sudo du -h --max-depth=1 /opt/ | sort -hr | head -10

# 3. 看最大的 10 个文件
sudo find / -type f -size +100M -exec ls -lh {} \; 2>/dev/null | sort -k5 -hr | head

# 4. 90% 是日志炸了，临时清一下
sudo journalctl --vacuum-size=100M     # systemd 日志只留 100MB
sudo find /var/log -name "*.gz" -delete # 删旧的压缩日志
```

---

## 三、bot 特有的常见问题

### 「bot 收不到消息」

按这个顺序查：

1. **协议端在跑吗？**（Pallas-Bot 通常接 [napcat](https://napneko.github.io/) / [go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 等）
   ```bash
   sudo systemctl status napcat   # 协议端服务名按你装的版本
   ```
2. **Pallas-Bot 自己呢？**
   ```bash
   sudo systemctl status pallas-bot
   sudo journalctl -u pallas-bot -n 50
   ```
3. **配置里 QQ 账号对吗？** — `pallas.toml` 里 `bot.account` / `bot.password`（或协议端配置）
4. **协议端和 Pallas-Bot 在同一个网络？**（本地都是 `127.0.0.1` 或内网）
5. **QQ 风控/冻结** — 登录日志里有「code: 45/237/45xx」之类

### 「WebUI 打开是空白 / 502」

1. **WebUI 进程在跑吗？**（`ss -tlnp | grep 端口`）
2. **服务起来了但 WebUI 报 502** — 反向代理（Nginx / Caddy）的 `proxy_pass` 配错 → 看 [5. 网络和防火墙](/noobook/advance/linux/network#第-1-道门云服务商-安全组)
3. **配置里 WebUI 是否启用** — `pallas.toml` 里 `[webui]` 段、`enabled = true`

### 「日志疯狂刷屏 / 磁盘狂涨」

```bash
# 1. 看哪个服务在疯狂写日志
sudo du -h /var/log | sort -hr | head

# 2. 给 systemd 日志加大小限制（推荐）
sudo journalctl --vacuum-size=500M    # 立即清到 500MB
# 永久限制：编辑 /etc/systemd/journald.conf 加 SystemMaxUse=500M，然后 sudo systemctl restart systemd-journald

# 3. 给单个服务单独限流（在 .service 文件里加）
# StandardOutput=null
# StandardError=null
#（但这样你就看不到日志了，建议用 logrotate）
```

---

## 四、「求助前」自检清单

群里发「bot 坏了」基本没人理你 —— 别人想帮也帮不了。**发问前先做这些**，效率 ×10：

<NCard title="提问模板（复制粘贴就能用）">
  **📋 问题**：
  bot 启动后 1 分钟就崩了，重启也是一样

  **🖥️ 环境**：
  - 系统：Ubuntu 22.04
  - 部署方式：systemd 守护
  - bot 版本：v1.2.3（git log -1 --pretty=%H 也行）
  - Python 版本：3.10.6

  **📜 关键日志**（`journalctl -u pallas-bot -n 50` 输出）：
  ```
  6月 08 10:00:00 myhost python[12345]: [ERROR] connection refused to napcat
  6月 08 10:00:01 myhost python[12345]: [FATAL] retry exhausted, exiting
  ```

  **🔍 已试过**：
  - `systemctl status` → 看到 active (running) → active (failed) 自动跳
  - `df -h` / `free -h` → 资源充足
  - 手动跑能起来 → 但 systemd 启动就挂
</NCard>

> **萌新必知**：群里大佬**不看「错误」就看「日志和配置」**。**没有日志 = 没人能帮**。  
> 宁可先 `journalctl` 截 50 行贴出来，比写一万字描述管用。

---

## 五、救命三连（别慌着跑路）

**操作前**：先**拍快照**（云控制台都有）！Linux 没有回收站，先备份再动刀。

**操作中**：不懂的命令**先 `man` 或搜一下**再跑，别一激动就 `rm -rf /`。

**操作后**：弄坏了别急着重装，**重启大法** + **`Ctrl + Z`** 撤回（如果是前台进程）。

```bash
# 撤回上一条命令的影响（Ctrl + Z 把前台进程挂起）
# 然后
fg     # 把它拉回前台继续跑
# 或者
kill %1   # 杀掉挂起的任务
```

---

## 走完这页你能做到…… ✅

- [ ] 「四件套排查法」背下来了（status / journal / 资源 / 配置）
- [ ] 知道「端口被占」「磁盘告警」「连不上」各自的第一反应
- [ ] 群内提问能**贴日志 + 贴环境 + 贴已尝试**，不再发「bot 坏了」
- [ ] 改东西前知道**先备份 / 拍快照**

---

🎉 **Linux 速成 6 篇打卡完成！** 你已经能独立在 Linux 服务器上把牛牛拉起来、稳住、排错了！
