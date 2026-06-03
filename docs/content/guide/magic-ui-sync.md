# Magic UI Sync

SparkUI can monitor MagicUI, compare component registries, open missing-component issues, and validate component-port pull requests before human review.

## Files

- `.github/workflows/watch-magic-ui.yml` runs the scheduled watcher every six hours and supports manual dispatch.
- `.github/workflows/nightly-registry-sync.yml` performs a nightly full registry refresh.
- `.github/workflows/validate-agent-pr.yml` validates component-port pull requests.
- `.github/workflows/stale-issue-cleanup.yml` closes obsolete sync issues.
- `.github/workflows/copilot-setup-steps.yml` preinstalls the workspace dependencies for GitHub Copilot Coding Agent sessions.
- `scripts/clone-magic-ui.ts` clones MagicUI with a shallow clone.
- `scripts/build-magic-ui-registry.ts` scans MagicUI component metadata.
- `scripts/build-spark-ui-registry.ts` scans local SparkUI components.
- `scripts/compare-registries.ts` writes the missing-component registry.
- `scripts/create-agent-issues.ts` opens or reuses component-port issues.
- `scripts/update-component-history.ts` tracks first-seen and latest-seen status.
- `scripts/validate-component.ts` enforces component-port validation rules.
- `scripts/normalize-repository.ts` removes duplicate generated artifacts and verifies canonical naming.
- `.ai/prompts` stores conversion, review, animation, and SparkUI standards prompts.
- `registry` stores current registries, schemas, missing components, and sync history.

## Local Commands

```bash
pnpm install
pnpm sync:magic-ui
pnpm sync:magic-ui:issues --dry-run
pnpm normalize:repository
pnpm validate:agent-pr
```

`pnpm sync:magic-ui` runs the clone, registry build, diff, history update, and repository normalization pipeline.

## Repository Permissions

Enable these GitHub Actions permissions for the repository:

- `contents: write` for committing registry updates.
- `issues: write` for opening and updating component-port issues.
- `pull-requests: read` for validation workflows.

The included workflows declare the minimum permissions they need.

## GitHub Settings

Configure the repository with these settings:

- Enable GitHub Actions for the repository.
- Enable issue creation.
- Enable GitHub Copilot Coding Agent for the repository.
- Create a repository variable named `COPILOT_AGENT_ASSIGNEE` when the assignee differs from `copilot`.
- Create a `copilot` environment when you need Copilot-specific environment variables or secrets.
- Require pull request review before merge on the default branch.
- Require `Validate Agent Pull Request` to pass before merge.
- Keep direct pushes to the default branch restricted to maintainers.

## Copilot Agent Configuration

The repository includes `.github/workflows/copilot-setup-steps.yml` so the coding agent starts with:

- Node.js 22
- pnpm 9.15.9
- `pnpm install --frozen-lockfile` already completed

Merge that workflow to the default branch before relying on agent-created issues so GitHub Copilot Coding Agent picks up the setup automatically.

## Canonical Generated Files

Repository normalization keeps these files as the single source of truth:

- `registry/magic-ui.json`
- `registry/spark-ui.json`
- `registry/missing-components.json`
- `registry/component-history.json`

## Labels

The issue script creates these labels when missing:

- `magic-ui-sync`
- `agent-generated`
- `needs-review`
- `vue-port`
- `motion-migration`

## Branches and Pull Requests

Component-port branches use:

```text
agent/component-name
```

Pull request titles use:

```text
feat(component-name): add SparkUI port
```

## Validation Rules

The validation workflow fails when:

- React imports are present.
- JSX or TSX files are present.
- Framer Motion imports are present.
- `clsx`, `class-variance-authority`, Radix, or shadcn/ui imports are present.
- Documentation is missing.
- Examples are missing.
- Focused tests are missing.
- Build, lint, typecheck, or tests fail.

When the MagicUI source uses Framer Motion, the SparkUI port must use Motion for Vue and preserve the source motion behavior.
