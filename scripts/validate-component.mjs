import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { aliasCandidates, listDirs, listFiles, pathMatchesComponent, readAliases, repoRoot, toKebabCase } from './registry-utils.mjs'

const componentRoot = path.join(repoRoot, 'docs/src/components/spark-ui')
const docsRoot = path.join(repoRoot, 'docs/content/components')
const exampleRoots = [
  path.join(repoRoot, 'docs/src/example'),
  path.join(repoRoot, 'docs/src/spark-ui-demos'),
]
const testsRoot = path.join(repoRoot, 'tests')
const aliases = readAliases()

const forbiddenPatterns = [
  [/from\s+['"]react(?:\/[^'"]*)?['"]/, 'React imports are forbidden'],
  [/from\s+['"]framer-motion['"]|from\s+['"]motion\/react['"]/, 'Framer Motion imports are forbidden; use Motion for Vue'],
  [/from\s+['"]clsx['"]/, 'clsx is forbidden; use SparkUI utilities'],
  [/from\s+['"]class-variance-authority['"]/, 'class-variance-authority is forbidden'],
  [/from\s+['"]@radix-ui\//, 'Radix packages are forbidden'],
  [/from\s+['"]@\/components\/ui\//, 'shadcn/ui imports are forbidden'],
]

function changedFiles() {
  if (process.env.GITHUB_BASE_REF) {
    const base = `origin/${process.env.GITHUB_BASE_REF}`

    try {
      return execFileSync('git', ['diff', '--name-only', `${base}...HEAD`], { cwd: repoRoot, encoding: 'utf8' })
        .split('\n')
        .map(file => file.trim())
        .filter(Boolean)
    }
    catch {
      return execFileSync('git', ['diff', '--name-only', 'HEAD~1..HEAD'], { cwd: repoRoot, encoding: 'utf8' })
        .split('\n')
        .map(file => file.trim())
        .filter(Boolean)
    }
  }

  const modified = execFileSync('git', ['diff', '--name-only', 'HEAD'], { cwd: repoRoot, encoding: 'utf8' })
  const untracked = execFileSync('git', ['ls-files', '--others', '--exclude-standard'], { cwd: repoRoot, encoding: 'utf8' })

  return `${modified}\n${untracked}`
    .split('\n')
    .map(file => file.trim())
    .filter(Boolean)
}

function componentSlugs(files) {
  const componentSourceFiles = files.filter(file => file.startsWith('docs/src/components/spark-ui/'))
  if (componentSourceFiles.length === 0)
    return []

  const knownSlugs = new Set(listDirs(componentRoot).map(dir => toKebabCase(path.basename(dir))))

  return [...knownSlugs]
    .filter((slug) => {
      const identifiers = aliasCandidates(slug, aliases)
      return componentSourceFiles.some((file) => {
        const absolute = path.join(repoRoot, file)
        return pathMatchesComponent(absolute, repoRoot, identifiers)
      })
    })
    .sort()
}

function validateForbiddenSyntax(files) {
  const failures = []
  const relevant = files.filter(file => /\.(?:vue|ts|tsx|jsx|js)$/.test(file))

  for (const file of relevant) {
    const absolute = path.join(repoRoot, file)
    if (!existsSync(absolute))
      continue

    if (/\.(?:tsx|jsx)$/.test(file))
      failures.push(`${file}: JSX/TSX files are forbidden for SparkUI agent ports`)

    const source = readFileSync(absolute, 'utf8')
    for (const [pattern, message] of forbiddenPatterns) {
      if (pattern.test(source))
        failures.push(`${file}: ${message}`)
    }
  }

  return failures
}

function validateComponentArtifacts(slugs) {
  const failures = []

  for (const slug of slugs) {
    const identifiers = aliasCandidates(slug, aliases)
    const componentFiles = listFiles(componentRoot, file => file.endsWith('.vue') && pathMatchesComponent(file, componentRoot, identifiers))
    const docsFiles = listFiles(docsRoot, file => pathMatchesComponent(file, docsRoot, identifiers))
    const exampleFiles = exampleRoots.flatMap(root => listFiles(root, file => pathMatchesComponent(file, root, identifiers)))
    const testFiles = listFiles(testsRoot, file => pathMatchesComponent(file, testsRoot, identifiers))

    if (componentFiles.length === 0)
      failures.push(`${slug}: missing Vue component under docs/src/components/spark-ui`)
    if (docsFiles.length === 0)
      failures.push(`${slug}: missing docs/content/components documentation`)
    if (exampleFiles.length === 0)
      failures.push(`${slug}: missing example or demo files`)
    if (testFiles.length === 0)
      failures.push(`${slug}: missing focused tests`)
  }

  return failures
}

const files = changedFiles()
const slugs = componentSlugs(files)
const failures = [
  ...validateForbiddenSyntax(files),
  ...validateComponentArtifacts(slugs),
]

if (failures.length > 0) {
  console.error('Component validation failed:')
  for (const failure of failures)
    console.error(`- ${failure}`)
  process.exit(1)
}

console.log(slugs.length > 0
  ? `Component validation passed for ${slugs.join(', ')}`
  : 'Component validation passed; no SparkUI component artifacts changed')
