# C++ 编译环境：jieba/numpy 翻车救命包

来这页大概率是因为你跑 `pip install` 时撞上了这一坨红色：

```
error: Microsoft Visual C++ 14.0 or greater is required.
Get it with "Microsoft C++ Build Tools":
https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

或者更细一点：

```
error: command 'cl.exe' failed: None
error: Failed building wheel for jieba
```

别慌，**装一次 Build Tools 就一劳永逸**——但要装对，下面手把手带。

> **你的进度**：[装 Python](/noobook/advance/windows/python) → [装 PostgreSQL](/noobook/advance/windows/postgresql) → **你在这里**

---

## 一、先搞懂：为啥要装这玩意？

Python 包里有一类叫「**带 C 扩展的包**」——它们核心逻辑是用 C/C++ 写的（速度快），打包成 Python 可调用的形式。装这种包有两条路：

| 路径 | 触发条件 | 你要做啥 |
| :--- | :--- | :--- |
| **A. 直接下预编译好的 wheel（`.whl`）** | PyPI 上有对应「Python 版本 + 系统 + 架构」的 wheel | 啥也不做，`pip install` 自动下，秒装 |
| **B. 拿源码本地编译** | PyPI 上**没**对应的 wheel（罕见组合，比如 Python 3.13 刚出时） | 本机**必须有 C++ 编译器** |

`jieba` 这个中文分词包，**纯 Python 实现的部分**其实不需要编译——但 bot 的依赖里**有一堆其他 C 扩展包**（`psycopg`、`numpy`、`Pillow`、`ujson`……）。**只要任何一个走 B 路径，没编译器就翻车**。

::: tip 🙊 小猪要懂：MSVC 是啥
- MSVC = **M**icro**S**oft **V**isual **C** Compiler（微软自家的 C/C++ 编译器）
- Windows 上**默认没装**，得你手动装
- 报错里的「Microsoft Visual C++ 14.0」**不是指编译器版本 14.0**，而是 MSVC 的 ABI 版本——任何 **VS 2015 及之后版本的 Build Tools** 都满足条件
:::

---

## 二、解决方案对比

| 方案 | 优点 | 缺点 | 适合谁 |
| :--- | :--- | :--- | :--- |
| **A. 装 MSVC Build Tools** ⭐推荐 | 一劳永逸，所有 C 扩展都能编 | 体积大（**6-10 GB**） | 长期玩 Python / bot 的人 |
| **B. 用 conda/mamba 装包** | 跳过编译，直接拿 conda-forge 的预编译版 | 跟 pip 生态有割裂感 | 已经在用 Anaconda/Miniconda 的人 |
| **C. 单独找预编译 wheel** | 不用装编译器 | **PyPI 没的话基本死路一条**（曾经的 [lfd.uci.edu](https://www.lfd.uci.edu/~gohlke/pythonlibs/) 已停更） | 临时救急 |

> **猪猪建议**：选 A。装一次省以后所有麻烦。

---

## 三、方案 A：装 Visual Studio Build Tools（推荐）

### 1. 下载

去 [visualstudio.microsoft.com/visual-cpp-build-tools/](https://visualstudio.microsoft.com/visual-cpp-build-tools/) 点 **「Download Build Tools」**。

> ⚠️ **千万不要去下「Visual Studio 2022 Community」完整 IDE**——你又不写 .NET、不开发 Windows 桌面应用，IDE 那一坨多占 20+ GB 硬盘。Build Tools 就够。

### 2. 跑安装器

下下来一个 `vs_BuildTools.exe`，双击。安装器自己会先下一段进度，然后弹一个**工作负载选择**界面：

```
┌──────────────────────────────────────────┐
│  工作负载 │ 单个组件 │ 语言包 │ 安装位置  │
├──────────────────────────────────────────┤
│                                          │
│  ☑ 使用 C++ 的桌面开发                    │  ← 【勾这一项就行】
│                                          │
│  ☐ Node.js 生成工具                       │
│  ☐ Azure 开发                             │
│  ...                                     │
└──────────────────────────────────────────┘
```

### 3. 右侧「安装详细信息」面板

勾完 **「使用 C++ 的桌面开发」** 后，右边会弹一堆默认勾上的组件。**默认就够用**，但确认一下这几个**必须**勾上：

- ☑ **MSVC v143 - VS 2022 C++ x64/x86 生成工具**（最新版编译器）
- ☑ **Windows 11 SDK（最新版）** 或 **Windows 10 SDK（最新版）**——两个**至少留一个**
- ☑ **适用于 Windows 的 C++ CMake 工具**（部分包构建系统会用）

可以**取消**勾选的（默认勾着但你用不上的）：
- ❌ **测试工具核心功能 - Build Tools**
- ❌ **C++ AddressSanitizer**

> 💡 **体积参考**：默认勾完大概 **6-8 GB**。能省的省一点是一点，C 盘空间紧张的话**安装位置改到 D 盘**（界面右上角有「安装位置」标签）。

### 4. 点「安装」→ 等

慢的话**半小时起步**——它要下载 + 解压 + 配置。期间**别关电脑、别断网**。

> ⚠️ **装完会让你重启**——重启完才生效。**别跳过这步**！

---

## 四、装完怎么验证

重启完，开个**新的** PowerShell 或 cmd 窗口（旧窗口的环境变量还是老的，没用）：

```powershell
# 用 vswhere 找到 MSVC 路径(Build Tools 自带)
& "C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe" -latest -products "*" -find "VC\Tools\MSVC\*\bin\Hostx64\x64\cl.exe"
# 期望输出: C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\14.4x.xxxxx\bin\Hostx64\x64\cl.exe
```

最直接的验证就是**重跑 `pip install`**：

```powershell
# 激活 bot 的虚拟环境
cd D:\pallas-bot
.\.venv\Scripts\Activate.ps1

# 重新装会编译翻车的包
pip install jieba
# 期望:Successfully installed jieba-0.x.x

# 或者直接装 bot 完整依赖
uv sync --extra pg
```

::: tip ✅ 不报「Microsoft Visual C++ 14.0 required」了 = 装好了
红色减少 ≠ 100% 干净。如果是新的红色报错，别再装编译器——那是**包本身**的问题，照着新报错信息搜。
:::

---

## 五、方案 B：用 conda 跳过编译（应急）

如果**实在不想装 6 GB 编译器**，且你装了 **Anaconda** 或 **Miniconda**，可以用 `conda-forge` 这个社区维护的预编译仓库：

```powershell
# 假设当前在 bot 的 conda 环境
conda install -c conda-forge jieba numpy psycopg

# 装完再回去用 pip 装剩下的纯 Python 包
pip install -r requirements.txt
```

::: warning ⚠️ 把 conda 和 pip 混用要小心
- **conda 装的包优先**，pip 装的可能覆盖 conda 包导致版本错乱
- bot 的 `uv` / `pip` 工作流跟 conda **气场不合**——bot 官方文档默认 pip/uv，遇到问题搜不到针对 conda 的解决方案
- **能装 Build Tools 就装**，conda 只是没办法时的备胎
:::

---

## 六、方案 C：临时找预编译 wheel

万一只是**某一个特定包**编译不过，且你**不想装 Build Tools 也没有 conda**，可以**逐个找预编译 wheel**：

```powershell
# 1. 看你的 Python 版本和架构
python -c "import sys, platform; print(sys.version_info, platform.architecture())"
# 输出:sys.version_info(major=3, minor=12, ...) ('64bit', 'WindowsPE')

# 2. 去 PyPI 搜目标包,看 "Download files" 标签里有没有
#    "xxx-cp312-cp312-win_amd64.whl" 这种文件名
#    cp312 = CPython 3.12   win_amd64 = Windows 64-bit

# 3. 有的话直接装预编译版
pip install jieba==0.42.1
# pip 会优先拿 wheel,不走编译
```

> ⚠️ **过去神级救场站 [lfd.uci.edu/~gohlke/pythonlibs](https://www.lfd.uci.edu/~gohlke/pythonlibs/) 已经在 2022 年停更了**——别再传那个链接。现在主流找 wheel 的渠道：
> - **PyPI 官方包页面**的 Download files 标签
> - **conda-forge**（间接，需要 conda 才能用）
> - 包作者的 **GitHub Releases**

---

## 七、彻底卸载（如果你后悔了）

C 盘真挤不下、想卸 Build Tools：

1. 控制面板 → 程序和功能
2. 找 **Visual Studio Installer**（不是 Build Tools 本身！）
3. 启动它 → 找你装的 「Build Tools for Visual Studio 2022」→ 右边三个点 → **卸载**
4. 卸完再去**控制面板**卸载 **Visual Studio Installer** 本身

> 💡 卸完会留点残骸（`C:\Program Files (x86)\Microsoft Visual Studio\Installer\`），手动删干净。

---

## 八、还会撞到的奇怪错误

::: details error: command 'cl.exe' failed: No such file or directory
Build Tools 装是装了，但**新终端窗口找不到 cl**。两种可能：
1. **重启没做**——装完真的要重启
2. 装的时候**只装了 IDE 没装 MSVC v143**——回去重新跑安装器修改组件
:::

::: details RuntimeError: Microsoft Visual C++ 14.0 or greater is required（明明装了）
有时候 pip 找不到。试试在「**开始菜单 → Visual Studio 2022 → Developer Command Prompt**」里跑 `pip install`——这个终端会自动加载 MSVC 环境变量。能装上的话说明是普通 cmd 没继承环境变量，**重启电脑**通常能修。
:::

::: details fatal error C1083: 无法打开包括文件: 'xxx.h'
Windows SDK 没装或装错。重跑 Build Tools 安装器，确保**至少有一个 Windows SDK 勾上**（10 或 11 都行）。
:::

::: details Build Tools 下载时进度条卡 0%
官方下载源在境外，国内可能慢。可以：
- 挂梯子下
- 用[微软中国镜像](https://aka.ms/vs/17/release/vs_buildtools.exe)的离线安装包（搜「visual studio 2022 build tools offline 中国镜像」）
:::

---

## 走完这页你能做到…… ✅

- [ ] 装好 MSVC Build Tools（含 v143 + Windows SDK + CMake tools）
- [ ] **重启**过电脑
- [ ] `pip install jieba` 能装上**不报「C++ 14.0 required」**
- [ ] 知道**为啥**会有这个报错（C 扩展包要本地编译）
- [ ] 心里清楚 conda / 预编译 wheel 这俩**备胎**的存在

---

到这里 Windows 三件套就齐了：**Python ✅ + 数据库 ✅ + 编译器 ✅**。

接着回到主流程，照 [快速部署](/guide/start) 把 bot 的依赖装上、配置写好、跑起来。Windows 上守护进程别用 `systemd`（没这玩意儿），用[任务计划程序](https://learn.microsoft.com/zh-cn/windows/win32/taskschd/about-the-task-scheduler) 或 [NSSM](https://nssm.cc/) 当替代——这是另一坨坑了，建议**真到那一步再迁 Linux**。
