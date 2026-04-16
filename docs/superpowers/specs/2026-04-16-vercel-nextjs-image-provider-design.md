# AI Studio Demo To Vercel App Design

## Goal

把当前 AI Studio 导出的单文件 Vite Demo 改造成一个可部署到 Vercel 的完整 React 工程，在尽量保留现有页面视觉、配方交互、酒卡展示和分享体验的前提下，把前端直连 Gemini 的实现替换为服务端统一调度的生图链路。

## Current State

- 当前项目是一个轻量 Vite + React + TypeScript 页面。
- 绝大部分逻辑集中在 `src/App.tsx`。
- 生图和文案生成都直接在浏览器里调用 Gemini。
- 项目还没有安装依赖，不能作为一个完整工程直接构建和部署。
- 目前没有服务端边界、缓存、错误处理、健康检查、分享持久化或 provider 抽象层。

## Product Direction

优先级排序如下：

1. 快速迁移到可部署、可维护的工程结构。
2. 尽量保住当前 AI Studio Demo 的页面体验和主要交互。
3. 降低 Gemini 成本，生图改用其他供应商。
4. 功能不能因为供应商切换而直接失效。

## Recommended Architecture

推荐采用 `Next.js App Router` 单仓全栈结构：

- 前端页面、交互和样式放在 `src/app`、`src/components`、`src/features`。
- 服务端 API 放在 `src/app/api`。
- 生图调用只允许发生在服务端。
- 用统一的 image provider 接口封装不同供应商。
- 主生图源使用 ModelScope。
- Wan 2.7 作为兜底 provider。
- NVIDIA 仅保留为实验开关，不作为默认生产路径。

## Why Next.js

- 迁移到 Vercel 最顺滑。
- Route Handlers 可以天然承载服务端 AI 代理逻辑。
- 环境变量可以严格留在服务端。
- 后续新增分享页、历史页、收藏页时不需要再次换架构。
- 对当前项目而言，Next.js 的收益明显高于继续维持 Vite + 前后端双进程。

## Proposed Module Boundaries

### UI Layer

- `src/app/page.tsx`: 首页组合。
- `src/app/workshop/page.tsx`: 调酒工作台页面。
- `src/app/about/page.tsx`: 关于页。
- `src/components/landing/*`: Hero、Features、Testimonials、FAQ、CTA。
- `src/components/workshop/*`: 原料面板、预览酒卡、配方面板、分享弹窗。
- `src/components/ui/*`: Button、Card、Modal、Tag 等通用组件。

### Business Layer

- `src/features/workshop/types.ts`: 配方、生成请求、生成结果等类型。
- `src/features/workshop/state.ts`: 选择器和本地状态。
- `src/lib/cocktail/constants.ts`: 基酒、辅料、装饰、杯具配置。
- `src/lib/cocktail/random.ts`: 随机灵感逻辑。

### Prompt Layer

- `src/lib/prompt/buildVisualIntent.ts`: 把配方转成结构化视觉意图。
- `src/lib/prompt/compileImagePrompt.ts`: 把视觉意图转成不同模型更稳的 prompt。
- `src/lib/prompt/presets.ts`: 风格预设，例如 `luxury_poster`、`editorial_catalog`。

### Provider Layer

- `src/lib/providers/image/types.ts`: provider 统一接口和返回结构。
- `src/lib/providers/image/modelscope.ts`: 默认 provider。
- `src/lib/providers/image/wan.ts`: 兜底 provider。
- `src/lib/providers/image/nvidia.ts`: 实验 provider，默认关闭。
- `src/lib/providers/image/index.ts`: provider 选择和 fallback 逻辑。

### Server Utilities

- `src/lib/server/env.ts`: 读取并校验环境变量。
- `src/lib/server/cache.ts`: 基于 recipe hash 的内存缓存。
- `src/lib/server/retry.ts`: 超时、重试、fallback。
- `src/lib/server/errors.ts`: 统一错误定义和响应转换。

## Data Flow

1. 用户在工作台选择基酒、辅料、装饰和杯具。
2. 前端生成结构化 `RecipeSpec` 并提交到 `/api/generate/image`。
3. 服务端把 `RecipeSpec` 转成 `VisualIntent`。
4. 服务端把 `VisualIntent` 编译成英文摄影 prompt 和约束 prompt。
5. 服务端优先调用 `ModelScopeImageProvider`。
6. 如果超时、429 或 provider 返回异常，切到 `WanImageProvider`。
7. 服务端返回统一格式的 `GenerationResult`。
8. 前端更新酒卡、分享弹窗和状态栏。

## Prompt Strategy

不要继续维持当前“一行中文 prompt 直接打模型”的方式，建议改成三段式 prompt：

- 主体段：酒体、杯具、装饰、液体质感和颜色。
- 摄影段：commercial beverage poster、studio lighting、premium product shot、clean background、glossy highlights、condensation。
- 约束段：no duplicate garnish、no deformed glass、no cropped rim、no messy background。

这样做的目的不是追求抽象的“更高级 prompt”，而是为了在换供应商后仍然保住输出稳定性。

## Availability Strategy

免费或免费额度 provider 不适合当作单点强依赖，所以系统需要原生具备可用性措施：

- recipe hash 去重缓存。
- 单请求超时控制。
- 默认 provider 失败后自动 fallback。
- 健康检查接口。
- 前端明确失败提示。
- 失败后保留上一次成功生成的结果，不让页面直接空白。

## Functional Compatibility

本次迁移默认保留以下功能：

- 首页和关于页展示。
- 工作台原料选择。
- 随机灵感。
- 自动触发生图。
- 酒名和描述展示。
- 分享弹窗。
- 复制链接按钮。

以下功能改为“工程化兼容实现”：

- 生图从前端直连改为服务端代理。
- 文案生成从 Gemini 改为模板或低成本文本 provider。
- 分享链接先保留当前页面分享，不在第一阶段引入数据库持久化。

## Risks

- 免费 provider 的稳定性和风格一致性不能等同于 Gemini。
- ModelScope 或其他第三方接口的返回格式可能变化，需要 provider 层隔离。
- Wan 作为兜底会引入少量成本，但比全量 Gemini 低很多。
- 如果第一阶段同时追求“零成本”和“完全复刻 Gemini 观感”，目标不现实。

## Non-Goals In Phase 1

- 不做用户系统。
- 不做数据库持久化。
- 不做真正的分享详情页。
- 不做图片 CDN 持久存储。
- 不做复杂任务队列。

## Phase 1 Success Criteria

- 项目可以在本地和 Vercel 构建部署。
- 页面视觉与当前 Demo 高度相似。
- 工作台所有交互可用。
- 生图走服务端，前端不再暴露任何模型密钥。
- 默认 provider 可生成图片，失败时能够自动兜底。
- 用户看到的是明确的生成状态和错误状态，而不是静默失败。
