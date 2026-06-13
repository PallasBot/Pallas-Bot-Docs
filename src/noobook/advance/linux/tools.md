# 常用小工具速查

bot 跑稳后，平时到底用啥命令查东西？**这一页就是「口袋工具箱」，收藏起来随用随翻**。

> 前面的 [「你需要知道的」里的 shell 操作界面](/noobook/noob/u2know#shell-操作界面-cmd) 讲了 `ls` / `cd` / `mkdir` / `rm` 这些「基础生存」命令，本页**只讲平时真正会反复用的那些进阶工具**。

---

## 一、看文件：什么时候用哪个？

| 命令 | 用途 | 典型场景 |
| :--- | :--- | :--- |
| `cat 文件` | 整篇一次性倒出来 | 配置文件只有几十行，快速看一遍 |
| `less 文件` | **分页看**，可上下翻、可搜索 | 日志几百 MB、配置很长 |
| `head -n 20 文件` | 看前 20 行 | 看看文件头是不是你想找的 |
| `tail -n 50 文件` | 看末尾 50 行 | 看最新日志 |
| `tail -f 文件` | 实时跟踪追加 | **边跑边看日志的瑞士军刀** |
| `wc -l 文件` | 数行数 | 「这个日志有多少行？」 |

### `less` 的几个超实用快捷键

```bash
less /var/log/syslog
# /keyword     向下搜
# ?keyword     向上搜
# n / N        跳到下一个/上一个匹配
# g / G        跳到首/尾
# q            退出
```

### `tail -f` 实时跟踪日志

```bash
# 最常用的「边跑边看」组合
tail -f /var/log/pallas/bot.log

# 想同时看多个文件
tail -f log/*.log
# Ctrl + C 退出
```

---

## 二、`grep`：从文件里挖关键字

> **萌新金句**：**「日志几百 MB，谁有空一页页翻？`grep` 一把梭！」**

```bash
# 找文件里所有含 "error" 的行
grep "error" bot.log

# 不区分大小写
grep -i "error" bot.log

# 反向：找**不含** error 的行（看「正常」的情况）
grep -v "error" bot.log

# 显示行号（出问题时贴日志超有用！别人能直接指「第 123 行有问题」）
grep -n "error" bot.log

# 递归搜整个目录
grep -rn "your_api_key" /opt/Pallas-Bot/

# 数有多少个匹配
grep -c "login failed" /var/log/auth.log
```

### 经典组合：管道

```bash
# 在 `tail` 的输出里 `grep`（看最近 1000 行日志里的 error）
tail -n 1000 bot.log | grep "error"

# 数 error 出现次数
grep -c "error" bot.log

# 找 error 前后 5 行的「上下文」（-B before, -A after）
grep -B 5 -A 5 "FATAL" bot.log
```

> **小窍门**：**找不到关键字的时候，加 `-i`（不区分大小写）和 `-n`（带行号）**——能解决 80% 的「明明有就是搜不到」。

---

## 三、`find`：找文件本身

`ls` 看当前目录有什么，但**「找某个文件在哪」**得用 `find`：

```bash
# 在 /opt 里找所有叫 pallas.example.toml 的文件
find /opt -name "pallas.example.toml"

# 在当前目录找所有 .log 后缀的文件
find . -name "*.log"

# 按大小找：找大于 100MB 的文件（揪出占空间的元凶）
find / -size +100M

# 按修改时间找：最近 7 天改过的 .conf 文件
find /etc -name "*.conf" -mtime -7

# 找到后顺手删（**看清楚再执行！**）
find . -name "*.tmp" -delete
```

| 选项 | 意思 |
| :--- | :--- |
| `-name "xxx"` | 按文件名（**大小写敏感**，Linux 的强迫症） |
| `-iname "xxx"` | 不区分大小写 |
| `-type f` | 只要文件，不要目录 |
| `-type d` | 只要目录 |
| `-size +100M` | 大于 100 MB |
| `-mtime -7` | 7 天内修改过 |
| `-exec 命令 {} \;` | 找到后**执行**命令（高级用法） |

---

## 四、管道 `|` 和重定向 `>` `>>`

### 管道 `|`：把左边的输出「喂」给右边

```bash
# 命令1 | 命令2
# 含义：命令1 的输出变成命令2 的输入

# 经典：找进程里带 pallas 的
ps aux | grep pallas

# 经典：列目录并按大小排序
ls -lh | sort -k5 -h

# 经典：数日志行数
cat bot.log | wc -l
```

### 重定向 `>` `>>`：把输出存到文件

```bash
# >  覆盖写入（危险！会把文件清空）
echo "hello" > test.txt
# 文件里现在只有 "hello"

# >> 追加写入（保留原内容）
echo "world" >> test.txt
# 文件里现在有 "hello\nworld"

# 经典用法：跑命令同时存日志
./start.sh > run.log 2>&1
# 2>&1 意思是「把错误输出也存到 run.log」（不加这个错误会丢到屏幕）
```

> **小猪的肌肉记忆**：  
> 想看中间过程 → 用 `|` 串命令  
> 想留档 → 用 `>` 存到文件（**加 `2>&1` 错误一起存**）

---

## 五、编辑文件：`vim` vs `nano`

服务器上没 VSCode、没记事本，**只能命令行编辑器**。

| 特性 | `vim` | `nano` |
| :--- | :--- | :--- |
| 学习曲线 | 陡（三模式） | 平（所见即所得） |
| 功能 | 超强 | 够用 |
| 萌新推荐 | 中后期再学 | **先用这个！** |

### `nano`：5 分钟上手

```bash
nano /opt/Pallas-Bot/config/pallas.toml
```

- **直接打字**就是改文件内容
- `Ctrl + O` → 保存（确认文件名回车）
- `Ctrl + X` → 退出（提示保存选 Y）
- 屏幕底部那行 `^O Get Help` 就是快捷键提示，`^` 代表 `Ctrl`

### `vim` 三模式（萌新背这个最小子集就够用）

```bash
vim pallas.toml
```

进去默认是「**正常模式**」（啥也敲不进去东西），要做啥得先按个键：

| 模式 | 怎么进 | 能干啥 | 怎么回正常模式 |
| :--- | :--- | :--- | :--- |
| **正常模式** | 打开默认 | 移动光标、删行、复制粘贴 | （默认） |
| **插入模式** | 按 `i` | 打字改文件 | 按 `Esc` |
| **命令模式** | 按 `:` | 存盘、退出、搜索 | 跑完自动回 |

```bash
# 萌新 vim 三件套（记这个就够活）：
i           # 进插入模式 → 开始改
Esc         # 回正常模式
:wq         # 保存并退出（write + quit）
:q!         # 不保存强行退出（quit, force）
```

::: warning ⚠️ 经典翻车：「我改完文件了为啥没保存？」
`vim` 改了之后没 `:wq` → **啥也没存**！  
`Esc` → `:wq` → 回车 → **确认屏幕左下角出现 "written"** 才是真的存了。
:::

---

## 六、`screen` / `tmux`：关 SSH 也不掉

前面 [systemd.md](/noobook/advance/linux/systemd) 讲过**生产用 systemd**，但有时候你**临时跑个调试脚本**，想关掉 SSH 后脚本还活着，**`screen` / `tmux` 就派上用场了**——它们开个**虚拟终端藏在后台**。

### `screen`（更老牌，几乎所有发行版都有）

```bash
# 1. 开一个叫 "pallas-debug" 的虚拟终端
screen -S pallas-debug

# 2. 在里面跑你的脚本
./start.sh

# 3. 「挂起」（detach）：按 Ctrl + A，然后按 D
#    终端文字消失了，但里面的程序还在跑
#    你的 SSH 退了也不影响

# 4. 重新连回去看
screen -r pallas-debug

# 5. 看当前有哪些虚拟终端
screen -ls

# 6. 不想用了：进到里面后 exit
```

### `tmux`（更现代，萌新更推荐）

```bash
# 安装
sudo apt install tmux -y

# 新建会话
tmux new -s pallas-debug

# 挂起：Ctrl + B，然后按 D
# 列出会话
tmux ls
# 重新连
tmux attach -t pallas-debug
# 关掉（在里面 exit 或在外面 kill）
tmux kill-session -t pallas-debug
```

> **小猪推荐**：  
> - 临时调试 → 用 `screen`（啥系统都有，临时救场）  
> - 长期用 → 学 `tmux`（可以**开多窗格、多窗口**，效率工具）

---

## 七、其他萌新必知

| 命令 | 干嘛的 | 例 |
| :--- | :--- | :--- |
| `history` | 看你敲过的历史命令 | `history \| grep apt` |
| `!!` | 重跑**上一条**命令 | `sudo !!`（忘了加 sudo 的救星） |
| `alias` | 给长命令起外号 | `alias ll='ls -la'` |
| `date` / `uptime` | 看时间 / 开机多久了 | `uptime` 会显示「负载」 |
| `who` / `w` | 看谁在登录 | 排查「是不是别人也连着」 |
| `pwd` | 看当前路径 | [「你需要知道的」](/noobook/noob/u2know) 讲过，复习一下 |
| `man 命令` | 翻官方说明书 | `man systemctl` |

### `alias` 让常用命令变短

```bash
# 临时（关终端就失效）
alias ll='ls -la'
alias gs='git status'
alias sshp='ssh pallas'   # 前面 ssh.md 配的小名

# 永久：写进 ~/.bashrc 末尾
echo "alias ll='ls -la'" >> ~/.bashrc
source ~/.bashrc          # 立刻生效
```

---

## 走完这页你能做到…… ✅

- [ ] 选对工具看文件：`cat` 短的 / `less` 长的 / `tail -f` 跟实时
- [ ] `grep -n "关键字" 文件` 在日志里挖宝
- [ ] `find 路径 -name "xxx"` 找文件
- [ ] 用 `|` 串命令，用 `>` 存日志
- [ ] 用 `nano` 或 `vim` 三件套改配置文件
- [ ] 用 `screen` 或 `tmux` 让程序关 SSH 也不死

下一步 → 工具都熟了吗？开始看**「为啥我访问不到 WebUI」**的最后一关：[网络和防火墙：连不上 WebUI？八成是门被锁了](/noobook/advance/linux/network)
