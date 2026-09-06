import type { ComponentHistory, MissingComponent } from "./types.ts";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { readJson, registryDir, writeJson } from "./registry-utils.ts";

interface GithubError extends Error {
  status?: number;
  body?: unknown;
}

interface GithubRequestOptions {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
}

interface GithubIssue {
  number: number;
  title: string;
  state: string;
  pull_request?: unknown;
}

interface GithubSearchResult {
  items?: GithubIssue[];
}

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const assignee = process.env.COPILOT_AGENT_ASSIGNEE ?? "copilot";
const dryRun = process.argv.includes("--dry-run");
const closeStaleOnly = process.argv.includes("--close-stale-only");
const apiBase = process.env.GITHUB_API_URL ?? "https://api.github.com";
const labels = ["magic-ui-sync", "agent-generated", "needs-review", "vue-port"];

if (!repository && !dryRun) throw new Error("GITHUB_REPOSITORY is required");

if (!token && !dryRun) throw new Error("GITHUB_TOKEN is required");

const [owner, repo] = (repository ?? "local/spark-ui").split("/");
const missingPath = path.join(registryDir, "missing-components.json");
const historyPath = path.join(registryDir, "component-history.json");
const missing = readJson<{ components: MissingComponent[] }>(missingPath, { components: [] });
const history = readJson<ComponentHistory>(historyPath, {
  $schema: "./component-history.schema.json",
  generatedAt: new Date().toISOString(),
  components: {},
});
const prompt = readFileSync(path.join(process.cwd(), ".ai/prompts/convert-component.md"), "utf8");
const standards = readFileSync(
  path.join(process.cwd(), ".ai/prompts/spark-ui-standards.md"),
  "utf8",
);
const animationRules = readFileSync(
  path.join(process.cwd(), ".ai/prompts/animation-rules.md"),
  "utf8",
);

async function github<T = unknown>(
  pathname: string,
  options: GithubRequestOptions = {},
): Promise<T> {
  const response = await fetch(`${apiBase}${pathname}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
  });

  if (response.status === 204) return null as T;

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = body?.message ?? response.statusText;
    const error: GithubError = new Error(
      `${options.method ?? "GET"} ${pathname} failed: ${message}`,
    );
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return body as T;
}

async function ensureLabels(): Promise<void> {
  const definitions: [string, string, string][] = [
    ["magic-ui-sync", "5319e7", "Tracks MagicUI synchronization work"],
    ["agent-generated", "8b5cf6", "Routes work to the configured coding agent"],
    ["needs-review", "f97316", "Requires human review before merge"],
    ["vue-port", "10b981", "Ports a component to Vue 3"],
    ["motion-migration", "06b6d4", "Requires Framer Motion to Motion for Vue migration"],
  ];

  for (const [name, color, description] of definitions) {
    try {
      await github(`/repos/${owner}/${repo}/labels/${encodeURIComponent(name)}`);
    } catch (error) {
      const githubError = error as GithubError;
      if (githubError.status !== 404) {
        console.warn(githubError.message);
        continue;
      }

      await github(`/repos/${owner}/${repo}/labels`, {
        method: "POST",
        body: JSON.stringify({ name, color, description }),
      });
    }
  }
}

async function findIssue(title: string): Promise<GithubIssue | null> {
  const query = encodeURIComponent(`repo:${owner}/${repo} is:issue in:title "${title}"`);
  const result = await github<GithubSearchResult>(`/search/issues?q=${query}`);
  return result.items?.[0] ?? null;
}

async function getIssue(issueNumber: number): Promise<GithubIssue> {
  return github<GithubIssue>(`/repos/${owner}/${repo}/issues/${issueNumber}`);
}

function issueBody(component: MissingComponent): string {
  const componentLabels = component.usesFramerMotion ? [...labels, "motion-migration"] : labels;

  return [
    `## Source`,
    ``,
    `- MagicUI component: \`${component.name}\``,
    `- Source path: \`${component.sourcePath}\``,
    `- Last source commit: \`${component.lastCommitHash || "unknown"}\``,
    `- Target branch: \`${component.targetBranch}\``,
    `- Pull request title: \`${component.pullRequestTitle}\``,
    `- Labels: ${componentLabels.map((label) => `\`${label}\``).join(", ")}`,
    ``,
    `## Requirements`,
    ``,
    ...component.requirements.map((requirement) => `- ${requirement}`),
    ``,
    `## Acceptance Criteria`,
    ``,
    `- Vue component is added under \`docs/src/components/spark-ui\`.`,
    `- Demo/example files are added under \`docs/src/example\` or \`docs/src/spark-ui-demos\`.`,
    `- Documentation is added under \`docs/content/components\`.`,
    `- Focused tests are added or updated.`,
    `- \`pnpm validate:agent-pr\`, \`pnpm lint\`, \`pnpm typecheck\`, \`pnpm test -- --run\`, and \`pnpm build\` pass.`,
    `- \`pnpm normalize:repository\` runs before the pull request is opened.`,
    `- Human review is required before merge.`,
    ``,
    `## Pull Request Requirements`,
    ``,
    `- The pull request body must include a \`Repository Cleanup\` section.`,
    `- The cleanup report must list renamed files, updated imports/references, duplicates removed, and the canonical files kept.`,
    ``,
    `## Copilot Coding Agent Prompt`,
    ``,
    prompt.trim(),
    ``,
    `## SparkUI Standards`,
    ``,
    standards.trim(),
    ``,
    `## Animation Rules`,
    ``,
    animationRules.trim(),
  ].join("\n");
}

async function assignAgent(issueNumber: number): Promise<void> {
  try {
    await github(`/repos/${owner}/${repo}/issues/${issueNumber}/assignees`, {
      method: "POST",
      body: JSON.stringify({ assignees: [assignee] }),
    });
  } catch (error) {
    const githubError = error as GithubError;
    await github(`/repos/${owner}/${repo}/issues/${issueNumber}/comments`, {
      method: "POST",
      body: JSON.stringify({
        body: `Automatic assignment to \`${assignee}\` failed. Confirm Copilot Coding Agent is enabled for this repository and assign the issue to Copilot manually if required.\n\n${githubError.message}`,
      }),
    });
  }
}

async function closeStaleIssues(): Promise<void> {
  const activeTitles = new Set(missing.components.map((component) => component.issueTitle));
  const query = encodeURIComponent(
    `repo:${owner}/${repo} is:issue is:open label:agent-generated (label:magic-ui-sync OR label:magicui-sync)`,
  );
  const result = await github<GithubSearchResult>(`/search/issues?q=${query}&per_page=100`);

  for (const issue of result.items ?? []) {
    if (activeTitles.has(issue.title)) continue;

    await github(`/repos/${owner}/${repo}/issues/${issue.number}`, {
      method: "PATCH",
      body: JSON.stringify({
        state: "closed",
        state_reason: "not_planned",
      }),
    });
    await github(`/repos/${owner}/${repo}/issues/${issue.number}/comments`, {
      method: "POST",
      body: JSON.stringify({
        body: "Closed automatically because this component is no longer missing from the SparkUI registry.",
      }),
    });
  }
}

async function existingIssueForComponent(component: MissingComponent): Promise<GithubIssue | null> {
  const trackedIssueNumber = history.components[component.slug]?.issueNumber;

  if (trackedIssueNumber) {
    try {
      const issue = await getIssue(trackedIssueNumber);
      if (!issue.pull_request) return issue;
    } catch (error) {
      const githubError = error as GithubError;
      if (githubError.status !== 404) console.warn(githubError.message);
    }
  }

  return findIssue(component.issueTitle);
}

if (dryRun) {
  console.log(`Dry run: would process ${missing.components.length} missing components`);
  process.exit(0);
}

await ensureLabels();

if (closeStaleOnly) {
  await closeStaleIssues();
  process.exit(0);
}

for (const component of missing.components) {
  const existing = await existingIssueForComponent(component);
  if (existing) {
    const componentLabels = component.usesFramerMotion ? [...labels, "motion-migration"] : labels;

    if (existing.state !== "open") {
      await github(`/repos/${owner}/${repo}/issues/${existing.number}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: component.issueTitle,
          body: issueBody(component),
          labels: componentLabels,
          state: "open",
        }),
      });
    }

    await assignAgent(existing.number);
    history.components[component.slug] = {
      ...history.components[component.slug],
      name: component.name,
      slug: component.slug,
      sourcePath: component.sourcePath,
      latestSeenAt: new Date().toISOString(),
      status: "issue-created",
      issueNumber: existing.number,
    };
    continue;
  }

  const componentLabels = component.usesFramerMotion ? [...labels, "motion-migration"] : labels;
  const issue = await github<GithubIssue>(`/repos/${owner}/${repo}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title: component.issueTitle,
      body: issueBody(component),
      labels: componentLabels,
    }),
  });

  await assignAgent(issue.number);

  history.components[component.slug] = {
    ...history.components[component.slug],
    name: component.name,
    slug: component.slug,
    sourcePath: component.sourcePath,
    firstSeenAt: history.components[component.slug]?.firstSeenAt ?? new Date().toISOString(),
    latestSeenAt: new Date().toISOString(),
    status: "issue-created",
    issueNumber: issue.number,
    mergedPullRequest: history.components[component.slug]?.mergedPullRequest ?? null,
  };
}

history.generatedAt = new Date().toISOString();
history.$schema = "./component-history.schema.json";
writeJson(historyPath, history);
console.log(`Processed ${missing.components.length} MagicUI agent issues`);
