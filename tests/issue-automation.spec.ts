import { execFile } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import { expect, it } from "vite-plus/test";

const exec = promisify(execFile);
const component = {
  name: "Active",
  slug: "active",
  issueTitle: "Port Active",
  targetBranch: "port-active",
  pullRequestTitle: "feat: port active",
  requirements: [],
};

it("fails closed on absent or malformed registries and closes only stale issues without prompts", async () => {
  const root = mkdtempSync(join(tmpdir(), "spark-issues-"));
  mkdirSync(join(root, "scripts"));
  mkdirSync(join(root, "registry"));
  writeFileSync(join(root, "package.json"), '{"type":"module"}');
  for (const file of ["create-agent-issues.ts", "registry-utils.ts"]) {
    copyFileSync(resolve("scripts", file), join(root, "scripts", file));
  }
  const mutations: {
    method: string | undefined;
    path: string | undefined;
    body: Record<string, unknown>;
  }[] = [];
  let requests = 0;
  const server = createServer((req, res) => {
    requests++;
    res.setHeader("Content-Type", "application/json");
    if (req.method === "GET" && req.url?.startsWith("/search/issues?")) {
      res.end(
        JSON.stringify({
          items: [
            { number: 1, title: "Port Active", state: "open" },
            { number: 2, title: "Port Retired", state: "open" },
          ],
        }),
      );
      return;
    }
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      mutations.push({ method: req.method, path: req.url, body: JSON.parse(body) });
      res.end("{}");
    });
  });

  try {
    await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
    const env = {
      ...process.env,
      GITHUB_TOKEN: "local-test-token",
      GITHUB_REPOSITORY: "local/test",
      GITHUB_API_URL: `http://127.0.0.1:${(server.address() as AddressInfo).port}`,
    };
    const script = join(root, "scripts", "create-agent-issues.ts");
    const missingPath = join(root, "registry", "missing-components.json");
    const run = (mode: string) => exec(process.execPath, [script, mode], { cwd: tmpdir(), env });

    await expect(run("--close-stale-only")).rejects.toThrow();
    expect(requests).toBe(0);

    for (const invalid of [
      {},
      { count: 0, components: [component] },
      { count: 1, components: [{}] },
    ]) {
      writeFileSync(missingPath, JSON.stringify(invalid));
      await expect(run("--close-stale-only")).rejects.toThrow();
      expect(requests).toBe(0);
    }

    writeFileSync(missingPath, JSON.stringify({ count: 1, components: [component] }));
    await run("--dry-run");
    expect(requests).toBe(0);
    await run("--close-stale-only");
    expect(mutations).toEqual([
      {
        method: "PATCH",
        path: "/repos/local/test/issues/2",
        body: { state: "closed", state_reason: "not_planned" },
      },
      {
        method: "POST",
        path: "/repos/local/test/issues/2/comments",
        body: { body: expect.any(String) },
      },
    ]);
  } finally {
    await new Promise<void>((done, reject) =>
      server.close((error) => (error ? reject(error) : done())),
    );
    rmSync(root, { recursive: true, force: true });
  }
});
