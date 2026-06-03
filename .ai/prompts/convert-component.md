# Convert MagicUI React Component to SparkUI Vue

You are GitHub Copilot Coding Agent working in the SparkUI repository.

Create a SparkUI implementation of the referenced MagicUI component. Do not call external model APIs. Work only from the source path, repository files, and the issue requirements.

## Required Output

- Vue 3 component code under `docs/src/components/spark-ui`.
- Demo or example code under `docs/src/example` or `docs/src/spark-ui-demos`.
- Documentation under `docs/content/components`.
- Focused tests where the component behavior can be asserted.
- A branch named `agent/component-name`.
- A pull request titled `feat(component-name): add SparkUI port`.
- A pull request body containing a `Repository Cleanup` section with renamed files, updated imports/references, duplicates removed, and canonical files kept.

## Conversion Rules

- Use `<script setup lang="ts">`.
- Preserve the public behavior, props, slots, visual output, and interaction model of the MagicUI source.
- Use TailwindCSS utilities in the style already used by SparkUI.
- Use local SparkUI utilities from `docs/src/lib/utils.ts` when class merging is needed.
- Keep component names and directories consistent with existing SparkUI component names.
- Use kebab-case file names for any new or renamed repository artifacts.
- Use Vue slots instead of React children.
- Use Vue refs, computed values, watchers, and lifecycle hooks instead of React hooks.
- Use browser APIs carefully and guard server-side rendering sensitive code.

## Forbidden

- React.
- JSX or TSX.
- `clsx`.
- `class-variance-authority`.
- Radix packages.
- shadcn/ui imports.
- Framer Motion in the final SparkUI code.

## Validation

Before opening the PR, run:

```bash
pnpm normalize:repository
pnpm validate:agent-pr
pnpm lint
pnpm typecheck
pnpm test -- --run
pnpm build
```
