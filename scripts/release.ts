import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = path.join(repoRoot, "package.json");

const [versionArg, ...extraArgs] = process.argv.slice(2).filter((arg) => arg !== "--dry-run");
const dryRun = process.argv.includes("--dry-run");
if (
  !versionArg ||
  extraArgs.length > 0 ||
  (versionArg !== "--major" && !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(versionArg))
) {
  throw new Error("Usage: node scripts/release.ts <version|--major> [--dry-run]");
}

function run(cmd: string): string {
  console.log(`$ ${cmd}`);
  if (dryRun && !/^git (status|rev-parse|branch)/.test(cmd)) return "";
  return execSync(cmd, { cwd: repoRoot, stdio: ["ignore", "pipe", "inherit"] })
    .toString()
    .trim();
}

const dirty = execSync("git status --porcelain", { cwd: repoRoot }).toString().trim();
if (dirty) {
  console.error("Working tree is not clean. Commit or stash your changes before releasing.");
  process.exit(1);
}

const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: repoRoot }).toString().trim();
if (branch !== "dev") {
  console.error(`Releases must be cut from dev (currently on ${branch}).`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const targetVersion =
  versionArg === "--major" ? `${BigInt(pkg.version.split(".")[0]) + 1n}.0.0` : versionArg;
if (targetVersion === pkg.version) {
  throw new Error(`Version ${targetVersion} is already the current package version.`);
}
if (execSync(`git tag --list v${targetVersion}`, { cwd: repoRoot }).toString().trim()) {
  throw new Error(`Tag v${targetVersion} already exists.`);
}
console.log(
  `Releasing ${pkg.name}: ${pkg.version} -> ${targetVersion}${dryRun ? " (dry run)" : ""}`,
);

if (!dryRun) {
  pkg.version = targetVersion;
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

run(`npx changelogen@latest --output CHANGELOG.md -r ${targetVersion}`);
run(`git add package.json CHANGELOG.md`);
run(`git commit -m "chore(release): v${targetVersion}"`);
run(`git tag -a v${targetVersion} -m "v${targetVersion}"`);
run(`git push origin ${branch} --follow-tags`);

if (dryRun) {
  console.log("\nDry run complete. No files, commits, tags or remote refs were changed.");
} else {
  console.log(
    `\nPushed v${targetVersion}. The GitHub release workflow will validate and publish the release.`,
  );
}
