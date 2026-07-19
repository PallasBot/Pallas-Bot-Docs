# 装东西：包管理器（`apt`）一览

权限懂了，接下来小猪就要往服务器上**装软件**了。在 Linux 里，你**几乎不会去网上下 `.exe` 双击安装**——而是走**包管理器**这条路。

> **小猪要懂**：包管理器 = 帮你**下载 + 装 + 升级 + 删**软件的「应用商店」，但比手机应用商店多两把刷子：
> - **自动解决依赖**：你装 A，它自动把 A 需要的 B、C、D 全装上
> - **统一管理版本**：升级全系统一起升，不会出现「我这能跑你那崩」的版本错乱

---

## 一、`apt` 速查表

既然按 [第一章](/noobook/advance/linux/install) 选了 Debian / Ubuntu，下面**只讲 `apt`**。其他发行版（CentOS 的 `yum` / `dnf`、Arch 的 `pacman`）命令不一样，但思路相同——**摸到一台机器先 `cat /etc/os-release` 确认发行版**。

| 项目 | Debian / Ubuntu |
| :--- | :--- |
| **包管理器** | `apt`（高层）/ `apt-get`（底层） |
| **包格式** | `.deb` |
| **配置文件** | `/etc/apt/sources.list` |

> **怎么看自己是哪个？**
> ```bash
> cat /etc/os-release    # 最权威（输出 PRETTY_NAME=Ubuntu ... 之类）
> ```

---

## 二、高频操作（一定要背下来！）

> 所有命令前面加 `sudo`（非 root 用户）。

| 你想干嘛 | `apt` 命令 |
| :--- | :--- |
| **更新包索引** | `sudo apt update` |
| **升级所有包** | `sudo apt upgrade` |
| **安装软件** | `sudo apt install git` |
| **删除软件**（保留配置） | `sudo apt remove git` |
| **彻底删除**（含配置） | `sudo apt purge git` |
| **搜索包** | `apt search git` |
| **看包信息** | `apt show git` |
| **列出已装包** | `apt list --installed` |
| **清理缓存** | `sudo apt autoclean && sudo apt autoremove` |

### 实操：装 git

```bash
sudo apt update
sudo apt install git -y
git --version
```

> `-y` 是「自动回答 yes」，自动化脚本必备；交互式终端里**建议不加**，免得装错东西被默认 yes 通过。

::: warning ⚠️ `apt update` 和 `apt upgrade` 不是一回事！
- `apt update`：**只更新「包的索引清单」**（看仓库里有什么新版本），**不装东西**
- `apt upgrade`：**真正升级已装包**
- **顺序**：先 `update` 再 `upgrade`，不然你装的可能是过时版本
:::

---

## 三、装完后怎么知道装哪了？

```bash
# 1. 看可执行文件路径（PATH 那一套，看过猪机必背的话应该眼熟）
which git
# 输出：/usr/bin/git

# 2. 看二进制实际位置（which 找不到时用）
whereis git
# 输出：git: /usr/bin/git /usr/share/man/man1/git.1.gz

# 3. 配置文件 / 装了哪些文件
dpkg -L git              # Debian/Ubuntu 的「这个包装了哪些文件」

# 4. 装在用户目录（不需 sudo）的工具
ls ~/.local/bin/         # pip / pnpm / cargo 装的常在这
```

---

## 四、「仓库」和「源」是怎么回事？

包管理器去哪儿下载软件？答案是**仓库（repository）**——其实就是一堆**网络上的服务器**，里面摆好了所有可装的包。

- 配置文件里写的就是**仓库地址**（`/etc/apt/sources.list`）
- 默认仓库在境外，国内连可能**很慢**
- 这时候就要**换源**（换到国内镜像）

### 萌新必知：换源思路

镜像地址会随发行版发版、镜像站调整路径变来变去，**写死在文档里第二天就过期**。所以这一节**只给主流镜像站入口 + 通用套路**，具体 sources.list 内容**去镜像站自己复制**当前系统版本对应的。

#### 主流镜像站（点进去找「使用帮助」）

| 镜像站 | 入口 | 怎么找自己版本的 sources.list |
| :--- | :--- | :--- |
| **清华 TUNA** | [mirrors.tuna.tsinghua.edu.cn](https://mirrors.tuna.tsinghua.edu.cn/) | 左侧目录点 `ubuntu/` 或 `debian/` → 顶部「使用帮助」 |
| **阿里云** | [developer.aliyun.com/mirror](https://developer.aliyun.com/mirror) | 搜「Ubuntu 源」/「Debian 源」 → 复制对应版本的 sources.list |
| **中科大 USTC** | [mirrors.ustc.edu.cn](https://mirrors.ustc.edu.cn/) | 同上,选 ubuntu / debian → 「使用说明」 |

> 💡 三个站速度差异不大,**选一个离自己近的就行**(一般 TUNA 或阿里就够)。

#### 通用套路

1. **先确认系统版本代号**(换源要用到 codename,不同版本对应的源不一样):`cat /etc/os-release` → 看 `VERSION_CODENAME` 一行(Ubuntu 是 `noble` / `jammy`,Debian 是 `bookworm` / `trixie` 之类)
2. **备份原文件**:`sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak`
3. **去上面任一镜像站** → 找**当前系统版本对应的 sources.list 内容** → 整段复制
4. **替换**:`sudo nano /etc/apt/sources.list`(`Ctrl+O` 保存、`Ctrl+X` 退出;不会 `nano` 的用 `sudo vi ...` 也行)
5. **验证**:`sudo apt update` 没报错就成
6. **千万别整段复制粘贴来历不明的「一键换源脚本」**——那是在 root 下跑 `curl | bash` 的高危动作!

---

## 五、装软件的三种姿势

| 姿势 | 适用场景 | 优点 | 缺点 |
| :--- | :--- | :--- | :--- |
| **`apt`（首选）** | 90% 情况 | 自动依赖、版本稳定、能升级 | 版本可能不是最新 |
| **`pip` / `npm` / `cargo`** 等语言自带 | 装编程语言生态 | 装的是「编程语言世界里」的最新版 | 跟系统包可能冲突 |
| **二进制直装** | 包仓库没有时 | 拿到啥版本用啥 | 没自动升级、可能要自己配 PATH |

::: danger ❌ 千万别这么装
- 去不知名网站下 `.deb` 双击安装
- 网上复制 `curl http://xxx.com/install.sh | sudo bash` 一把梭
- 编译安装（`./configure && make && sudo make install`）——除非你**真的**知道在干嘛，否则装完**卸载都卸不掉**
:::

---

## 六、找软件的小技巧

不知道某个东西叫啥包名？两种方法：

```bash
# 方法 1：网站搜
# 1. 搜「ubuntu 安装 XX」基本第一页就有
# 2. 或去 https://pkgs.org 跨发行版搜索（但只搜 Debian/Ubuntu 就行）

# 方法 2：apt-file（apt 专属，需要先装）
sudo apt install apt-file -y
sudo apt-file update
apt-file search bin/python3    # 哪个包提供 python3 这个文件？
```

---

## 七、apt 装齐系统依赖

系统包操作玩熟后,下面这条命令**专治萌新「不知道装啥」**——把 Pallas-Bot 跑起来要的系统级依赖一次装齐:

::: tip ✅ 适用范围
- **Ubuntu 24.04 LTS** 或更新（默认 Python 就是 3.12+，最省心）
- **Debian 12 / 13** 或更新（注意：Debian 12 默认 Python 是 3.11，需要额外补 3.12，下面有说）
- 其他发行版（CentOS / Arch）请把 `apt install` 替换成对应包管理器命令
:::

### 一行装齐核心包

```bash
# 先更新索引(别跳!)
sudo apt update

# 一次性装齐
sudo apt install -y \
    python3 python3-venv python3-pip \
    git curl \
    postgresql postgresql-contrib libpq-dev \
    build-essential
```

**每一项干嘛用的**：

| 包 | 用途 |
| :--- | :--- |
| `python3` | bot 跑在 Python 上(主仓要求 **3.12+**,见下「2」节) |
| `python3-venv` | 建虚拟环境用(Debian/Ubuntu 把 venv 单拆出来,**必装**) |
| `python3-pip` | Python 包管理器(后面装 `uv` 也用得上) |
| `git` | 拉主仓代码、跟踪改动(详见 [要用 Git!](/noobook/advance/git)) |
| `curl` | 下载工具(装 `uv` / 写 webhook 调试都要) |
| `postgresql` | PG 数据库 server 本体 |
| `postgresql-contrib` | PG 常用扩展(hstore / pgcrypto 等) |
| `libpq-dev` | PG 客户端开发库 —— **psycopg 装的时候要用** |
| `build-essential` | gcc / g++ / make 编译工具链 —— 装 jieba / numpy 等带 C 扩展的包**必备**(Linux 上的「[MSVC Build Tools](/noobook/advance/windows/buildtools) 等价物」) |

### 验证装齐了

```bash
python3 --version    # 期望:3.12.x 或更高(Ubuntu 24.04+ 默认就够)
git --version
psql --version       # PostgreSQL 客户端
gcc --version        # 编译器
```

::: warning ⚠️ `python3 --version` 显示 3.11 或更低怎么办?
说明你的发行版**默认 Python 不够新**(Debian 12 / Ubuntu 22.04 等)。两个方案任选其一:

**方案 A**:用 `uv` 直接管多版本 Python(**推荐**,最省心):
```bash
# 先装 uv
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.bashrc      # 让 uv 命令立刻生效

# 用 uv 装 3.12(uv 会自己下载预编译的 Python,跟系统 Python 互不打扰)
uv python install 3.12
uv python list        # 应该能看到 3.12.x
```
后续 `uv venv --python 3.12` / `uv sync --python 3.12` 就能用上 3.12,**完全不用动系统 Python**。

**方案 B**:加 deadsnakes PPA 装 3.12(仅 Ubuntu):
```bash
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install -y python3.12 python3.12-venv python3.12-dev
python3.12 --version  # 用 python3.12 这个新命令调用
```
:::

> 💡 装齐系统包**只是开始**——PG 怎么建库、uv 怎么装、主仓怎么 clone 跟启动,都**不归这一页管**,去看主仓的 [快速部署](/guide/quickstart) 和 [Python 环境管理](/noobook/advance/python-env)。

---


- [ ] `apt update` + `apt upgrade` + `apt install` + `apt remove` 四件套玩得转
- [ ] 知道装完后**可执行文件在哪**（`which` / `whereis`）
- [ ] 遇到「装新软件」会先 `apt search`，没有再想别的办法
- [ ] 知道**不乱跑来历不明的安装脚本**

下一步 → 系统包到位,真正的部署从这开始:[快速部署](/guide/quickstart)
