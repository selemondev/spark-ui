import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {
  fileSize,
  latestCommitForPath,
  listDirs,
  listFiles,
  magicuiCacheDir,
  readJson,
  registryDir,
  relativePath,
  toKebabCase,
  toPascalCase,
  unique,
  writeJson,
} from './registry-utils.ts'

interface ManifestFile {
  path: string
}

interface ManifestItem {
  type?: string
  name: string
  title?: string
  description?: string
  files?: ManifestFile[]
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  css?: unknown
}

interface Manifest {
  items?: ManifestItem[]
}

interface MagicUiComponentMeta {
  name: string
  slug: string
  title?: string
  description?: string
  sourcePath: string
  sourceFiles: string[]
  lastCommitHash: string
  dependencies: string[]
  registryDependencies?: string[]
  usesAnimation: boolean
  usesFramerMotion: boolean
  usesMotion: boolean
  demoFiles: string[]
  docsFiles: string[]
}

const componentExtensions = new Set(['.tsx', '.ts', '.jsx', '.js'])
const documentationExtensions = new Set(['.md', '.mdx'])
const ignoredNameFragments = [
  '.test.',
  '.spec.',
  '.stories.',
  'index.',
  'utils.',
  'cn.',
  'use-',
]

function isLikelyComponentFile(filePath: string): boolean {
  const extension = path.extname(filePath)
  const basename = path.basename(filePath).toLowerCase()

  return componentExtensions.has(extension)
    && !ignoredNameFragments.some(fragment => basename.includes(fragment))
}

function candidateRoots(): string[] {
  const roots = [
    'registry/default/magicui',
    'registry/magicui',
    'components/magicui',
    'components/ui',
    'src/components/magicui',
    'src/components',
  ].map(fragment => path.join(magicuiCacheDir, fragment))

  return roots.filter(existsSync)
}

function registryManifestCandidates(): string[] {
  return [
    path.join(magicuiCacheDir, 'apps/www/registry.json'),
    path.join(magicuiCacheDir, 'registry.json'),
  ].filter(existsSync)
}

function importsFromSource(source: string): string[] {
  const imports: string[] = []
  const patterns = [
    /\bfrom\s*['"]([^'".][^'"]*)['"]/g,
    /\bimport\s*['"]([^'".][^'"]*)['"]/g,
  ]

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const specifier = match[1]
      if (specifier.startsWith('@/'))
        continue
      imports.push(specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0])
    }
  }

  return unique(imports)
}

function metadataForDirectory(dir: string): MagicUiComponentMeta | null {
  const files = listFiles(dir)
  const sourceFiles = files.filter(isLikelyComponentFile)
  if (sourceFiles.length === 0)
    return null

  const relativeDir = relativePath(dir, magicuiCacheDir)
  const docsFiles = files.filter(file => documentationExtensions.has(path.extname(file)))
  const demoFiles = files.filter((file) => {
    const lower = path.basename(file).toLowerCase()
    return lower.includes('demo') || lower.includes('example') || lower.includes('preview')
  })
  const sourceText = sourceFiles.map(file => readFileSync(file, 'utf8')).join('\n')
  const dependencies = importsFromSource(sourceText)
  const hasFramerMotion = /from\s+['"]framer-motion['"]|from\s+['"]motion\/react['"]|motion\./.test(sourceText)
  const hasMotionUsage = hasFramerMotion || /use(?:Scroll|Transform|Spring|MotionValue|InView)|AnimatePresence|layoutId|whileHover|whileTap|variants/.test(sourceText)
  const hasAnimationUsage = hasMotionUsage || /@keyframes|animate-|transition|duration-|ease-|spring|stagger/i.test(sourceText)
  const mainSource = sourceFiles
    .slice()
    .sort((left, right) => fileSize(right) - fileSize(left))[0]

  return {
    name: toPascalCase(path.basename(dir)),
    slug: toKebabCase(path.basename(dir)),
    sourcePath: relativeDir,
    sourceFiles: sourceFiles.map(file => relativePath(file, magicuiCacheDir)),
    lastCommitHash: latestCommitForPath(magicuiCacheDir, relativePath(mainSource, magicuiCacheDir)),
    dependencies,
    usesAnimation: hasAnimationUsage,
    usesFramerMotion: hasFramerMotion,
    usesMotion: hasMotionUsage,
    demoFiles: demoFiles.map(file => relativePath(file, magicuiCacheDir)),
    docsFiles: docsFiles.map(file => relativePath(file, magicuiCacheDir)),
  }
}

function relatedFiles(root: string, slug: string, extensions: Set<string>): string[] {
  if (!existsSync(root))
    return []

  return listFiles(root, (file) => {
    const basename = toKebabCase(path.basename(file))
    const extension = path.extname(file)

    return extensions.has(extension) && (basename === slug || basename.startsWith(`${slug}-`) || basename.includes(`-${slug}-`))
  })
}

function absoluteManifestFile(manifestDir: string, filePath: string): string {
  const fromManifestDir = path.join(manifestDir, filePath)
  if (existsSync(fromManifestDir))
    return fromManifestDir

  const fromRoot = path.join(magicuiCacheDir, filePath)
  if (existsSync(fromRoot))
    return fromRoot

  return fromManifestDir
}

function metadataForManifestItem(item: ManifestItem, manifestDir: string): MagicUiComponentMeta | null {
  if (item.type !== 'registry:ui' || !Array.isArray(item.files) || item.files.length === 0)
    return null

  const slug = toKebabCase(item.name)
  const sourceFiles = item.files
    .map(file => absoluteManifestFile(manifestDir, file.path))
    .filter(file => existsSync(file) && isLikelyComponentFile(file))

  if (sourceFiles.length === 0)
    return null

  const demoRoot = path.join(manifestDir, 'registry/example')
  const docsRoot = path.join(manifestDir, 'content/docs/components')
  const demoFiles = relatedFiles(demoRoot, slug, componentExtensions)
  const docsFile = path.join(docsRoot, `${slug}.mdx`)
  const docsFiles = existsSync(docsFile) ? [docsFile] : []
  const sourceText = sourceFiles.map(file => readFileSync(file, 'utf8')).join('\n')
  const packageDependencies = [...(item.dependencies ?? []), ...(item.devDependencies ?? [])]
  const dependencies = unique([...packageDependencies, ...importsFromSource(sourceText)])
  const hasFramerMotion = dependencies.includes('framer-motion') || /from\s+['"]framer-motion['"]|from\s+['"]motion\/react['"]/.test(sourceText)
  const hasMotionUsage = hasFramerMotion || dependencies.includes('motion') || /motion\.|use(?:Scroll|Transform|Spring|MotionValue|InView)|AnimatePresence|layoutId|whileHover|whileTap|variants/.test(sourceText)
  const hasAnimationUsage = hasMotionUsage || Boolean(item.css) || /@keyframes|animate-|transition|duration-|ease-|spring|stagger/i.test(sourceText)
  const mainSource = sourceFiles
    .slice()
    .sort((left, right) => fileSize(right) - fileSize(left))[0]

  return {
    name: toPascalCase(item.title ?? item.name),
    slug,
    title: item.title ?? toPascalCase(item.name),
    description: item.description ?? '',
    sourcePath: relativePath(mainSource, magicuiCacheDir),
    sourceFiles: sourceFiles.map(file => relativePath(file, magicuiCacheDir)),
    lastCommitHash: latestCommitForPath(magicuiCacheDir, relativePath(mainSource, magicuiCacheDir)),
    dependencies,
    registryDependencies: item.registryDependencies ?? [],
    usesAnimation: hasAnimationUsage,
    usesFramerMotion: hasFramerMotion,
    usesMotion: hasMotionUsage,
    demoFiles: demoFiles.map(file => relativePath(file, magicuiCacheDir)),
    docsFiles: docsFiles.map(file => relativePath(file, magicuiCacheDir)),
  }
}

if (!existsSync(magicuiCacheDir)) {
  throw new Error('MagicUI cache is missing. Run node scripts/clone-magic-ui.ts first.')
}

const seen = new Map<string, MagicUiComponentMeta>()
const manifestPath = registryManifestCandidates()[0]

if (manifestPath) {
  const manifest = readJson<Manifest>(manifestPath, { items: [] })
  const manifestDir = path.dirname(manifestPath)

  for (const item of manifest.items ?? []) {
    const metadata = metadataForManifestItem(item, manifestDir)
    if (metadata)
      seen.set(metadata.slug, metadata)
  }
}

if (seen.size === 0) {
  for (const root of candidateRoots()) {
    for (const dir of listDirs(root)) {
      const metadata = metadataForDirectory(dir)
      if (metadata)
        seen.set(metadata.slug, metadata)
    }
  }
}

if (seen.size === 0) {
  for (const dir of listDirs(magicuiCacheDir)) {
    const metadata = metadataForDirectory(dir)
    if (metadata)
      seen.set(metadata.slug, metadata)
  }
}

const registry = {
  $schema: './magic-ui.schema.json',
  generatedAt: new Date().toISOString(),
  source: {
    repository: process.env.MAGICUI_REPOSITORY ?? 'https://github.com/magicuidesign/magicui',
    ref: process.env.MAGICUI_REF ?? 'default',
  },
  components: [...seen.values()].sort((left, right) => left.slug.localeCompare(right.slug)),
}

writeJson(path.join(registryDir, 'magic-ui.json'), registry)
console.log(`Wrote ${registry.components.length} MagicUI components to registry/magic-ui.json`)
