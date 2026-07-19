# Docs 站文风重校准（对标 GSUID 全站，非仅安装页）

日期：2026-07-19  
状态：已批准（方案 A）  
仓库：`Pallas-Bot-Docs`（呈现源）；主仓 `Pallas-Bot/docs/` 按既有同步流程对齐用户向内容  
参考：`https://docs.sayu-bot.com/` · 源码 `Genshin-bots/GenshinUID-docs`（`vp` 分支）

## 问题

此前按 GSUID「安装 Core」一页的短步骤 + tip + 导流节奏，把用户向文档整体改成同一种口吻。  
GSUID 全站实际是**按页面类型分层**：安装短、教程细、概念可跳过、FAQ/参考冷事实。用安装页定义全文风是错的。

## 决策摘要

| 项 | 选择 |
| --- | --- |
| 落地方式 | **A**：分层手册 + 轻组件 |
| 品牌/主题 | **Pallas 紫皮** + 借用 GSUID 写法；不换红皮、不整包移植 UnoCSS/PageInfo/PWA |
| 内容范围 | 上手 / 使用与概念 / 运维 / 开发 / 首页+导航（全选） |
| 人格 | **温暖产品名**：正文用 Pallas-Bot；群触发词保留「牛牛帮助」；标题可偶尔趣味，不全程卖萌 |
| Badge 难度 | **不用**；现有「简单/普通/稍难」标题 Badge 在改写时去掉 |

## §1 页面类型 → 文风矩阵

| 类型 | 对标 GSUID | 密度 / 口吻 | Pallas 例 |
| --- | --- | --- | --- |
| 上手 How-to | InstallCore / InstallPlugins | 短步骤、命令块、details 折叠备选；结尾 ▶ 下一站 | quickstart、install-source、docker、connect-qq、install-plugins、web-console |
| 概念 Explanation | BaseInfo | 可跳过声明；短列表/对照；不堆命令 | concepts、architecture overview |
| 教程 Tutorial | CookBook | 编号长叙事、耐心讲解、ChatPanel 演示 | first-plugin、community-plugin-author、部分 AI 接入 |
| 使用 How-to | BindDevice / WebConsole | 任务导向、少铺垫；真实触发词 | usage、llm-and-repeater、ai、advanced |
| FAQ / 参考 | FAQ / Class / CoreConfig | Q-A 或参数表；冷事实、少「你可能需要」 | faq、cli、config、glossary、internal-api |
| 运维 How-to | Secure / Docker / 进阶 | 检查清单、命令、失败分支；专业简短 | maintainer/*、deploy/*、troubleshooting |

### 反模式（禁止）

- 概念 / FAQ / 配置参考写成「装完之后你可能需要」导流站
- 教程页只有表格分流、没有手把手步骤
- 全站统一 tip 口吻或统一安装页节奏

## §2 主题与组件

### 做

- **tip / warning 标题**：`markdownTransform` 无标题时补 💡 提醒 / 🚨 警告 / 🔥 注意 / 📝 备注
- **ChatPanel**：教程 / 装插件 / 对话示意页使用；FAQ / 配置参考不用
- **custom-block 标题**：略加大 tip 标题字重/字号
- **侧栏 / 导航**：按 §1 分区；少量 emoji 作分区锚点，不堆每条链接
- **首页**：温暖产品名收文案；CTA 对齐真实路径

### 不做

- 标题 Badge 难度（简单 / 普通 / 稍难）
- 品牌改 GSUID 红、home 红渐变
- PageInfo 字数条、UnoCSS、medium-zoom、PWA 整包移植
- 去掉 Nolebase 等现有插件
- 目录物理重命名成 Started / CodePlugins（避免断链）

## §3 改写顺序与同步

1. 基础设施：markdownTransform、custom-block、侧栏/导航、去掉 Badge 难度  
2. 上手线：quickstart → install-source / docker → connect-qq → web-console → install-plugins  
3. 使用与概念：concepts → usage / llm / ai / advanced → FAQ  
4. 运维 / 部署：maintainer + deploy  
5. 开发：first-plugin 等按 Tutorial；architecture / API 按参考冷写  
6. 首页：hero / features / CTA  

双仓：以 Docs 仓为呈现与文风源；主仓用户向 guide 用既有 sync 对齐。本轮保持 docs 主题变更集中，不与功能代码混 PR。

## 验收（DoD）

1. 抽查四种口吻可区分：安装短、概念可跳过、教程有步骤、FAQ 是 Q-A  
2. 无标题 Badge「简单/普通/稍难」  
3. ChatPanel 只出现在合适页  
4. 产品名 Pallas-Bot；触发词「牛牛帮助」保留  

## 非目标

- 复制 GSUID 视觉品牌或目录树命名  
- 用安装页口吻「统一风格」全站  
- 本轮引入 PageInfo / UnoCSS / PWA  
