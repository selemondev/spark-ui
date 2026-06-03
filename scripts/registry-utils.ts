import type { Aliases } from './types.ts'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

export const repoRoot: string = path.resolve(new URL('..', import.meta.url).pathname)
export const registryDir: string = path.join(repoRoot, 'registry')
export const magicuiCacheDir: string = path.join(repoRoot, '.cache', 'magicui')
export const defaultAliases: Aliases = {}

export function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true })
}

export function readJson<T = unknown>(filePath: string, fallback: T): T {
  if (!existsSync(filePath))
    return fallback

  const raw = readFileSync(filePath, 'utf8').trim()
  if (!raw)
    return fallback

  return JSON.parse(raw) as T
}

export function readAliases(): Aliases {
  return readJson<Aliases>(path.join(registryDir, 'aliases.json'), defaultAliases)
}

export function writeJson(filePath: string, value: unknown): void {
  ensureDir(path.dirname(filePath))
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

export function listFiles(root: string, predicate: (file: string) => boolean = () => true): string[] {
  if (!existsSync(root))
    return []

  const ignored = new Set(['.git', 'node_modules', '.next', 'dist', 'build', '.cache', 'coverage'])
  const output: string[] = []
  const stack: string[] = [root]

  while (stack.length > 0) {
    const current = stack.pop()
    if (!current)
      continue

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

export function listDirs(root: string): string[] {
  if (!existsSync(root))
    return []

  return readdirSync(root, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(root, entry.name))
    .sort()
}

export function relativePath(filePath: string, base: string = repoRoot): string {
  return path.relative(base, filePath).replaceAll(path.sep, '/')
}

export function toKebabCase(value: string): string {
  return String(value)
    .replace(/\.[^.]+$/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

export function toPascalCase(value: string): string {
  return toKebabCase(value)
    .split('-')
    .filter(Boolean)
    .map(part => `${part[0]?.toUpperCase() ?? ''}${part.slice(1)}`)
    .join('')
}

export function normalizeName(value: string): string {
  return toKebabCase(value)
    .replace(/s$/u, '')
    .replace(/-vue$/u, '')
    .replace(/-react$/u, '')
}

export function aliasCandidates(value: string, aliases: Aliases = {}): string[] {
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

export function pathMatchesComponent(filePath: string, basePath: string, identifiers: string[]): boolean {
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

export function unique(values: readonly string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort()
}

export function git(args: string[], cwd: string = repoRoot, fallback: string = ''): string {
  try {
    return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  }
  catch {
    return fallback
  }
}

export function latestCommitForPath(cwd: string, relativeFilePath: string): string {
  return git(['log', '-n', '1', '--format=%H', '--', relativeFilePath], cwd, '')
}

export function fileContains(filePath: string, pattern: RegExp): boolean {
  return pattern.test(readFileSync(filePath, 'utf8'))
}

export function fileSize(filePath: string): number {
  return statSync(filePath).size
}
