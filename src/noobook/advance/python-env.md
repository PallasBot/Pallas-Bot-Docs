# Python 包管理：`venv` / `pip` / `uv` 三件套

Python 装包真就两件事：**装哪里**、**用什么装**。听起来简单——但 90% 的萌新都栽在「装一堆包到全局 Python，第二天换个项目就版本打架」上。

这一页讲清楚跨平台通用的 **`venv`（虚拟环境）+ `pip`（标准包管理器）+ `uv`（主推的现代替代品）**。装好后，**Linux 和 Windows 上命令完全一样**——所以单独成一页，不再分发行版讲。

> **读完这一页你能做到……**  
> - [ ] 听到「虚拟环境」三个字不再发懵，知道**为啥要建**  
> - [ ] 能用 `venv` 给项目建独立的 Python 环境，会激活/退出  
> - [ ] 用 `pip` 装/删/查包，会**换国内源**  
> - [ ] 知道 `uv` 比 pip 快在哪、Pallas-Bot 主仓为啥默认推它  
> - [ ] 能跑通 `uv sync` / `uv run pallas` 这套主仓默认命令  
> - [ ] 翻车时**知道先看哪里**（`which python` / `pip list` / `.venv` 在哪）  

---

## 一、为啥非得用「虚拟环境」？

> **虚拟环境（virtual environment）= 给每个项目分一个独立的 Python 工作间**  
> 项目 A 装的包跟项目 B **完全隔离**，谁也不污染谁。

::: tip 🤔 没虚拟环境会怎样？(真实血泪)
- 你装项目 A 需要 `requests==2.28`
- 隔几天装项目 B 需要 `requests==2.31`
- pip 把 2.31 装上 → **项目 A 立刻挂掉**
- 你切回 A 把 2.28 装回来 → **项目 B 又挂了**
- 来回拉扯几次 → 你把整个 Python 卸了重装 → 第二天又重蹈覆辙

**虚拟环境就是从源头杜绝这个**：A 在 `A/.venv/` 里，B 在 `B/.venv/` 里，互不可见。
:::

### 物理上虚拟环境到底是啥？

就是项目目录下一个 **`.venv/` 文件夹**，里面是「这个项目独享的 Python 解释器 + 它装的所有包」：

```
my-bot/
├── .venv/                          # ← 虚拟环境
│   ├── bin/        (Linux/Mac)     # ← 项目专属的 python / pip
│   │   ├── python
│   │   └── pip
│   ├── Scripts/    (Windows)       # ← Windows 版叫 Scripts
│   │   ├── python.exe
│   │   └── pip.exe
│   └── lib/                        # ← 装的包都在这里
│       └── python3.12/site-packages/
│           ├── requests/
│           └── ...
├── src/                            # 你的项目代码
└── requirements.txt
```

**关键点**：
- `.venv/` 是个**普通文件夹**，删掉就等于这个虚拟环境没了——**不会影响系统 Python 一根毫毛**
- 项目目录之间互不干扰：每个项目一个 `.venv/`，搞坏了删了重建
- `.venv/` **不要 commit 到 Git**（参考 [git 篇的 .gitignore](/noobook/advance/git#八-gitignore-啥不该让-git-管)）

---

## 二、`venv` —— Python 自带的虚拟环境方案

Python 3.3+ **自带** `venv` 模块，不用额外装。这是**最稳的兜底方案**。

### 1. 建虚拟环境

```bash
# 进项目目录
cd my-bot/

# 用当前 Python 建一个虚拟环境(目录名约定俗成叫 .venv)
python -m venv .venv
```

> 💡 **`-m venv` 是啥？** `python -m xxx` = 「用 python 跑 xxx 模块当脚本」。`venv` 是 Python 标准库里的模块。

### 2. 激活（**这里跨平台不一样**）

| 系统 / 终端 | 激活命令 |
| :--- | :--- |
| **Linux / macOS / WSL** | `source .venv/bin/activate` |
| **Windows PowerShell** | `.\.venv\Scripts\Activate.ps1` |
| **Windows cmd** | `.\.venv\Scripts\activate.bat` |
| **Windows Git Bash** | `source .venv/Scripts/activate` |

::: warning ⚠️ Windows PowerShell 第一次激活会报"禁止运行脚本"
管理员权限开个 PowerShell 跑一次（**一劳永逸**）：
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
:::

激活成功的标志：**命令行最前面会多个 `(.venv)` 前缀**：

```
(.venv) user@host:~/my-bot$
```

### 3. 验证一下激活生效

```bash
# 看 python 现在指向哪里(应该是 .venv 里的)
which python      # Linux/Mac
where python      # Windows
# 期望:.../my-bot/.venv/bin/python (Linux) 或 .\.venv\Scripts\python.exe (Windows)

# 看 pip 装的包(全新虚拟环境只有 pip / setuptools)
pip list
```

### 4. 退出

```bash
deactivate    # 跨平台通用
```

退出后 `which python` 又指回系统 Python。再激活就再用 `.venv`。

---

## 三、`pip` 速查 + 换国内源

`pip` 是 Python 自带的包管理器（**所有人都从这里入门**）。下面命令**在虚拟环境激活的状态下跑**——这样装的包就装到 `.venv/` 里。

### 1. 高频命令

| 你想干嘛 | 命令 |
| :--- | :--- |
| 装单个包 | `pip install requests` |
| 装指定版本 | `pip install requests==2.31.0` |
| 装一个范围 | `pip install "requests>=2.28,<3.0"` |
| 从 requirements 文件批量装 | `pip install -r requirements.txt` |
| 卸载 | `pip uninstall requests` |
| 升级 pip 自己 | `python -m pip install -U pip` |
| 看已装的包 | `pip list` |
| 看某个包的详情 | `pip show requests` |
| **导出**「我装了哪些包」 | `pip freeze > requirements.txt` |
| 查某个包过没过期 | `pip list --outdated` |

### 2. 永久换国内源（**装好 Python 第一件事**）

pip 默认从 PyPI（境外）下包，国内速度感人。配一次永久有效：

```bash
# 清华源(任挑一家国内镜像)
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# 验证
pip config list
# 期望:global.index-url='https://pypi.tuna.tsinghua.edu.cn/simple'
```

国内镜像（任挑一家稳的）：

| 镜像 | URL |
| :--- | :--- |
| 清华 | `https://pypi.tuna.tsinghua.edu.cn/simple` |
| 阿里 | `https://mirrors.aliyun.com/pypi/simple/` |
| 中科大 | `https://pypi.mirrors.ustc.edu.cn/simple/` |
| 华为云 | `https://repo.huaweicloud.com/repository/pypi/simple` |

> 💡 哪家挂了/慢了换一家就行。**别同时配多家**——优先级会乱。

### 3. `requirements.txt` 是啥？

一个**纯文本文件**，每行写一个包+版本。**这是 Python 项目分享依赖的标准格式**：

```text
# requirements.txt 示例
nonebot2==2.3.3
psycopg[binary]>=3.1
jieba==0.42.1
```

别人 clone 你的项目，跑 `pip install -r requirements.txt` 就能把你装过的包**一字不差**装一份。

---

## 四、`uv` —— Pallas-Bot 主推的「全家桶」

`uv` 是 [Astral](https://astral.sh/) 出的**新一代 Python 工具链**（Rust 写的）。**Pallas-Bot 的官方部署文档全用 uv**——`uv sync`、`uv run pallas` 这些命令你早晚要见。

### 1. uv 凭啥比 pip 强？

| 维度 | `pip` + `venv` | `uv` |
| :--- | :--- | :--- |
| **速度** | 慢，串行解析依赖 | **10-100 倍快**（并行 + 本地缓存）|
| **建虚拟环境** | `python -m venv .venv` | `uv venv`（**自动**） |
| **锁定依赖版本** | 手动 `pip freeze` | **自动**生成 `uv.lock` |
| **装/删包** | `pip install xxx` | `uv add xxx`（同时更新 `pyproject.toml` + `uv.lock`） |
| **跑项目脚本** | 先激活 venv，再跑 | `uv run xxx`（**不用激活**） |
| **Python 多版本** | 自己装/管 | `uv python install 3.12` **直接装** |

> 🙊 简单说：`uv = pip + venv + pip-tools + pyenv 的合体替代品`。Pallas-Bot 这种**严格锁版本**的项目最受益。

### 2. 装 uv

```bash
# Linux / macOS(官方推荐脚本)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows PowerShell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# 已经有 pip?直接 pip 装也行
pip install uv

# 验证
uv --version
```

::: tip 💡 国内装 uv 慢?
官方脚本走 GitHub release，国内可能慢。备选：
- 上面那条 `pip install uv`(走你已配的 pip 镜像)
- 或者去 [GitHub releases](https://github.com/astral-sh/uv/releases) 手动下二进制丢进 PATH
:::

### 3. uv 高频命令

```bash
# === 在一个项目目录里 ===

# 1. 初始化一个 uv 项目(会生成 pyproject.toml + .python-version)
uv init my-project

# 2. 加一个依赖(自动建 .venv + 装包 + 写进 pyproject.toml + 写 uv.lock)
uv add requests

# 3. 加一个开发依赖(只在开发时需要,不会装进生产)
uv add --dev pytest

# 4. 删依赖
uv remove requests

# 5. 用项目的 .venv 跑命令(不用激活!)
uv run python -c "print('hello')"
uv run pytest

# 6. 同步项目所有依赖(常用于 clone 完别人项目后)
uv sync                    # 装项目依赖（含 PG 驱动）
uv sync --dev              # 装常规 + 开发依赖

# 7. 装/管 Python 版本
uv python install 3.12     # 装 Python 3.12
uv python list             # 看 uv 知道哪些 Python
```

### 4. Pallas-Bot 主仓常见 uv 命令

直接抄主仓 [部署文档](/deploy/deployment) 和 [开发环境](/developer/environment) 里的：

```bash
# 在 Pallas-Bot 仓库根目录下

uv sync                      # 装项目依赖（含 PostgreSQL 驱动）
uv sync --extra perf         # 加性能优化包
uv sync --extra coord-redis  # 加 Redis 协调器
uv sync --dev                # 装开发依赖(ruff/pytest/pre-commit 等)

uv run pallas                # 启动 bot（单进程）
uv run python tools/scripts/backup_database.py    # 跑备份脚本
uv run ruff check pallas/ packages/  # 跑 lint
uv run pytest                # 跑单测
```

> 💡 **看到 `uv run xxx` 不用先 `source .venv/bin/activate`**——uv 自动用项目 `.venv` 跑命令。这是 uv 最爽的设计之一。

### 5. `uv` 跟 `pip` 能混用吗？

**能，但不推荐**。

- 在 uv 项目里偶尔 `uv pip install xxx` 装个临时调试包是可以的（`uv pip` 是兼容层，行为接近 pip）
- 但**别**用普通 `pip install` 在 uv 项目的 `.venv` 里乱装——会绕过 `uv.lock`，下次 `uv sync` 可能把你装的包冲掉
- **新项目从头开始**：直接上 uv，别走 pip 老路

---

## 五、三者关系 —— 一张表看懂

| 工具 | 干啥 | 啥时候用 |
| :--- | :--- | :--- |
| **`venv`** | Python 自带的虚拟环境建造工具 | 没装 uv、装不上 uv、维护老项目 |
| **`pip`** | Python 自带的包管理器 | 单独装个临时包；老项目；不会 uv 时的兜底 |
| **`uv`** | venv + pip + pip-tools + pyenv 的现代全家桶 | **新项目首选**、Pallas-Bot 主仓 |

::: tip 🙊 萌新决策树
- **你刚接触 Python** → 先学 `venv` + `pip`（懂基础），再学 `uv`（吃糖）
- **你要部署 Pallas-Bot** → **直接上 uv**，主仓所有命令都是 uv
- **公司/学校老项目还在用 pip** → 跟着项目走，别擅自换 uv
:::

---

## 六、Pallas-Bot 实战：从 clone 到跑起来

```bash
# 1. clone 主仓(详见 [要用 Git!](/noobook/advance/git))
git clone https://github.com/PallasBot/Pallas-Bot.git
cd Pallas-Bot

# 2. 装 uv(如果还没装)
pip install uv

# 3. 装 Python(如果系统没有 3.12+)
uv python install 3.12

# 4. 同步依赖
uv sync

# 5. 看一眼 .venv 真的建好了
ls .venv/         # Linux/Mac
dir .venv\        # Windows

# 6. 配置 pallas.toml(详见 [快速部署](/guide/quickstart))
cp config/pallas.example.toml config/pallas.toml
# 编辑 pallas.toml 填上数据库连接、超管 QQ 等

# 7. 启动!
uv run pallas

# 8. 后续日常:
uv add 某个新依赖           # 加包
uv sync                    # 同步依赖(比如别人推了新的依赖)
uv run python tools/xxx.py # 跑工具脚本
```

---

## 七、常见翻车现场

::: details `pip install` 报「ModuleNotFoundError: No module named 'pip'」
你的 Python 装的时候没勾上 pip。修复：
```bash
# Linux
python -m ensurepip
# Windows
py -m ensurepip
```
或者重装 Python 时勾上 pip。
:::

::: details 装了包但 `python -c "import xxx"` 还是说 No module
**99% 是装到了系统 Python，没装到当前虚拟环境**。检查：
```bash
which pip         # Linux  / where pip (Windows)
which python      # 应该都指向 .venv/...
```
如果指向系统的 `/usr/bin/python` 这种——**虚拟环境没激活**，重新 `source .venv/bin/activate`。
:::

::: details `Microsoft Visual C++ 14.0 or greater is required`（Windows）
有 C 扩展包要本地编译，但 Windows 没编译器 → 翻 [C++ 编译环境救命包](/noobook/advance/windows/buildtools)。
:::

::: details `uv sync` 报「No solution found when resolving dependencies」
依赖**版本互相打架**了。一般是：
- `pyproject.toml` 里限制太死(比如同时要 A>=2.0 和需要 A<2.0 的 B)
- Python 版本不匹配
看 uv 报错的具体哪两个包冲突,改 `pyproject.toml` 放宽限制,或者去 GitHub 给作者提 issue。
:::

::: details 公司网/学校网 SSL 证书报错
```bash
# 临时绕过(只对单次命令有效)
pip install --trusted-host pypi.tuna.tsinghua.edu.cn xxx
uv add --index-strategy unsafe-best-match xxx
```
长期方案:跟网管/IT 要根证书装进系统。
:::

::: details 想升级虚拟环境里的 Python 版本
**venv 不支持原地升级**——只能删了重建：
```bash
deactivate                # 先退出
rm -rf .venv              # Linux / rmdir /s .venv (Windows)
python3.13 -m venv .venv  # 用新版 Python 重建
# 然后重装依赖
pip install -r requirements.txt
# 或 uv sync
```
:::

---

## 八、装东西的优先顺序（避免踩雷）

```
┌────────────────────────────────────────────┐
│ 1. 装 Python 3.12+                          │
│    └─ Linux: 包管理器 / Windows: 官网安装包  │
├────────────────────────────────────────────┤
│ 2. 配 pip 国内源(永久)                       │
├────────────────────────────────────────────┤
│ 3. 装 uv (pip install uv)                  │
├────────────────────────────────────────────┤
│ 4. clone 项目 → 进项目目录                   │
├────────────────────────────────────────────┤
│ 5. uv sync（或按主仓文档）                 │
├────────────────────────────────────────────┤
│ 6. uv run pallas                            │
└────────────────────────────────────────────┘
```

走错顺序常见后果：
- **跳过 2** → 装包慢到怀疑人生
- **跳过 3** → 走 pip 老路，每次升级版本都要手动 freeze，痛
- **跳过 4 直接全局装** → 污染系统 Python，**最后一定后悔**

---

## 走完这页你能做到…… ✅

- [ ] 听到「虚拟环境」不再发懵，能说清**为啥要建**
- [ ] 用 `python -m venv .venv` 建虚拟环境 + 激活 + 退出（**跨平台**）
- [ ] `pip install` / `pip list` / `pip freeze` 三件套熟练
- [ ] **永久配好了 pip 国内源**
- [ ] 装好了 `uv`，会用 `uv sync` / `uv add` / `uv run`
- [ ] 能照着主仓 [部署文档](/deploy/deployment) 跑通 `uv sync` + `uv run pallas`
- [ ] 翻车时知道**先看 `which python`**——决定一切的起点

---

下一步 → 工具备齐了，去看 [要用 Git!](/noobook/advance/git) 学会把代码管起来；  
或者根据你的系统去看具体部署：[Linux 速成 6 篇](/noobook/advance/linux/install) / [Windows 入口](/noobook/advance/windows/)；  
也可以直接去 [你过关!](/noobook/welldone) 收个尾~
