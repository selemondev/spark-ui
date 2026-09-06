import type { ComponentHistory, ComponentRegistry } from "./types.ts";
import path from "node:path";
import { readJson, registryDir, writeJson } from "./registry-utils.ts";

const now = new Date().toISOString();
const historyPath = path.join(registryDir, "component-history.json");
const history = readJson<ComponentHistory>(historyPath, {
  $schema: "./component-history.schema.json",
  generatedAt: now,
  components: {},
});
const missing = readJson<ComponentRegistry>(path.join(registryDir, "missing-components.json"), {
  components: [],
});
const sparkui = readJson<ComponentRegistry>(path.join(registryDir, "spark-ui.json"), {
  components: [],
});
const sparkSlugs = new Set(sparkui.components.map((component) => component.slug));
const missingSlugs = new Set(missing.components.map((component) => component.slug));

for (const component of missing.components) {
  const current = history.components[component.slug] ?? {
    name: component.name,
    slug: component.slug,
    firstSeenAt: now,
    issueNumber: null,
    mergedPullRequest: null,
  };

  history.components[component.slug] = {
    ...current,
    name: component.name,
    sourcePath: component.sourcePath,
    latestSeenAt: now,
    status: current.status === "issue-created" ? "issue-created" : "missing",
  };
}

for (const [slug, component] of Object.entries(history.components)) {
  if (!missingSlugs.has(slug) && sparkSlugs.has(slug)) {
    history.components[slug] = {
      ...component,
      latestSeenAt: now,
      status: "ported",
    };
  }
}

history.generatedAt = now;
history.$schema = "./component-history.schema.json";
writeJson(historyPath, history);
console.log(
  `Updated registry history for ${Object.keys(history.components).length} tracked components`,
);
