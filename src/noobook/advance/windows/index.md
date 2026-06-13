# 在 Windows 上跑牛牛？先听一嘴

你点进这页，大概率是这两种情况之一：

1. 家里只有一台 Windows 主力机，懒得搞双系统/虚拟机/云
2. 想先在熟悉的桌面上把 bot 跑起来，玩明白了再迁去 Linux

都行。这一章**不拦你**——但开工前先看完下面这段「劝退/劝留」，再决定要不要继续往下读。

---

## 一、先把丑话说前面：Windows 上跑 bot 有几个坑

::: danger ❌ Windows 跑 Pallas-Bot 的几个高频痛点
- **`pip install jieba` 经典翻车**：报 `Microsoft Visual C++ 14.0 or greater is required`——Windows 上没现成 C++ 编译器，得**额外装几个 G 的 Build Tools**。详见 [C++ 编译环境：jieba/numpy 翻车救命包](/noobook/advance/windows/buildtools)
- **没有 `systemd`**：bot 一直跑、自动重启、开机自启……这些 Linux 一行 `systemctl enable` 搞定的事，Windows 得**自己想办法**（任务计划程序 / NSSM / WinSW，每个都有坑）
- **路径分隔符**：Windows 是 `\`、Linux 是 `/`。粘配置文件、抄路径时**反斜杠要写双反斜杠 `\\` 或者前面加 `r`**（Python 字符串里），不然分分钟报错
- **GBK 编码坑**：Windows 中文系统终端默认 GBK，bot 日志里有 emoji 或生僻字会**乱码甚至崩**。要么改系统区域设置「使用 Unicode UTF-8」（重启），要么终端里 `chcp 65001`
- **端口/防火墙**：Windows 自带防火墙比想象中严格，WebUI 装好打不开，**八成是防火墙没放行**
- **性能差点意思**：同样的硬件，Linux 跑同样的 bot **内存占用低 20-30%**，长跑稳定性也更好——Windows 时不时还会被系统更新强制重启
:::

::: tip 🙊 然后是劝留的一面
- **桌面熟悉**：图形界面、双击就装，第一次接触服务器开发的小猪心理压力小
- **不用学远程登录**：直接在本机跑、本机看日志，省掉 SSH 那套
- **省一台机器**：日常用的猪机顺便跑 bot，不用专门开云、买小主机
- **临时测试可以**：装好玩两天、验证 bot 能不能用，**完全 OK**——但「长期挂着」就强烈建议迁 Linux
:::

> **猪猪建议**：**先在 Windows 把 bot 跑起来摸熟功能 → 再迁去 Linux 长期挂机**。不要 all-in Windows，迟早折腾你。

---

## 二、Windows 上想跑 bot 要装的几样东西

| 要装的东西 | 干嘛用的 | 必装？ |
| :--- | :--- | :--- |
| **Python 3.12+** | bot 本体跑在 Python 上 | ✅ 必装 |
| **PostgreSQL** | bot 的数据库（聊天记录、配置存这里） | ✅ 必装 |
| **MSVC Build Tools** | 编译 `jieba` 等 C 扩展包 | ⚠️ **80% 概率会用上**——`pip install` 翻车时再装 |
| Git | 拉代码、跟踪改动 | ⚠️ 建议装（见 [要用 Git!](/noobook/advance/git)） |
| 一个像样的终端 | 默认 cmd 太朴素 | 🙊 可选（推荐 Windows Terminal + PowerShell 7） |

> ⚠️ Python 装不对、PostgreSQL 没建对库、jieba 编不过——这三件事是 Windows 用户**90% 卡壳的地方**。下面三页就是专治这仨。

---

## 三、按这个顺序往下走

| 顺序 | 这页讲啥 | 跳到 |
| :--- | :--- | :--- |
| 1️⃣ | 装 Python，把 PATH 配明白 | [Python 3.12+ 安装](/noobook/advance/windows/python) |
| 2️⃣ | 装 PostgreSQL，建库 + 拿到连接串 | [PostgreSQL 安装](/noobook/advance/windows/postgresql) |
| 3️⃣ | `pip install` 报「C++ 14.0 required」时回来翻 | [C++ 编译环境救命包](/noobook/advance/windows/buildtools) |

> **第 3 页不一定要按顺序看**——只有 `pip install` 时遇到「编译失败」的报错才需要装 Build Tools。装早了占硬盘，装晚了卡进度，**等报错了再回来**就行。

---

## 走完这页你能做到…… ✅

- [ ] 知道 Windows 跑 bot 有哪些**注定要踩**的坑
- [ ] 心里有数：Windows 适合**短期测试**、Linux 适合**长期挂机**
- [ ] 看清楚后面三页的**因果关系**（Python → 数据库 → 编译救场）

下一步 → 先装 Python：[Python 3.12+ 安装](/noobook/advance/windows/python)
