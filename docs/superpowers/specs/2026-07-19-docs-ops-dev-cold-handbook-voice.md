# Docs 运维 / 开发文风：冷手册 + GSUID

日期：2026-07-19  
状态：已批准（1+3）  
仓库：`Pallas-Bot-Docs`（呈现源）；主仓 `Pallas-Bot/docs/` 对齐  
前置：[GSUID 全站文风重校准](2026-07-19-docs-gsuid-voice-recalibration-design.md)

## 决策

| 项 | 选择 |
| --- | --- |
| 口吻 | **1 冷手册** + **3 对标 GSUID** Secure / DockerCore / CookBook |
| 范围 | `maintainer/**`、`deploy/**`、`developer/**`、仍挂侧栏的 `develop/**` |
| 不改 | `guide/`（上手线已校准）、`noobook/` |

## 页型 → 写法

| 页型 | 对标 | 写法 |
| --- | --- | --- |
| 运维安装 / 排障 / 部署 | Secure、DockerCore | 编号步骤、命令块、参数表；tip/warning 只标真约束 |
| 运维参考（cli/config/api/glossary） | 冷参考 | 表 + 键/命令，少铺垫 |
| 开发教程（first-plugin、Cookbook） | CookBook | 编号叙事 + 代码 |
| 架构 / Internal·Platform API | 冷事实 | 陈述边界与表；不说教 |

## 删改规则

| 动作 | 例 |
| --- | --- |
| 删自我划界 | 「只看…不讲…」「不是百科」「非第三条主线」「本页不展开」 |
| 删说教开场 | 「先别慌」「九成不是」；「先分清 / 先记住」→ 直接标题或表 |
| 弱化合同腔 | 「治理面合同」→「治理面」；「目录合同」→「目录结构」 |
| 保留 | checklist、排障 mermaid、命令块、失败分支、真约束的 MUST/禁止 |

## 落地顺序

1. 样板：`operate/webui`、`operate/llm-and-ai`、`architecture/plugin-governance`、`install/protocol`
2. 批量：`maintainer/**` → `deploy/**` → `developer/**` → `develop/**`
3. 同步主仓对应路径

## 验收

1. 运维开篇无「先分清 / 先别慌 / 只看不讲」类元话
2. 架构页无「合同」说教开场；约束用表或 MUST 陈述
3. tip/warning 仅承载路径、安全、必选依赖等真约束
4. Docs 与主仓镜像一致

## 非目标

- 不改 guide 上手线口吻
- 不移植 GSUID 红皮 / Badge / PageInfo
- 不重排侧栏目录树
