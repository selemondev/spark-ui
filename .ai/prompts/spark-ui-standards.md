# SparkUI Standards

SparkUI is a Vue 3 component library using TypeScript and TailwindCSS.

## Agent Expertise & Skill Loading

`.agents/` is the authoritative expertise/skills directory for this repository. It is the source of truth for implementation standards, framework conventions, design requirements, documentation requirements, and repository practices.

Before modifying, generating, renaming, deleting, or refactoring any file, an agent must:

1. Scan the entire `.agents/` directory and inventory the available skills.
2. Select every skill relevant to the task (multiple skills may apply).
3. Load those skills into the task context and follow them throughout.
4. Report the loaded skills and the reason for selecting them in the PR.

When skills overlap, apply this priority order (highest wins): repository-specific skills, then these SparkUI standards, then framework-specific skills, then general best practices.

`.agents/` must never be deleted or treated as obsolete; `normalize:repository` is configured to preserve it.

## Component Standards

- Place source components in `docs/src/components/spark-ui/<component-name>`.
- Use `<script setup lang="ts">`.
- Prefer explicit props with TypeScript interfaces.
- Use Vue slots for child content.
- Keep browser-only code inside lifecycle hooks or guarded branches.
- Match naming, directory layout, and export style used by nearby SparkUI components.
- Use kebab-case for repository file names, including generated registries and renamed artifacts.
- Avoid introducing new dependencies unless the issue explicitly requires them.

## Documentation Standards

- Add documentation in `docs/content/components/<component-name>.md`.
- Include installation or usage notes consistent with existing component pages.
- Include a demo reference that VitePress can render.

## Example Standards

- Add examples in `docs/src/example/<component-name>` or `docs/src/spark-ui-demos/<component-name>`.
- Keep examples minimal but representative.
- Show important variants and interaction states.

## Quality Gates

- `pnpm normalize:repository`.
- `pnpm validate:agent-pr`.
- `pnpm lint`.
- `pnpm typecheck`.
- `pnpm test -- --run`.
- `pnpm build`.
