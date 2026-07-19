# 装 PostgreSQL（Windows 篇）

bot 的聊天记录、配置、词库……全都得有个地方存。Pallas-Bot 默认推荐用 **PostgreSQL**（也支持 MongoDB，但 PG 是主力栈，文档全、社区大、生态稳）。

这一页带你**从下载到拿到能连的连接串**全流程走一遍。

> **你的进度**：[装 Python](/noobook/advance/windows/python) → **你在这里** → [C++ 编译救场（按需）](/noobook/advance/windows/buildtools)

---

## 一、下载哪个版本

| 项目 | 推荐 |
| :--- | :--- |
| **主版本** | **PostgreSQL 16** 或 **17**（任挑一个 LTS 主版本即可） |
| **架构** | **Windows x86-64** |
| **下载渠道** | **EDB 官方安装器**：[postgresql.org/download/windows/](https://www.postgresql.org/download/windows/) → 点 「Download the installer」 |

> 💡 **为啥推荐 EDB 安装器？**  
> EDB 是 PG 的官方主要赞助商，他们出的 Windows 安装器**最稳**：自带 pgAdmin 4（图形管理工具）、Stack Builder（装扩展用）、配好 Windows 服务（开机自启）。**别从某些「绿色版」站点拿包**，缺东西。

---

## 二、安装步骤（耐心点过一遍）

双击下下来的 `postgresql-1x.x-x-windows-x64.exe`，**全程管理员权限**。

### 1. Installation Directory

```
C:\Program Files\PostgreSQL\16
```
默认就行，路径**短而清晰**。别动。

### 2. Select Components

**全勾**（4 个全勾）：

- ☑ **PostgreSQL Server**（数据库本体）
- ☑ **pgAdmin 4**（图形管理工具，新手救命）
- ☑ **Stack Builder**（之后想装 PostGIS 等扩展用）
- ☑ **Command Line Tools**（`psql` / `pg_dump`，**命令行必备**）

### 3. Data Directory

```
C:\Program Files\PostgreSQL\16\data
```
默认就行——这里放的是**你所有的数据**，将来**备份重点照顾这里**。

### 4. ⚠️ Password —— 务必记牢！

```
Password: ******
Retype password: ******
```

这是**数据库超级用户 `postgres` 的密码**，写完 bot 的 `pallas.toml` 配置时要填进去。

::: danger ❌ 这个密码忘了真的很麻烦！
忘了 `postgres` 用户密码：
- 要去改 `pg_hba.conf` 把认证改成 `trust`（无密码登录）
- 进 `psql` 用 `ALTER USER postgres PASSWORD 'xxx';` 重置
- 再把 `pg_hba.conf` 改回来
- 重启服务

**萌新建议**：拿张纸**当场抄下来**，或者用密码管理器记一下。**别**用 `123456` 这种弱密码——Windows 防火墙没拦死的话能被局域网扫到。
:::

### 5. Port

```
5432
```
默认端口。除非已经被占（罕见），否则别改。

### 6. Locale

下拉框里挑：

| 选项 | 建议 |
| :--- | :--- |
| **`[Default locale]`** | 跟着系统走（中文 Windows 会变成 `Chinese (Simplified)_China.936`，**有坑**） |
| **`C`** | **强烈推荐**！纯 ASCII 排序，最稳、性能最好、**不会出 GBK/UTF-8 编码事故** |
| `Chinese (Simplified), China` | 想要按中文拼音排序的话选这个 |

> 💡 **不知道选啥就选 `C`**。bot 的中文存得照样能存进去（数据库内部用 UTF-8），只是排序按字节序——对 bot 完全够用。

### 7. Pre Installation Summary

确认一遍——装。**进度条跑完别急着关**。

### 8. Stack Builder

装完最后一步会弹「Launch Stack Builder?」：**不勾，直接 Finish**。萌新阶段用不到扩展。

---

## 三、验证 PG 跑起来了没

### 方法 A：看 Windows 服务

按 `Win + R` → 输 `services.msc` → 回车，找：

```
postgresql-x64-16        正在运行    自动
```

✅ 「正在运行」「自动」= 装好了，开机自启也配上了。

### 方法 B：命令行连一下

打开 cmd / PowerShell：

```powershell
# 进 psql 交互终端
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h 127.0.0.1
# 输入刚才设的 postgres 密码

# 进去后能看到提示符:
postgres=#

# 试着列下所有数据库
\l

# 退出
\q
```

::: tip 💡 让 psql 全局可用
路径太长老敲不爽？把 `C:\Program Files\PostgreSQL\16\bin` 加到系统 **Path** 里，以后任何位置都能直接敲 `psql`。
:::

---

## 四、给 bot 建个专属数据库

bot 不应该直接住在 `postgres` 这个默认库里。建议给它单独建一个，主仓示例库名是 **`PallasBot`**。

### 方法 A：用 pgAdmin 4（图形界面，最直观）

1. 开始菜单找 **pgAdmin 4** → 启动（第一次打开会让你设个 pgAdmin 主密码，跟 postgres 密码无关，**也记下**）
2. 左侧 `Servers` → 双击 `PostgreSQL 16` → 输入 postgres 密码
3. 右键 `Databases` → `Create` → `Database...`
4. 在弹窗里：
   - **Database**: `PallasBot`（**大小写敏感**！跟主仓示例对齐）
   - **Owner**: `postgres`
   - **Encoding**(General 旁边的 Definition 标签里): **`UTF8`**
5. Save

### 方法 B：用 psql（命令行更快）

```sql
-- 进 psql 后(postgres=# 提示符)
CREATE DATABASE "PallasBot" WITH ENCODING 'UTF8';
-- 注意大小写: PallasBot 用双引号包起来 PG 才会保留大小写

-- 验证下
\l
-- 应该能看到一行 PallasBot ... UTF8 ...
```

---

## 五、bot 配置里要写的连接信息

回到 bot 项目，编辑 `config/pallas.toml`：

```toml
db_backend = "postgresql"

[bootstrap.postgres]
host = "127.0.0.1"      # 本机就是 127.0.0.1
port = 5432              # 默认端口
user = "postgres"        # 超级用户(也可以新建普通用户后再切;萌新先这样)
password = "你的postgres密码"   # 第四步设的那个
db = "PallasBot"         # 第四步建的库名
```

::: tip Python 端驱动
PostgreSQL 驱动（`sqlalchemy` / `asyncpg`）已在主依赖里，仓库根执行 `uv sync` 即可，无需再加 `--extra pg`。
:::

---

## 六、常见翻车现场

::: details psql: error: connection to server at "127.0.0.1", port 5432 failed: Connection refused
PG 服务**没在跑**。`Win + R` → `services.msc` → 找 `postgresql-x64-16` → 右键启动。如果启动失败，看 `C:\Program Files\PostgreSQL\16\data\log\` 里最新的日志。
:::

::: details FATAL: password authentication failed for user "postgres"
密码记错了。补救方案：
1. 打开 `C:\Program Files\PostgreSQL\16\data\pg_hba.conf`（要管理员权限编辑）
2. 找 `host all all 127.0.0.1/32 scram-sha-256` 这行，把 `scram-sha-256` 临时改成 `trust`
3. 重启 PG 服务（services.msc 里右键 → 重启动）
4. `psql -U postgres -h 127.0.0.1` 直接进去（不要密码）
5. `ALTER USER postgres PASSWORD '新密码';`
6. 把 `pg_hba.conf` 改回 `scram-sha-256`
7. 再重启 PG 服务
:::

::: details FATAL: database "PallasBot" does not exist
bot 配置里写的库名跟实际不一致。或者你建库时没加双引号——PG 默认会把 `CREATE DATABASE PallasBot` 折成全小写 `pallasbot`。

```sql
-- 列出现有库
\l

-- 改 bot 配置对齐;或者:
DROP DATABASE pallasbot;
CREATE DATABASE "PallasBot" WITH ENCODING 'UTF8';
```
:::

::: details 中文存进去查出来是「???」
- 库的 **Encoding 不是 UTF8**（建库时漏选了）——**得 DROP 重建**，没办法直接改
- 客户端编码不对——`psql` 里跑 `SHOW client_encoding;` 看看，应该是 `UTF8`
- 系统 locale 设的不是 UTF-8——参考 [Python 篇的 GBK 注意事项](/noobook/advance/windows/python)
:::

::: details 5432 端口被占
看谁占了：
```powershell
netstat -ano | findstr :5432
# 输出最后一列是 PID,去任务管理器找
```
- 99% 是装了**旧版 PG 没卸干净**，或装过 pgAdmin Server 之类
- 卸掉旧版 → 重装新版；或者新版改用 5433 端口（安装时改）
:::

---

## 走完这页你能做到…… ✅

- [ ] PG 服务**自动启动**（services.msc 里看「正在运行」）
- [ ] `psql -U postgres` **能登进去**
- [ ] 有一个名叫 **`PallasBot`** 的数据库（UTF8 编码）
- [ ] 知道 bot 的 `pallas.toml` 里要填什么连接信息
- [ ] 跑过 `uv sync`（PG 驱动已在主依赖）

下一步 → 想 `pip install` bot 的依赖时报「**Microsoft Visual C++ 14.0 or greater is required**」？翻这页：[C++ 编译环境救命包](/noobook/advance/windows/buildtools)
