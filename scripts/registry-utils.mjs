import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

export const repoRoot = path.resolve(new URL('..', import.meta.url).pathname)
export const registryDir = path.join(repoRoot, 'registry')
export const magicuiCacheDir = path.join(repoRoot, '.cache', 'magicui')
export const defaultAliases = {}

export function ensureDir(dir) {
  mkdirSync(dir, { recursive: true })
}

export function readJson(filePath, fallback) {
  if (!existsSync(filePath))
    return fallback

  const raw = readFileSync(filePath, 'utf8').trim()
  if (!raw)
    return fallback

  return JSON.parse(raw)
}

export function readAliases() {
  return readJson(path.join(registryDir, 'aliases.json'), defaultAliases)
}

export function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath))
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

export function listFiles(root, predicate = () => true) {
  if (!existsSync(root))
    return []

  const ignored = new Set(['.git', 'node_modules', '.next', 'dist', 'build', '.cache', 'coverage'])
  const output = []
  const stack = [root]

  while (stack.length > 0) {
    const current = stack.pop()
    const entries = readdirSync(current, { withFileTypes: true })

    for (const entry of entries) {
      if (ignored.has(entry.name))
        continue

      const absolute = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(absolute)
        continue
      }

      if (entry.isFile() && predicate(absolute))
        output.push(absolute)
    }
  }

  return output.sort()
}

export function listDirs(root) {
  if (!existsSync(root))
    return []

  return readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(root, entry.name))
    .sort()
}

export function relativePath(filePath, base = repoRoot) {
  return path.relative(base, filePath).replaceAll(path.sep, '/')
}

export function toKebabCase(value) {
  return String(value)
    .replace(/\.[^.]+$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

export function toPascalCase(value) {
  return toKebabCase(value)
    .split('-')
    .filter(Boolean)
    .map(part => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join('')
}

export function normalizeName(value) {
  return toKebabCase(value)
    .replace(/s$/u, '')
    .replace(/-vue$/u, '')
    .replace(/-react$/u, '')
}

export function aliasCandidates(value, aliases = {}) {
  const target = toKebabCase(value)
  const normalizedTarget = normalizeName(target)
  const candidates = new Set([target, normalizedTarget])

  for (const [key, values] of Object.entries(aliases)) {
    const normalizedKey = toKebabCase(key)
    const normalizedValues = values.map(item => toKebabCase(item))
    const matchesKey = normalizedKey === target || normalizeName(normalizedKey) === normalizedTarget
    const matchesValue = normalizedValues.some(item => item === target || normalizeName(item) === normalizedTarget)

    if (!matchesKey && !matchesValue)
      continue

    candidates.add(normalizedKey)
    candidates.add(normalizeName(normalizedKey))

    for (const item of normalizedValues) {
      candidates.add(item)
      candidates.add(normalizeName(item))
    }
  }

  return [...candidates].filter(Boolean)
}

export function pathMatchesComponent(filePath, basePath, identifiers) {
  const candidateKeys = new Set(
    identifiers.flatMap(identifier => [toKebabCase(identifier), normalizeName(identifier)]).filter(Boolean),
  )
  const relative = relativePath(filePath, basePath)
  const parts = relative.split('/').flatMap((part) => {
    const stem = part.replace(/\.[^.]+$/, '')
    return stem === part ? [part] : [part, stem]
  })

  return parts.some((part) => {
    const key = toKebabCase(part)
    const normalizedKey = normalizeName(key)
    return candidateKeys.has(key) || candidateKeys.has(normalizedKey)
  })
}

export function unique(values) {
  return [...new Set(values.filter(Boolean))].sort()
}

export function git(args, cwd = repoRoot, fallback = '') {
  try {
    return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  }
  catch {
    return fallback
  }
}

export function latestCommitForPath(cwd, relativeFilePath) {
  return git(['log', '-n', '1', '--format=%H', '--', relativeFilePath], cwd, '')
}

export function fileContains(filePath, pattern) {
  return pattern.test(readFileSync(filePath, 'utf8'))
}

export function fileSize(filePath) {
  return statSync(filePath).size
}
