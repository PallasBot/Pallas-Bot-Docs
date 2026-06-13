# 连上你的 Linux 猪机

系统装好、用户建好后，**第一件事**就是远程连上去。  
**SSH** 就是远程连 Linux 猪机的标准工具。这页教你怎么用它。  
在 [「你需要知道的」](/noobook/noob/u2know) 那一节已经讲过：IP 是猪机的「门牌号」、端口是「食槽号」——现在用 SSH 去「敲门」。

> **小猪必背**：连 Linux 服务器基本 99% 用的都是 **SSH**（**S**ecure **Sh**ell 的缩写），它是个加密的「远程 shell」。Linux 装机默认就开着 22 号端口。**Windows 萌新**：Windows 10/11 自带 OpenSSH 客户端（设置 → 应用 → 可选功能里搜「OpenSSH 客户端」装上），能直接用 `ssh` 命令，不用折腾别的。

---

## 一、密码登录（最简单但最危险）

最朴素的方式：服务器给你一个「用户名 + 密码」，你敲进去就进。

```bash
# 基础款：用户名@IP 地址
ssh root@192.168.1.100

# 第一次连会问「Are you sure you want to continue connecting?」
# 它在问：你信不信这台机器的指纹（fingerprint）？
# 萌新直接打 yes 就好（生产环境请先核对指纹再确认）
```

⚠️ **密码登录两个大坑**：

1. **容易被暴力破解** —— 互联网上有无数机器人 24 小时扫你的 22 端口尝试 `root:123456`，一旦猜中，**全盘裸奔**。
2. **每次输入很烦** —— 密码复杂一点就得复制粘贴，自动化部署脚本根本没法用。

所以 —— **生产环境强烈推荐走「密钥登录」**。下面教你怎么配。

---

## 二、密钥登录（推荐！一个文件当「电子钥匙」）

原理：你在自己电脑上**生成一对钥匙**（一把锁在本地叫 `id_rsa`，一把挂到服务器叫 `authorized_keys`），以后登录时电脑用私钥「签字」，服务器用公钥「验签」，**不用输密码**。

### 第 1 步：本地生成密钥对

```bash
# 在你本地电脑（不是服务器！）执行
ssh-keygen -t ed25519 -C "my-pallas-bot@home"
```

执行后会问你：

- `Enter file in which to save the key` → **直接回车**用默认路径 `~/.ssh/id_ed25519`
- `Enter passphrase` → **强烈建议设一个**！相当于给钥匙再加一把锁；不设就空回车（**裸奔警告**）
- 再输一次 passphrase 确认

成功后你会看到类似：

```
Your identification has been saved in /home/你的用户名/.ssh/id_ed25519
Your public key has been saved in /home/你的用户名/.ssh/id_ed25519.pub
```

> **小猪要懂**：`.pub` 后缀的是**公钥**（发给别人的，可以放网上），没后缀的是**私钥**（自己藏着，泄露就完蛋）。

### 第 2 步：把公钥「塞」到服务器

**方法 A：用 `ssh-copy-id`（最省事）**

```bash
# 第一次还是要输密码，最后一次！
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@192.168.1.100
```

**方法 B：手动粘贴（如果上面失败）**

```bash
# 1. 本地查看公钥内容（一整行乱码）
cat ~/.ssh/id_ed25519.pub
# 输出类似：ssh-ed25519 AAAA... my-pallas-bot@home

# 2. 登录到服务器（密码登录那次）
ssh user@192.168.1.100

# 3. 在服务器上操作
mkdir -p ~/.ssh                              # 建 .ssh 目录
chmod 700 ~/.ssh                             # 权限必须是 700！否则 SSH 会拒绝
echo "把刚才那行公钥粘到这里" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys             # 权限也必须是 600
```

### 第 3 步：测试免密登录

```bash
ssh user@192.168.1.100
# 不再问密码 → 成功！🎉
```

> 验证成功后，**强烈建议去服务器禁用密码登录**！编辑 `/etc/ssh/sshd_config`，找到 `PasswordAuthentication yes` 改成 `no`，然后 `sudo systemctl restart sshd`。这样黑客就算知道你用户名也进不来。

---

## 三、SSH 命令速查表

| 萌新想干嘛 | 命令 | 记忆小窍门 |
| :--- | :--- | :--- |
| 连服务器 | `ssh user@host` | 最基础款 |
| 连非默认端口 | `ssh -p 2222 user@host` | **P**ort 端口 |
| 跑远程命令（不登录） | `ssh user@host "ls /tmp"` | 双引号包命令 |
| 传文件 | `scp file.txt user@host:/path/` | **S**ecure **C**o**p**y |
| 传整个目录 | `scp -r mydir/ user@host:/path/` | 加 **-r**（recursive） |
| 从服务器拉文件 | `scp user@host:/path/file.txt ./` | 把远程放前面 |
| 调试登录卡哪 | `ssh -v user@host` | **v**erbose 啰嗦模式，看到底哪步失败 |

### `scp` 示例

```bash
# 把本地的 pallas.example.toml 推到服务器
scp pallas.example.toml akny@my.server:/opt/Pallas-Bot/config/

# 把服务器的日志拉回来本地看
scp akny@my.server:/var/log/pallas/bot.log ./
```

::: warning ⚠️ scp 的「坑」们
- `scp` **没有断点续传**！传大文件（>1GB）断了就得重来 → 大文件用 `rsync -avzP`
- 路径最后那个 `/` 很重要：  
  `host:/opt` 是**目录**（往里塞）  
  `host:/opt/` 是**目录里的所有东西**（平铺过去）  
  加错 / 没加都可能覆盖文件，**先 `--dry-run` 跑一下预览**！
:::

---

## 四、给懒人：把常用连接写进 `~/.ssh/config`

每次都 `ssh user@long-hostname -p 2222` 是不是很烦？**给连接起个小名**！

编辑本地 `~/.ssh/config`（没有就 `touch` 一个，权限设 `600`）：

```ini
# 给自己常用服务器起个外号
Host pallas                                    # 以后只要 ssh pallas 就行
  HostName 192.168.1.100                       # 真实 IP / 域名
  User akny                                    # 登录用户名
  Port 22                                      # 端口（默认 22 可以省略）
  IdentityFile ~/.ssh/id_ed25519               # 用哪把钥匙

Host pallas-test
  HostName test.pallasbot.com
  User ubuntu
  Port 2222
  IdentityFile ~/.ssh/id_ed25519_test
```

保存后：

```bash
ssh pallas        # 顶替那一长串
scp file pallas:~/   # scp 也认小名！
```

---

## 五、连不上？先用这三条排查

| 现象 | 大概率原因 | 怎么查 |
| :--- | :--- | :--- |
| `Connection refused` | 服务器没开 22 端口 / ssh 服务挂了 | 去云控制台 VNC 登录，看 `systemctl status sshd` |
| `Connection timed out` | 网络不通 / 防火墙挡了 | `ping 192.168.1.100`，看云服务商**安全组**有没有放行 22 |
| `Permission denied (publickey)` | 密钥没配上 / 权限不对 | `ssh -v` 看具体卡哪步；服务端 `chmod 700 ~/.ssh` 和 `chmod 600 authorized_keys` |

> 更深度的排查套路看 [debug.md 出错了？](/noobook/advance/linux/debug)

---

## 走完这页你能做到…… ✅

- [ ] 用 `ssh user@host` 连上自己的服务器
- [ ] 给自己的连接配好密钥免密登录
- [ ] 用 `scp` 传一个文件来回
- [ ] 给自己常用的连接在 `~/.ssh/config` 起个小名

下一步 → 进了门就该搞清楚**「我是谁、凭什么能改这个文件」**：[用户和权限：凭什么我能动它？](/noobook/advance/linux/permission)
