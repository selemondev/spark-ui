# SparkUI Standards

SparkUI is a Vue 3 component library of animated UI components, built with TypeScript, TailwindCSS, and Motion for Vue (`motion-v`). The library, its demos, and its documentation all live inside the VitePress docs app under `docs/`.

This document is the canonical reference for how components, demos, documentation, and tooling are structured in this repository. Treat it as the contract every change must satisfy.

## Tech Stack

- **Framework:** Vue 3 with `<script setup lang="ts">`.
- **Language:** TypeScript (including tooling scripts in `scripts/*.ts`).
- **Styling:** TailwindCSS, composed through the `cn` helper.
- **Animation:** Motion for Vue (`motion-v`) for any Framer Motion equivalent behavior.
- **Docs:** VitePress, with live demos embedded via a custom `<demo>` block.
- **Tests:** Vitest.

## Repository Layout

| Path                                             | Purpose                                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| `docs/src/components/spark-ui/<component-name>/` | The reusable SparkUI component source.                                        |
| `docs/src/example/<component-name>/`             | Live preview wrappers rendered in the docs (the `src` of a `<demo>`).         |
| `docs/src/spark-ui-demos/<component-name>/`      | Copy-paste source shown in the docs code panel (the `srcCode` of a `<demo>`). |
| `docs/src/lib/utils.ts`                          | Shared helpers, including `cn` for class merging.                             |
| `docs/content/components/<component-name>.md`    | The component documentation page.                                             |
| `tests/`                                         | Vitest specs (`*.spec.ts`).                                                   |
| `registry/`                                      | Generated registries and JSON schemas.                                        |
| `scripts/*.ts`                                   | Sync, registry, and validation tooling.                                       |
| `.ai/prompts/`                                   | Agent prompts (this directory).                                               |
| `.agents/`                                       | Authoritative agent expertise and skills.                                     |

## Agent Expertise & Skill Loading

`.agents/` is the authoritative expertise/skills directory for this repository. It is the source of truth for implementation standards, framework conventions, design requirements, documentation requirements, and repository practices.

Before modifying, generating, renaming, deleting, or refactoring any file, an agent must:

1. Scan the entire `.agents/` directory and inventory the available skills.
2. Select every skill relevant to the task (multiple skills may apply).
3. Load those skills into the task context and follow them throughout.
4. Report the loaded skills and the reason for selecting them in the pull request.

When skills overlap, apply this priority order (highest wins):

1. Repository-specific skills.
2. These SparkUI standards.
3. Framework-specific skills.
4. General best practices.

`.agents/` must never be deleted or treated as obsolete; `normalize:repository` is configured to preserve it.

## Component Standards

- Place component source in `docs/src/components/spark-ui/<component-name>/`.
- Use `<script setup lang="ts">`.
- Declare props with a TypeScript interface and `defineProps`/`withDefaults`; avoid untyped props.
- Use Vue slots for child content instead of React-style children.
- Merge classes with the `cn` helper imported from `@/lib/utils`. Never import `clsx` or `class-variance-authority` directly in a component.
- Guard browser-only APIs (`window`, `document`, `IntersectionObserver`, etc.) inside `onMounted` or a client-side check so the SSR docs build does not fail.
- Match the naming, directory layout, and export style of nearby SparkUI components.
- Do not introduce new dependencies unless the task explicitly requires them.

## Documentation Standards

- Add the page at `docs/content/components/<component-name>.md`.
- Open with an `# H1` of the component display name and a single-sentence description.
- Embed the primary preview with the `<demo>` block, pointing `src` at the example wrapper and `srcCode` at the copy-paste source:

```md
<demo src="../../src/example/<component-name>/demo.vue" srcCode="../../src/spark-ui-demos/<component-name>/<component-name>.vue" />
```

- Provide an `## Installation` section using a `::: code-group` block that contains the full copy-paste source.
- Document additional variants under `## Examples`, each with its own `<demo>` block.
- Close with a `## Props` table describing every prop, its type, default, and description.

## Example & Demo Standards

There are two demo locations, and they are not interchangeable:

- `docs/src/example/<component-name>/demo.vue` is the **live preview wrapper**. It imports the local component, arranges layout, and wires up sample data for the rendered preview.
- `docs/src/spark-ui-demos/<component-name>/<component-name>.vue` is the **copy-paste source** shown in the code panel. It mirrors the component a consumer would paste into their own project.

Keep demos minimal but representative, and show the important variants and interaction states.

## Testing Standards

- Add focused specs under `tests/` named `<component-name>.spec.ts`.
- Assert meaningful rendering output, prop behavior, or interaction guarantees rather than implementation details.

## Naming & File Conventions

- Use kebab-case for all file and directory names, including generated registries and renamed artifacts.
- Tooling scripts are TypeScript and run directly with Node: `node scripts/<name>.ts`.
- When you rename or remove a file, update every import, route, demo reference, documentation link, and registry that points to it.

## Commit & Pull Request Conventions

- Use Conventional Commits, e.g. `feat(<component-name>): add SparkUI port`.
- The pull request body must include a `Repository Cleanup` section listing renamed files, updated imports/references, duplicates removed, and canonical files kept.
- Report the skills you loaded and why.
- Repository artifacts (code, docs, commits, metadata) must not contain AI attribution or watermarks; the repository owner is the sole author.

## Quality Gates

Run every gate locally and ensure it passes before opening a pull request:

```bash
pnpm normalize:repository
pnpm validate:agent-pr
pnpm lint
pnpm typecheck
pnpm test -- --run
pnpm build
```
