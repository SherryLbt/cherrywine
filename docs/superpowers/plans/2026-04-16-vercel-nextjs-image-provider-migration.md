# Vercel Next.js Image Provider Migration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将当前 AI Studio 导出的 Vite Demo 迁移为一个可部署到 Vercel 的 Next.js 工程，并把生图链路改造成服务端 provider 架构，默认走 ModelScope，失败时回退到 Wan。

**Architecture:** 保留现有页面视觉和核心交互，把 `src/App.tsx` 中的大文件逻辑拆分为页面、组件、业务、prompt 和 provider 五层。AI 请求全部下沉到 Next.js Route Handlers，通过统一 provider 接口实现低成本生图和兜底。

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Zod, Vercel Route Handlers, ModelScope API-Inference, Alibaba Wan 2.7 API

---

## File Structure

### Create

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/workshop/page.tsx`
- `src/app/api/generate/image/route.ts`
- `src/app/api/generate/text/route.ts`
- `src/app/api/health/route.ts`
- `src/components/landing/Hero.tsx`
- `src/components/landing/Features.tsx`
- `src/components/landing/Testimonials.tsx`
- `src/components/landing/FAQ.tsx`
- `src/components/landing/CTA.tsx`
- `src/components/shared/Navbar.tsx`
- `src/components/shared/Footer.tsx`
- `src/components/workshop/IngredientPanel.tsx`
- `src/components/workshop/PreviewCard.tsx`
- `src/components/workshop/RecipePanel.tsx`
- `src/components/workshop/ShareModal.tsx`
- `src/features/workshop/types.ts`
- `src/features/workshop/state.ts`
- `src/lib/cocktail/constants.ts`
- `src/lib/cocktail/random.ts`
- `src/lib/prompt/buildVisualIntent.ts`
- `src/lib/prompt/compileImagePrompt.ts`
- `src/lib/prompt/presets.ts`
- `src/lib/providers/image/types.ts`
- `src/lib/providers/image/modelscope.ts`
- `src/lib/providers/image/wan.ts`
- `src/lib/providers/image/nvidia.ts`
- `src/lib/providers/image/index.ts`
- `src/lib/providers/text/types.ts`
- `src/lib/providers/text/modelscope.ts`
- `src/lib/server/env.ts`
- `src/lib/server/cache.ts`
- `src/lib/server/retry.ts`
- `src/lib/server/errors.ts`
- `src/lib/server/hash.ts`
- `next.config.ts`
- `postcss.config.mjs`
- `.env.local.example`
- `vercel.json`

### Modify

- `package.json`
- `README.md`
- `src/index.css`

### Remove Or Archive After Migration

- `src/App.tsx`
- `src/main.tsx`
- `index.html`
- `vite.config.ts`

## Chunk 1: Create A Deployable Next.js Skeleton

### Task 1: Replace Vite Runtime With Next.js Runtime

**Files:**
- Create: `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`
- Modify: `package.json`, `README.md`

- [ ] **Step 1: Update runtime dependencies and scripts**

Replace Vite-centric scripts with:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 2: Add Next.js configuration**

Create `next.config.ts` with a minimal config:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 3: Create the app shell**

Create `src/app/layout.tsx` and import global CSS so the whole site shares the same theme tokens and fonts.

- [ ] **Step 4: Rebuild the landing page in `src/app/page.tsx`**

Compose the page out of extracted landing components instead of a giant view switch.

- [ ] **Step 5: Run the app shell build**

Run: `npm run build`  
Expected: Next.js build reaches the routing phase without Vite-related entrypoint errors.

- [ ] **Step 6: Commit**

```bash
git add package.json README.md next.config.ts src/app
git commit -m "chore: migrate runtime from vite to next"
```

### Task 2: Preserve Global Theme And Base Styles

**Files:**
- Modify: `src/index.css`
- Create: `postcss.config.mjs`

- [ ] **Step 1: Move current theme tokens unchanged**

Keep the existing palette, fonts and component utility classes so the visual style stays familiar.

- [ ] **Step 2: Remove Vite-specific assumptions**

Ensure the global stylesheet is safe for Next.js import from `layout.tsx`.

- [ ] **Step 3: Verify fonts and theme load**

Run: `npm run dev`  
Expected: Navbar, backgrounds, headline fonts and glass panel styles match the current demo closely.

- [ ] **Step 4: Commit**

```bash
git add src/index.css postcss.config.mjs
git commit -m "style: preserve existing visual theme in next app"
```

## Chunk 2: Split The Monolithic App Into Maintainable UI Modules

### Task 3: Extract Landing Components

**Files:**
- Create: `src/components/landing/Hero.tsx`, `Features.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `CTA.tsx`
- Create: `src/components/shared/Navbar.tsx`, `Footer.tsx`
- Modify: `src/app/page.tsx`, `src/app/about/page.tsx`

- [ ] **Step 1: Copy each landing section into its own file**

Each component should receive only the props it needs, for example:

```ts
type HeroProps = {
  onStartWorkshop?: () => void;
};
```

- [ ] **Step 2: Move navigation state from view switching to route navigation**

Replace the old `view` state with real Next.js navigation links to `/`, `/about`, `/workshop`.

- [ ] **Step 3: Recreate the about page**

Create `src/app/about/page.tsx` and move the current content there.

- [ ] **Step 4: Verify route navigation**

Run: `npm run dev`  
Expected: `/`, `/about` and `/workshop` all render without relying on a client-side view enum.

- [ ] **Step 5: Commit**

```bash
git add src/components/landing src/components/shared src/app/page.tsx src/app/about/page.tsx
git commit -m "refactor: split landing and shared layout components"
```

### Task 4: Extract Workshop UI And Domain Types

**Files:**
- Create: `src/components/workshop/IngredientPanel.tsx`, `PreviewCard.tsx`, `RecipePanel.tsx`, `ShareModal.tsx`
- Create: `src/features/workshop/types.ts`, `state.ts`
- Create: `src/lib/cocktail/constants.ts`, `random.ts`
- Create: `src/app/workshop/page.tsx`

- [ ] **Step 1: Move recipe constants into `src/lib/cocktail/constants.ts`**

Export `baseMap`, `mixerMap`, `garnishMap`, `glasswareMap` and keep labels consistent.

- [ ] **Step 2: Define domain types**

Add types like:

```ts
export type RecipeSpec = {
  base: string | null;
  mixers: string[];
  garnishes: string[];
  glassware: string | null;
};

export type GenerationResult = {
  imageUrl: string | null;
  cocktailName: string;
  cocktailDesc: string;
  provider: string;
  model: string;
  cacheHit: boolean;
};
```

- [ ] **Step 3: Extract the workshop view into reusable components**

Keep the current layout, but pass data via typed props instead of reading everything from one file.

- [ ] **Step 4: Fix the current `sort()` mutation bug**

When building a stable seed, always copy arrays first:

```ts
const stableMixers = [...mixers].sort();
const stableGarnishes = [...garnishes].sort();
```

- [ ] **Step 5: Verify workshop behavior**

Run: `npm run dev`  
Expected: ingredient selection, random inspiration, preview card and share modal still behave like the original demo.

- [ ] **Step 6: Commit**

```bash
git add src/components/workshop src/features/workshop src/lib/cocktail src/app/workshop/page.tsx
git commit -m "refactor: split workshop into maintainable modules"
```

## Chunk 3: Introduce Provider-Based Image Generation

### Task 5: Build Prompt And Intent Modules

**Files:**
- Create: `src/lib/prompt/buildVisualIntent.ts`, `compileImagePrompt.ts`, `presets.ts`
- Test: `tests/prompt/buildVisualIntent.test.ts`, `tests/prompt/compileImagePrompt.test.ts`

- [ ] **Step 1: Define a visual intent type**

Capture the data the image model actually needs:

```ts
export type VisualIntent = {
  subject: string;
  glassware: string;
  garnishes: string[];
  liquidColor: string;
  stylePreset: 'luxury_poster';
};
```

- [ ] **Step 2: Compile an English prompt package**

Return:

```ts
export type PromptPackage = {
  positive: string;
  negative: string;
  aspectRatio: '4:5';
  seed?: number;
};
```

- [ ] **Step 3: Write prompt tests before implementation**

Example assertion:

```ts
expect(prompt.positive).toContain('premium beverage poster');
expect(prompt.negative).toContain('no deformed glass');
```

- [ ] **Step 4: Run prompt tests**

Run: `npm run test -- tests/prompt`  
Expected: prompt builder tests pass and prompt output is deterministic for the same recipe.

- [ ] **Step 5: Commit**

```bash
git add src/lib/prompt tests/prompt
git commit -m "feat: add structured prompt compilation"
```

### Task 6: Implement Image Provider Abstraction

**Files:**
- Create: `src/lib/providers/image/types.ts`, `modelscope.ts`, `wan.ts`, `nvidia.ts`, `index.ts`
- Create: `src/lib/server/env.ts`, `cache.ts`, `retry.ts`, `errors.ts`, `hash.ts`
- Test: `tests/providers/image/*.test.ts`

- [ ] **Step 1: Define the provider interface**

Use one consistent contract:

```ts
export interface ImageProvider {
  name: string;
  generate(input: PromptPackage): Promise<GenerationResult>;
}
```

- [ ] **Step 2: Implement `ModelScopeImageProvider`**

Use server-side token auth and normalize the provider response into `GenerationResult`.

- [ ] **Step 3: Implement `WanImageProvider`**

Support asynchronous submit + poll until completion or timeout.

- [ ] **Step 4: Implement fallback orchestration**

`src/lib/providers/image/index.ts` should:

1. hash the request
2. read cache
3. try ModelScope
4. if retryable failure, try Wan
5. return normalized result

- [ ] **Step 5: Add server-side environment validation**

Validate required env vars at boot with clear errors.

- [ ] **Step 6: Add provider tests**

Mock upstream responses and assert:

- cache hit skips provider calls
- retryable ModelScope error falls back to Wan
- non-retryable errors are surfaced cleanly

- [ ] **Step 7: Run provider tests**

Run: `npm run test -- tests/providers/image`  
Expected: fallback and normalization logic pass.

- [ ] **Step 8: Commit**

```bash
git add src/lib/providers src/lib/server tests/providers/image
git commit -m "feat: add image provider abstraction with fallback"
```

### Task 7: Add Next.js API Routes

**Files:**
- Create: `src/app/api/generate/image/route.ts`, `src/app/api/generate/text/route.ts`, `src/app/api/health/route.ts`
- Test: `tests/api/generate-image.test.ts`, `tests/api/health.test.ts`

- [ ] **Step 1: Add request validation with Zod**

Validate the workshop payload before any provider call.

- [ ] **Step 2: Build `/api/generate/image`**

Route responsibilities:

- parse request
- build visual intent
- compile prompt
- call orchestrator
- return normalized JSON

- [ ] **Step 3: Build `/api/generate/text`**

Phase 1 can return templated text if you want guaranteed availability.

- [ ] **Step 4: Build `/api/health`**

Return active provider configuration and whether required env vars are present.

- [ ] **Step 5: Add route tests**

Run: `npm run test -- tests/api`  
Expected: valid request succeeds, invalid request returns 400, health route returns provider status.

- [ ] **Step 6: Commit**

```bash
git add src/app/api tests/api
git commit -m "feat: expose image and health api routes"
```

## Chunk 4: Connect The Frontend To The New APIs

### Task 8: Replace Client-Side Gemini Calls

**Files:**
- Modify: `src/app/workshop/page.tsx`, `src/components/workshop/PreviewCard.tsx`, `src/components/workshop/ShareModal.tsx`
- Test: `tests/workshop/workshop-page.test.tsx`

- [ ] **Step 1: Remove `@google/genai` from the client bundle**

Delete all browser-side model calls and loading logic tied to Gemini.

- [ ] **Step 2: Add client fetch calls to `/api/generate/image` and `/api/generate/text`**

Use one orchestrated function per generation attempt:

```ts
const res = await fetch('/api/generate/image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

- [ ] **Step 3: Preserve the current loading behavior**

Keep separate image/text loading states so the card still feels alive while content arrives.

- [ ] **Step 4: Add user-facing error states**

Show a clear error message and keep the last successful result visible if a new generation fails.

- [ ] **Step 5: Add UI tests**

Run: `npm run test -- tests/workshop/workshop-page.test.tsx`  
Expected: loading, success and failure states all render correctly.

- [ ] **Step 6: Commit**

```bash
git add src/app/workshop/page.tsx src/components/workshop tests/workshop
git commit -m "feat: connect workshop ui to server generation routes"
```

### Task 9: Add Deployment And Operations Files

**Files:**
- Create: `.env.local.example`, `vercel.json`
- Modify: `README.md`

- [ ] **Step 1: Document environment variables**

Include:

```env
MODELSCOPE_API_KEY=
WAN_API_KEY=
IMAGE_PROVIDER_PRIMARY=modelscope
IMAGE_PROVIDER_FALLBACK=wan
TEXT_PROVIDER=template
```

- [ ] **Step 2: Add Vercel runtime config**

Configure route runtime and duration only where needed.

- [ ] **Step 3: Update deployment documentation**

Document local setup, Vercel env vars and smoke test steps.

- [ ] **Step 4: Run production build**

Run: `npm run build`  
Expected: app builds successfully with Next.js and all route handlers compiled.

- [ ] **Step 5: Commit**

```bash
git add .env.local.example vercel.json README.md
git commit -m "docs: add deployment and environment setup"
```

## Chunk 5: Final Verification

### Task 10: Run End-To-End Smoke Tests

**Files:**
- Test: `tests/e2e/workshop.spec.ts`

- [ ] **Step 1: Cover the primary happy path**

Scenario:

1. open `/workshop`
2. select one base
3. select mixers
4. select garnishes
5. select glassware
6. wait for image result
7. assert card and share modal update

- [ ] **Step 2: Cover provider failure fallback**

Mock the primary provider as unavailable and assert the UI still receives a valid result.

- [ ] **Step 3: Cover API failure**

Assert the UI shows a human-readable message instead of silently failing.

- [ ] **Step 4: Run smoke suite**

Run: `npm run test:e2e`  
Expected: happy path, fallback path and failure messaging all pass.

- [ ] **Step 5: Final production verification**

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Expected:

- no type errors
- no blocking lint failures
- production build succeeds

- [ ] **Step 6: Commit**

```bash
git add tests/e2e
git commit -m "test: add end-to-end verification for deployment flow"
```
