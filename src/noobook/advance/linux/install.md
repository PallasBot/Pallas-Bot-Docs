# 选择你的系统和部署方式

上一节你选了「用 Linux」，那接下来要做两个决定：

1. **用哪个 Linux 发行版？** —— 选 Linux 的「品牌」（推荐 Debian / Ubuntu，下面会说为啥）
2. **机器放哪里？** —— 选部署方式（云服务器 / 虚拟机 / 物理机）

这一页**只帮你快速做决定**；具体怎么装、装好后怎么配，拆到 [在物理机上装 Linux](/noobook/advance/linux/install-os) 那页去讲（**走物理机流程作为蓝本，90% 内容对云/虚也通用**）。

---

## 一、先选发行版 —— 萌新无脑 Debian / Ubuntu

Linux 是个**家族**，下面有几百个「发行版」（distro），就像手机有小米、华为、苹果……不同发行版**装软件的方式、配置位置、稳定性都不一样**。

**个人推荐**：

| 发行版 | 推荐版本 | 特点 |
| :--- | :--- | :--- |
| **Ubuntu Server** | **最新 LTS 版本**（装系统时去 [Ubuntu 官网](https://ubuntu.com/download/server) 看当前在支持哪几个） | 社区最大，教程最多，新手最稳 |
| **Debian** | **当前 stable 版本**（装系统时去 [Debian 官网](https://www.debian.org/distrib/) 看最新代号） | Ubuntu 的「上游爸爸」，更精简、稳定性优先 |

> **强烈建议选 LTS 版本**（Long Term Support，长期支持）—— **官方维护 5 年**，安全更新不断；非 LTS 版本**半年就停止支持**。

### 为什么选择 Debian / Ubuntu

::: tip  AI 场景下，Debian/Ubuntu 的硬优势
1. **NVIDIA 驱动 / CUDA 一键装**  
   Ubuntu 官方源里直接有 `nvidia-driver-xxx` 和 CUDA toolkit；其他发行版要么得手动编译、要么要装第三方源。**AI 跑模型基本必备 CUDA**，Ubuntu 是最少坑的选择。
2. **Python / pip / conda 兼容性最好**  
   PyTorch、TensorFlow 的官方安装文档默认就是 Ubuntu，CUDA 版本的 wheel 包**优先为 Ubuntu 构建**。
3. **apt 包管理 + 官方文档**最全**  
   百度/谷歌搜 Linux 教程，**10 篇有 8 篇是 Ubuntu**。出问题去 [Stack Overflow](https://stackoverflow.com/) 找答案，Ubuntu 系最容易被解答。
4. **云服务商镜像**最丰富**  
   腾讯云、阿里云、AWS、Azure、Vultr、DigitalOcean **官方提供的 Linux 镜像必有 Ubuntu**。选 Debian 也基本有。
:::

::: warning  不太推荐萌新一上来就玩的
- **Arch Linux**：滚动更新，所有东西都要自己装，**装坏一次就重装**（适合「我想深入理解 Linux」的发烧友）
- **CentOS Stream / RHEL**：yum/dnf 默认源很多包不提供（尤其 NVIDIA），要 EPEL 折腾一圈
- **非 LTS 的 Ubuntu**：半年就停服，**生产环境千万别用**
- **国产发行版（Deepin / UOS / openEuler 桌面版）**：日常桌面可以，但**服务器场景下文档偏少、踩坑资料不多**
:::

---

## 二、再选部署方式 —— 机器放哪里？

| 方式 | 适合谁 | 难度 | 费用 |
| :--- | :--- | :--- | :--- |
| **A. 云服务器**（最推荐） | 想稳定 7×24 跑 bot 的人 | ⭐ 简单 | 学生机几十元/月；个人用轻量级 **¥30-100/月** |
| **B. 虚拟机** | 本地电脑就是主力，但想顺便跑一个 Linux | ⭐⭐ 中等 | 0（白嫖本地电脑） |
| **C. 物理机/旧电脑** | 家里有闲置电脑想废物利用 | ⭐⭐⭐ 较麻烦 | 0（白嫖旧硬件） |

> **萌新无脑选 A**。云服务器**几分钟就能开好、装好系统、配好公网 IP**，远比折腾本地硬件省心。  
> 你先把 bot 在云上跑通了，**再**考虑要不要本地部署，省下一堆「为啥我装不上」「为啥连不上」的麻烦。

---

## 三、选好了？点这个去装系统

| 你选的部署方式 | 跳到 |
| :--- | :--- |
| ☁️ **云服务器** | [在物理机上装 Linux](/noobook/advance/linux/install-os) —— **跳过「写 U 盘 + 改 BIOS」那两步**，直接看「装系统向导 + 装完第一件事」 |
| 💻 **虚拟机** | [在物理机上装 Linux](/noobook/advance/linux/install-os) —— 流程几乎一样，看「创建虚拟机 + 装系统向导」那部分 |
| 🖥️ **物理机** | [在物理机上装 Linux](/noobook/advance/linux/install-os) —— 完整流程，从写 U 盘开始 |

> **为啥三种方式都跳到同一篇？**  
> **走物理机蓝本是写得最完整的**——写 U 盘、改 BIOS、装系统向导、分区……云/虚的差异只是**前两步**（写 U 盘 + 改 BIOS 被厂商 / 软件自动跳过）。所以看完这一篇，三种方式都搞定了。

---

## 走完这页你能做到…… ✅

- [ ] 知道自己要用**哪个 Linux 发行版**（推荐 Debian / Ubuntu）
- [ ] 知道自己的部署方式是**云 / 虚 / 物**哪个
- [ ] 跳到 [在物理机上装 Linux](/noobook/advance/linux/install-os) 开始装

下一步 → 去装系统：[在物理机上装 Linux](/noobook/advance/linux/install-os)
