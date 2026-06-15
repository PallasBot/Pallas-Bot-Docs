# 装 Python 3.12+（Windows 篇）

bot 跑在 Python 上，所以第一步就是把 Python 装明白。Windows 上装 Python**坑不在装本身**——下个安装包点几下就完事——而在「**装哪个版本、装在哪、PATH 配没配上**」这三件事。

> **你的进度**：[Windows 入口](/noobook/advance/windows/) → **你在这里** → [装 PostgreSQL](/noobook/advance/windows/postgresql)

---

## 一、先确认要装的版本

| 项目 | 要求 |
| :--- | :--- |
| **Python 主版本** | **3.12 或更高**（3.12 / 3.13 都行；3.11 及以下别用） |
| **架构** | **64-bit**（Windows installer (64-bit)） |
| **来源** | **只从 [python.org](https://www.python.org/downloads/windows/) 官网下** |

::: warning ⚠️ 千万别装 Microsoft Store 版的 Python！
微软商店里有个一键装的「Python 3.x」——**别用**。它跑在沙箱里，写文件、装 C 扩展（比如后面会遇到的 `jieba`）经常莫名其妙报权限错；`pip install` 的包**不一定能被** bot 找到。装了的话先去「应用与功能」卸载干净。
:::

---

## 二、下载 & 安装：三个关键勾选项

### 1. 下载

去 [python.org/downloads/windows](https://www.python.org/downloads/windows/) 找当前的「Latest Python 3.12.x」或「Latest Python 3.13.x」，下「**Windows installer (64-bit)**」那个 `.exe`。

> 💡 **下载慢？** 官网在境外，国内有时几百 K。这种情况去**搜「python {版本号} 华为云镜像」**或**镜像站列表**找国内镜像；**别**去某些「软件下载站」拿包——那种站点常被塞推广，甚至改过的安装器。

### 2. 安装：第一个画面就要做关键操作

双击 `.exe`，**第一个窗口**最重要：

```
┌──────────────────────────────────────────┐
│  Install Python 3.12.x (64-bit)          │
│                                          │
│  [  Install Now  ]                       │
│  [  Customize installation  ]            │
│                                          │
│  ☐ Use admin privileges when installing  │  ← 想给全机用户装就勾
│  ☑ Add python.exe to PATH                │  ← 【必勾!!! 必勾!!! 必勾!!!】
└──────────────────────────────────────────┘
```

::: danger ❌ 没勾「Add python.exe to PATH」会怎样？
- 终端里敲 `python` 显示「不是内部或外部命令」
- `pip install xxx` 直接没反应
- bot 的启动脚本找不到 Python 解释器
- 你以为没装上，又重新装一遍——还是不勾——死循环

**装错了别慌**：跑下面这个就能补救——
> 1. 重新跑一次安装包 → 选「**Modify**」
> 2. Next → 勾上「**Add Python to environment variables**」→ 装完拉倒
:::

### 3. 接着选「Customize installation」过一遍

虽然「Install Now」点了能用，但走一遍 Customize 心里更有数：

| 这一页 | 萌新建议 |
| :--- | :--- |
| **Optional Features** | 全勾（pip / tcl-tk / py launcher / 文档都要） |
| **Advanced Options** | 勾「Install for all users」(可选)、「**Add Python to environment variables**」(✅必勾)、「Precompile standard library」 |
| **安装路径** | 改成**短路径**：`C:\Python312`（默认那个 `AppData\Local\...` 路径长得离谱，后面排错看路径要眼花） |

> 💡 **`py launcher` 是啥？** 它是 Windows 专属的 Python 启动器，能用 `py -3.12` 指定版本跑。你猪机上以后可能同时有 3.12 和 3.13，这玩意儿很有用。

---

## 三、装完立刻验证（敲三条命令，少一条都不行）

按 `Win + R` → 输 `cmd` 回车，或者打开 **Windows Terminal / PowerShell**，挨个敲：

```powershell
# 1. Python 装对了吗？
python --version
# 期望输出：Python 3.12.x 或更高；输出 "不是内部或外部命令" 就是 PATH 没配

# 2. pip 装对了吗？
pip --version
# 期望输出：pip 2x.x.x from C:\Python312\Lib\site-packages\pip (python 3.12)

# 3. Python 究竟跑的是哪个？(防多版本打架)
where python
# 期望输出：C:\Python312\python.exe (就这一行最理想；多行 = 系统里有多个 Python)
```

::: tip ✅ 三条都正常 = 装好了
直接跳到第五节配 pip 镜像。
:::

::: warning ⚠️ `where python` 出来好几行咋办？
说明你猪机上**装了多个 Python**（也可能是 Store 版的残骸）。**靠前的那一行**优先级最高，敲 `python` 跑的就是它。如果不对：
1. 打开「编辑系统环境变量」→「环境变量」→ 看「Path」
2. 把你想优先用的那个 `python.exe` 所在目录**上移到最前面**
3. **关掉所有终端窗口重开**——环境变量改了不重开终端不生效！
:::

---

## 四、给 bot 建个虚拟环境（**强烈建议**）

> 💡 **「虚拟环境是啥 / 为啥要建 / `uv` 是更好的替代品」这些通用概念**，单独成页讲全了：[Python 包管理：venv / pip / uv 三件套](/noobook/advance/python-env)。  
> 这一节**只列 Windows 端要敲的命令**——抄完就能用。

```powershell
# 1. 进到 bot 项目目录(假设你 clone 在 D:\pallas-bot)
cd D:\pallas-bot

# 2. 建虚拟环境(会在当前目录建一个 .venv 文件夹)
python -m venv .venv

# 3. 激活(PowerShell 用这个)
.\.venv\Scripts\Activate.ps1

# 3'. 激活(cmd 用这个)
.\.venv\Scripts\activate.bat

# 4. 看到命令行最前面有 (.venv) 标志就成了
(.venv) D:\pallas-bot>

# 5. 退出虚拟环境
deactivate
```

::: danger ❌ Windows PowerShell 第一次激活报「无法加载文件…因为在此系统上禁止运行脚本」
PowerShell 默认禁止跑 `.ps1` 脚本——**这是 Windows 独有的坑**，Linux 没这事儿。

**管理员权限**打开 PowerShell 跑一次，**一劳永逸**：
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
然后回到普通 PowerShell 重新激活就行。
:::

> 🙊 **更推荐的玩法**：装 `uv` 后用 `uv venv` 建环境、`uv run xxx` 跑命令,**不用手动激活**——看 [Python 包管理 → 第四节 uv](/noobook/advance/python-env)。Pallas-Bot 主仓所有命令都是 `uv` 写的。

---

## 五、给 pip 换国内源（不换可能卡半小时）

pip 默认从 PyPI（境外）下包，国内速度感人。装好 Python 第一件事就是**永久配国内源**：

```powershell
# 把 pip 默认源切到清华镜像(任选一家国内镜像都行)
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# 验证
pip config list
# 期望看到:global.index-url='https://pypi.tuna.tsinghua.edu.cn/simple'
```

常见的国内镜像（任挑一个稳的就行）：

| 镜像 | URL |
| :--- | :--- |
| 清华 | `https://pypi.tuna.tsinghua.edu.cn/simple` |
| 阿里 | `https://mirrors.aliyun.com/pypi/simple/` |
| 中科大 | `https://pypi.mirrors.ustc.edu.cn/simple/` |
| 华为云 | `https://repo.huaweicloud.com/repository/pypi/simple` |

> 💡 哪家镜像挂了/慢了直接换一家就行。**别同时配多家**——优先级会乱。

---

## 六、常见翻车现场

::: details 「python」不是内部或外部命令
**99%** 是装的时候没勾「Add Python to PATH」。补救：
- 重跑安装包 → Modify → 勾上「Add Python to environment variables」
- 或者手动改 PATH：把 `C:\Python312\` 和 `C:\Python312\Scripts\` 加进系统 PATH，**重开终端**
:::

::: details `pip install` 报「SSL: CERTIFICATE_VERIFY_FAILED」
公司网/学校网代理把 HTTPS 拦了。临时方案：
```powershell
pip install --trusted-host pypi.tuna.tsinghua.edu.cn xxx
```
长期方案：跟网管/IT 要根证书装进系统。
:::

::: details `pip install jieba` / `pip install numpy` 报「Microsoft Visual C++ 14.0 or greater is required」
专题课在等你 → [C++ 编译环境救命包](/noobook/advance/windows/buildtools)
:::

::: details 想同时装 3.12 和 3.13 来回切
用 `py launcher`：
```powershell
py -3.12 -m venv .venv     # 用 3.12 建虚拟环境
py -3.13 -m venv .venv     # 用 3.13 建
py -0                      # 看本机装了哪些版本
```
或者上 [pyenv-win](https://github.com/pyenv-win/pyenv-win) 当版本管理器。
:::

---

## 走完这页你能做到…… ✅

- [ ] 装好 Python 3.12+（**从 python.org 官网**，不是 Store 版）
- [ ] `python --version` / `pip --version` / `where python` 三条都正常
- [ ] 知道**怎么建虚拟环境**（`python -m venv .venv` + Activate）
- [ ] pip **永久换成国内源**

下一步 → Python 搞定，该装数据库了：[PostgreSQL 安装](/noobook/advance/windows/postgresql)
