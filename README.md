# 🧠 dsh-understand-anything

简体中文 | [English](#english)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![DSH](https://img.shields.io/badge/DSH-DeepSeek%20Harness-blue.svg)](https://github.com/deepseek-ai/deepseek-harness)
[![上游](https://img.shields.io/badge/移植自-Understand--Anything-orange.svg)](https://github.com/Egonex-AI/Understand-Anything)

> **一句话：让 AI 先看懂整个代码库，再回答你的问题——生成知识图谱，聊代码、查影响、做架构分析、生成新手上手指南。**

移植自 [`Egonex-AI/Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything)（MIT），
skills / agent 层逐字保留，只适配 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的插件机制。

## ✨ 功能

- 🕸️ **交互式知识图谱** —— 扫描代码库，产出 `knowledge-graph.json`（架构、依赖、调用关系、复杂度）
- 💬 **`/understand-chat` 聊天问答** —— 基于图谱回答代码库问题，不把整个文件塞进上下文
- 🔍 **`/understand-diff` 改动影响分析** —— 当前改动影响了哪些组件、有哪些风险
- 🧭 **`/understand-onboard` 新手上手指南** —— 为新人生成项目导读
- 🏛️ **`/understand-domain` 业务领域提取** —— 从代码中识别业务领域、流程与步骤
- 📚 **`/understand-knowledge` 知识库分析** —— 分析 Karpathy 模式的 LLM wiki 知识库
- 🎨 **`/understand-figma` 设计稿分析** —— 通过 Figma API 生成设计知识图谱
- 🌐 **多语言** —— `--language zh` 生成中文摘要、标签与说明

## 📸 效果

在一个中型仓库里：

```
> /understand

  [Phase 1/7] Scanning project...
  [Phase 2/7] Analyzing files (12 batches)...
  [Phase 4/7] Assembling knowledge graph...
  ✅ Graph written to .ua/knowledge-graph.json (847 nodes, 1,204 edges)
```

然后：

```
> /understand-chat 这个项目怎么处理登录的？

  auth.ts 中的 login() 通过 authService.authenticate() 校验凭据，
  成功后在 sessionStore 建立会话，并在 middleware 里拦截未带 token 的请求……
```

## 📦 安装

```bash
dsh plugin --profile <你的 profile> add github:GongYuanCaiJi/dsh-understand-anything
```

安装时 `prepare` 会跑结构校验；首次运行 `/understand` 时，skill 会按上游流程用 pnpm
构建分析引擎（`@understand-anything/core`）。若 pnpm 拦下构建步骤，在 profile 的
`pnpm-workspace.yaml` 里把本套件加入 `allowBuilds`（本套件自带的 `pnpm-workspace.yaml`
已包含 tree-sitter 语法的 allowBuilds）。

从本地目录安装：

```bash
git clone https://github.com/GongYuanCaiJi/dsh-understand-anything.git
cd dsh-understand-anything && npm install
dsh plugin --profile <你的 profile> add .
```

> 需要 Node.js ≥ 22 与 pnpm ≥ 10（上游要求）。

## 🚀 使用

```bash
# 分析当前代码库（生成 .ua/knowledge-graph.json）
/understand

# 中文分析
/understand --language zh

# 增量更新（只重新分析改过的文件）
/understand

# 问代码库问题
/understand-chat 这个项目的架构是怎么样的？

# 分析当前改动的影响
/understand-diff

# 生成新手指南
/understand-onboard
```

分析引擎与技能文本均为上游英文原文，未做翻译（移植规则：100% 原样复制）。

## ⚠️ 没搬什么（web 应用不搬）

上游包含完整的 web 应用，dsh 插件形态承接不了——这是能力边界，不是取捨：

- **`homepage/`** 官网、**`packages/dashboard`** 交互式看板、**`packages/viewer`** 独立查看器
  —— 均**未搬入**本套件。需要看板/查看器请到
  [上游仓库](https://github.com/Egonex-AI/Understand-Anything) 获取。
- Claude Code 专属的 `hooks/`（提交后自动更新）、平台安装脚本与各平台清单未搬入。
- 逐字保真清单见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)（242 档 SHA-256 可自验）。

## 📜 License

MIT。上游 [`Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything) ©
Yuxiang Lin · Infinite Universe, Inc.；本移植 © GongYuanCaiJi（dsh port）。
如果这个项目对你有帮助，请也给上游点个 star ⭐

---

## English

[简体中文](#🧠-dsh-understand-anything)

> **One-liner: let AI understand the whole codebase before answering — generate a knowledge graph, then chat, diff-analyze, explore architecture, and onboard new members.**

A port of [`Egonex-AI/Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything)
(MIT) into a [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin.
The skills/agent layer is preserved verbatim; only the plugin mechanism is adapted to dsh.

## ✨ Features

- 🕸️ **Interactive knowledge graph** — scan a codebase into `knowledge-graph.json` (architecture, dependencies, call graphs, complexity)
- 💬 **`/understand-chat`** — answer codebase questions from the graph without dumping whole files into context
- 🔍 **`/understand-diff`** — impact analysis of your current changes
- 🧭 **`/understand-onboard`** — onboarding guides for new team members
- 🏛️ **`/understand-domain`** — extract business domains, flows, and steps
- 📚 **`/understand-knowledge`** — analyze Karpathy-pattern LLM wikis
- 🎨 **`/understand-figma`** — design knowledge graphs from Figma via the REST API
- 🌐 **Multilingual** — `--language zh` generates Chinese summaries, tags, and descriptions

## 📦 Install

```bash
dsh plugin --profile <your-profile> add github:GongYuanCaiJi/dsh-understand-anything
```

`prepare` runs structural checks on install; on first `/understand`, the skill builds the
analysis engine (`@understand-anything/core`) with pnpm, following the upstream flow. If pnpm
blocks build steps, add this package to `allowBuilds` in the profile's `pnpm-workspace.yaml`
(the bundled `pnpm-workspace.yaml` already allows the tree-sitter grammars).

Local install:

```bash
git clone https://github.com/GongYuanCaiJi/dsh-understand-anything.git
cd dsh-understand-anything && npm install
dsh plugin --profile <your-profile> add .
```

> Requires Node.js ≥ 22 and pnpm ≥ 10 (upstream requirement).

## 🚀 Usage

```bash
/understand                # analyze the current codebase → .ua/knowledge-graph.json
/understand --language zh  # Chinese analysis
/understand-chat ...       # ask questions about the codebase
/understand-diff           # analyze the impact of current changes
/understand-onboard        # generate an onboarding guide
```

The analysis engine and skill texts remain in upstream English (port rule: 100% verbatim copy).

## ⚠️ What is not ported (the web app)

The upstream ships a full web application, which a dsh plugin cannot carry — a capability
boundary, not a choice:

- **`homepage/`** (marketing site), **`packages/dashboard`** (interactive dashboard),
  **`packages/viewer`** (standalone viewer) — **not included**. Get them from the
  [upstream repository](https://github.com/Egonex-AI/Understand-Anything).
- Claude Code-specific `hooks/` (post-commit auto-update), platform install scripts, and
  platform manifests are not included.
- Verbatim-fidelity manifest: [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)
  (242 files, SHA-256 verifiable).

## 📜 License

MIT. Upstream [`Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything) ©
Yuxiang Lin · Infinite Universe, Inc.; this port © GongYuanCaiJi (dsh port).
If this project helps you, please also star the upstream ⭐
