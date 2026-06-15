# 用户和权限：凭什么我能动它？

SSH 连上猪机后，下一步要搞清楚 **「我是谁、我能干啥」**。

Linux 是个**多人多任务**的操作系统，每个文件都有「主人」和「谁能碰它」的属性。**搞错权限，要么改不动（烦），要么改错东西（炸）**。所以这一节，把它一次说清楚。

---

## 一、先认清：我是谁？我在哪个组？

```bash
whoami          # 输出当前用户名
id              # 输出 uid=1000(akny) gid=1000(akny) groups=1000(akny),27(sudo),...
groups          # 只看我在哪些组
```

> **小猪要懂**：
> - **uid**（User ID）：用户身份证号，root 永远是 `uid=0`
> - **gid**（Group ID）：组身份证号，每个用户至少在一个组里
> - 不同的组对应不同权限（比如 `sudo` 组就有「借大人权限」的资格）

---

## 二、`root` 是谁？为什么别用它跑 bot？

**`root` 是 Linux 里的「超级用户」账号**（也叫**超级管理员**、`uid=0`），权限没限制，能改任何文件、杀任何进程。听起来很爽对吧？**但**：

::: danger ❌ 为什么千万别用 root 跑牛牛？
1. **删错就完蛋** —— root 跑 `rm -rf /` 没有提示，**直接抹盘**（这不是段子，是真实事故）
2. **安全风险放大 100 倍** —— 你的 bot 一旦有漏洞被黑，黑客直接拿到 root，整个服务器沦陷
3. **端口冲突排查困难** —— 多个进程都跑在 root 下，端口被占时 `ps aux` 一片混乱
4. **没法精细化权限** —— bot 只需要写自己的配置目录，root 是「全屋通开」浪费权限
:::

**正确姿势**：

- 服务器装好后**新建一个普通用户**（`adduser pallas`）
- 给这个用户**加 sudo 权限**（需要时再用 `sudo` 借大人权限）
- **永远以这个用户登录和跑 bot**
- 平时根本不需要碰 root

---

## 三、`sudo` 和 `su`：「借权限」的两种姿势

| 命令 | 干嘛的 | 怎么用 | 密码问谁 |
| :--- | :--- | :--- | :--- |
| `sudo 命令` | **临时借** root 权限跑一条命令 | `sudo apt update` | 问**你自己的**密码 |
| `su` | **切换**到 root（一直有效） | `su -` | 问 **root 的**密码 |
| `su 用户名` | 切换到其他用户 | `su - pallas` | 问**目标用户**的密码 |

> **小猪推荐**：永远用 `sudo`，不要用 `su -` 切到 root 后挂着！  
> **为什么？** `sudo` 是「单次借」，命令跑完权限自动还回去；你挂着 root 容易忘了自己现在有多猛，手一抖就 `rm` 错东西。

### `sudo` 的小坑

```bash
# 第一次 sudo 会问密码，之后 5 分钟内不用再问（默认）
sudo systemctl restart nginx

# 不想再问密码（危险！不推荐）：用 NOPASSWD
# 编辑 /etc/sudoers：your_user ALL=(ALL) NOPASSWD:ALL

# 列出你能 sudo 的命令
sudo -l
```

---

## 四、文件权限 `rwx`：谁能看到、谁能动？

```bash
ls -l /opt/Pallas-Bot/
# 输出示例：
# drwxr-xr-x  2 pallas pallas  4096 6月  8日 09:51 config
# -rw-r--r--  1 pallas pallas  1234 6月  8日 09:51 README.md
# ^^^^^^^^^^  ^^^^^^ ^^^^^^
#   权限位     主人  主人组
```

那一长串 `drwxr-xr-x` 拆开看：

```
d  rwx  r-x  r-x
↑  ↑    ↑    ↑
│  │    │    └── 其他人（other）：可读可执行，不能写
│  │    └───── 组（group）：可读可执行
│  └────────── 主人（owner）：可读可写可执行
└───────────── 文件类型：d=目录  -=普通文件  l=软链接
```

每个 `rwx` 也对应一个**数字**（记熟了写命令超快）：

| 字符 | 数字 | 意思 |
| :--- | :--- | :--- |
| `r` | **4** | **R**ead 读（看内容） |
| `w` | **2** | **W**rite 写（改内容） |
| `x` | **1** | e**X**ecute 执行（跑起来 / 进目录） |
| `-` | **0** | 没权限 |

> **小窍门**：把三个数字**加起来**就是权限值！

---

## 五、`chmod`：改权限的两种写法

### 写法 1：数字法（推荐！快）

```bash
chmod 755 file.sh        # rwxr-xr-x  主人全权，组和其他人读+执行
chmod 644 file.txt       # rw-r--r--  主人读写，其他人只读
chmod 700 ~/.ssh         # rwx------  只有主人能动（SSH 强制要求！）
chmod 600 id_ed25519     # rw-------  私钥权限（SSH 强制要求！）
```

### 写法 2：符号法（加/减某个权限更直观）

```bash
# 给所有人加执行权限
chmod +x script.sh

# 给组加写权限
chmod g+w file.txt

# 去掉其他人的读权限
chmod o-r secret.txt

# 一次给主人 rwx，组 rx，其他人 rx
chmod u=rwx,g=rx,o=rx file.sh
```

### 常见权限组合速查

| 场景 | 数字 | 符号 | 备注 |
| :--- | :--- | :--- | :--- |
| 普通文件 | `644` | `rw-r--r--` | 配置文件默认 |
| 普通目录 | `755` | `rwxr-xr-x` | 目录默认（**`x` 才能 `cd` 进去**） |
| SSH 私钥 | `600` | `rw-------` | 错了就连不上！ |
| SSH 目录 | `700` | `rwx------` | 错了就连不上！ |
| 可执行脚本 | `755` | `rwxr-xr-x` | 加了 `x` 才能 `./run.sh` |
| 私有文件 | `600` | `rw-------` | 只有主人能看 |

::: warning ⚠️ 「777」是万恶之源
**别 `chmod 777`！** 那是「所有人都能读、写、执行」，等于把家门钥匙挂在门口。  
**永远按需给最小权限**，缺什么加什么，**别图省事一把梭**。
:::

---

## 六、`chown`：改「这是谁家的」

```bash
# 把文件主人改成 pallas
sudo chown pallas file.txt

# 同时改主人和组
sudo chown pallas:pallas file.txt

# 递归改整个目录
sudo chown -R pallas:pallas /opt/Pallas-Bot/

# 只改组
sudo chgrp pallas file.txt
```

> **什么时候用？**  
> 典型场景：你用 `sudo` 装了东西，结果文件主人是 `root`，你的普通用户改不动 → 用 `chown` 把主人改回来。

---

## 七、萌新最常踩的 3 个权限坑

### 坑 1：「Permission denied」

```
-bash: ./start.sh: Permission denied
```

→ 文件**没执行权限**：`chmod +x start.sh`

### 坑 2：SSH 突然连不上

```
Permissions 0644 for 'id_ed25519' are too open.
```

→ 私钥权限太大，SSH 觉得不安全拒绝用。改：`chmod 600 id_ed25519`

### 坑 3：明明是 root 却「Operation not permitted」

→ 文件加了**不可变位**（immutable）：

```bash
lsattr file.txt          # 看到有 i 标志
sudo chattr -i file.txt  # 取消不可变
```

---

## 走完这页你能做到…… ✅

- [ ] 知道自己现在是谁（`whoami`）
- [ ] 用 `sudo` 而不是 `su` 借权限
- [ ] 看懂 `ls -l` 那串 `rwx` 是什么意思
- [ ] 用 `chmod 755` / `chmod +x` 给文件/脚本开权限
- [ ] 用 `chown` 改文件主人（必要时）
- [ ] 坚决不用 `chmod 777` 当偷懒神器

下一步 → 权限搞懂了，咱们就要往服务器上**装东西**了：[装东西：包管理器一览](/noobook/advance/linux/package)
