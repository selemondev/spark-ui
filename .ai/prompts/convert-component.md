# Convert a MagicUI React Component to SparkUI (Vue)

You are an automated coding agent working inside the SparkUI repository. Your task is to port the referenced MagicUI React component to an idiomatic SparkUI Vue 3 component, with demos, documentation, and tests.

Work only from the MagicUI source path, the existing repository files, and the issue requirements. Do not call external model APIs or fetch code from the internet.

## Before You Start

1. Load the relevant skills from `.agents/` (Vue, TypeScript, Motion, VitePress, etc.) and follow them.
2. Read `.ai/prompts/spark-ui-standards.md` for repository conventions and `.ai/prompts/animation-rules.md` if the source animates.
3. Open a similar existing component under `docs/src/components/spark-ui/` and mirror its structure, props style, and demo wiring.

## Deliverables

Create each of the following, using the exact paths and kebab-case names:

- **Component:** `docs/src/components/spark-ui/<component-name>/<component-name>.vue` (plus any sub-components).
- **Live preview wrapper:** `docs/src/example/<component-name>/demo.vue`.
- **Copy-paste source:** `docs/src/spark-ui-demos/<component-name>/<component-name>.vue`.
- **Documentation:** `docs/content/components/<component-name>.md`, embedding the preview with a `<demo>` block, an `## Installation` code group, any extra `## Examples`, and a `## Props` table.
- **Tests:** `tests/<component-name>.spec.ts` covering meaningful behavior or rendering.
- **Branch:** `agent/<component-name>`.
- **Pull request title:** `feat(<component-name>): add SparkUI port`.
- **Pull request body:** must contain a `Repository Cleanup` section (renamed files, updated imports/references, duplicates removed, canonical files kept) and the list of skills you loaded.

## Workflow

1. Analyze the MagicUI source: its public props, slots/children, events, visual output, and interaction model.
2. Implement the Vue component with `<script setup lang="ts">` and typed props.
3. Build the live preview wrapper and the copy-paste source (see the example vs. demo distinction in the standards).
4. Write the documentation page and the focused tests.
5. Run every quality gate and fix all failures before opening the PR.

## React to Vue Mapping

- Translate JSX markup into a Vue `<template>`.
- Replace React children with Vue slots.
- Replace React hooks with Vue equivalents: `useState` to `ref`/`reactive`, `useMemo` to `computed`, `useEffect` to `watch`/`watchEffect`/lifecycle hooks, `useRef` to template refs.
- Merge classes with the `cn` helper from `@/lib/utils` instead of `clsx` or `cva`.
- Migrate Framer Motion behavior to Motion for Vue (`motion-v`) following `.ai/prompts/animation-rules.md`.
- Guard browser-only APIs so the SSR docs build does not break.

## Forbidden

- React, JSX, or TSX.
- Direct `clsx` imports (use the `cn` helper instead).
- `class-variance-authority`.
- Radix packages.
- `@/components/ui/*` (shadcn/ui) imports.
- Framer Motion in the final SparkUI code (use `motion-v`).

## Validation

Run all gates before opening the pull request:

```bash
pnpm normalize:repository
pnpm validate:agent-pr
pnpm lint
pnpm typecheck
pnpm test -- --run
pnpm build
```
