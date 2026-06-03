# Review a SparkUI Component Port

Review the generated component port as a SparkUI maintainer. Compare the implementation against the MagicUI source, `.ai/prompts/spark-ui-standards.md`, and `.ai/prompts/animation-rules.md`. Decide whether to approve, request changes, or reject.

## Blocking Issues (reject or request changes)

- The component is a React translation left in place rather than an idiomatic Vue 3 + TypeScript implementation.
- Advanced motion behavior was replaced with plain CSS, or interactions from the source were silently dropped.
- A forbidden dependency or pattern was introduced (React, JSX/TSX, direct `clsx`, `class-variance-authority`, Radix, shadcn/ui imports, or Framer Motion in the final code).
- Browser-only APIs are unguarded and break the SSR docs build.
- A quality gate fails (`normalize:repository`, `validate:agent-pr`, `lint`, `typecheck`, `test`, or `build`).

## Required Checks

- Visual output, props, slots, events, and interactions match the MagicUI component.
- Classes are merged with the `cn` helper from `@/lib/utils`.
- Motion behavior is preserved with Motion for Vue (`motion-v`) when the source used Framer Motion.
- The component, live preview wrapper, copy-paste source, documentation, and tests all exist at their expected paths.
- Documentation embeds a working `<demo>` block and includes a `## Props` table.
- Tests cover meaningful behavior or rendering guarantees.
- New and renamed repository artifacts use kebab-case file names.
- Repository normalization ran, and the PR body includes a `Repository Cleanup` report and the list of loaded skills.
- The PR title follows `feat(<component-name>): add SparkUI port`.
- No AI attribution or watermarks appear in any repository artifact.

## Nits (non-blocking)

- Minor naming, formatting, or comment improvements.
- Opportunities to align more closely with neighboring components.

## Decision

Approve only when all blocking issues are resolved and the required checks pass. Human approval is required before merge.
