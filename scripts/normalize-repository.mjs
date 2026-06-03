import { existsSync, readFileSync, renameSync, rmSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { listFiles, repoRoot, toKebabCase } from './registry-utils.mjs'

const selfPath = fileURLToPath(import.meta.url)

const checkOnly = process.argv.includes('--check')
const report = {
  renamed: [],
  duplicatesRemoved: [],
  canonicalFiles: [
    'registry/magic-ui.json',
    'registry/spark-ui.json',
    'registry/missing-components.json',
    'registry/component-history.json',
    'registry/magic-ui.schema.json',
    'registry/spark-ui.schema.json',
    'registry/missing-components.schema.json',
    'registry/component-history.schema.json',
    '.ai/prompts/spark-ui-standards.md',
    'docs/content/guide/magic-ui-sync.md',
    '.github/workflows/watch-magic-ui.yml',
    'scripts/clone-magic-ui.mjs',
    'scripts/build-magic-ui-registry.mjs',
    'scripts/build-spark-ui-registry.mjs',
    'scripts/update-component-history.mjs',
  ],
}

const legacyPaths = [
  ['registry/magicui.json', 'registry/magic-ui.json'],
  ['registry/sparkui.json', 'registry/spark-ui.json'],
  ['registry/missing.json', 'registry/missing-components.json'],
  ['registry/history.json', 'registry/component-history.json'],
  ['registry/magicui.schema.json', 'registry/magic-ui.schema.json'],
  ['registry/sparkui.schema.json', 'registry/spark-ui.schema.json'],
  ['registry/missing.schema.json', 'registry/missing-components.schema.json'],
  ['registry/history.schema.json', 'registry/component-history.schema.json'],
  ['.ai/prompts/sparkui-standards.md', '.ai/prompts/spark-ui-standards.md'],
  ['docs/content/guide/magicui-sync.md', 'docs/content/guide/magic-ui-sync.md'],
  ['.github/workflows/watch-magicui.yml', '.github/workflows/watch-magic-ui.yml'],
  ['scripts/clone-magicui.mjs', 'scripts/clone-magic-ui.mjs'],
  ['scripts/build-magicui-registry.mjs', 'scripts/build-magic-ui-registry.mjs'],
  ['scripts/build-sparkui-registry.mjs', 'scripts/build-spark-ui-registry.mjs'],
  ['scripts/update-registry-history.mjs', 'scripts/update-component-history.mjs'],
]
const stalePathFragments = [
  '/animatedBeam/',
  '/animatedGradientText/',
  '/animatedList/',
  '/animatedShinyText/',
  '/animatedToolTip/',
  '/avatarCircle/',
  '/dotPattern/',
  '/gradualSpacing/',
  '/letterUp/',
  '/orbitingCircles/',
  '/retroGrid/',
  '/skewedInfiniteScroll/',
  '/typingAnimation/',
  '/blurFade/',
  '/blurIn/',
]
const staleFileNames = [
  'AnimatedBeam.vue',
  'AnimatedGradientText.vue',
  'animatedGradientText.vue',
  'AnimatedList.vue',
  'AnimatedShinyText.vue',
  'AnimatedToolTip.vue',
  'AvatarCircles.vue',
  'BentoCard.vue',
  'BentoGrid.vue',
  'BlurFade.vue',
  'BlurIn.vue',
  'DotPattern.vue',
  'DotPatternLinearGradient.vue',
  'Globe.vue',
  'GradualSpacing.vue',
  'HeroVideoDialog.vue',
  'Marquee.vue',
  'Meteors.vue',
  'OrbitingCircles.vue',
  'Particles.vue',
  'ParticlesBackground.vue',
  'Ripple.vue',
  'SkewedInfiniteScroll.vue',
  'TypingAnimation.vue',
  'Notification.vue',
  'Circle.vue',
  'Demo.vue',
  'Demos.vue',
  'VerticalDemo.vue',
  '3DDemo.vue',
  '3DMarquee.vue',
  'MobileNav.vue',
  'MobileNavHeader.vue',
  'MobileNavMenu.vue',
  'MobileNavToggle.vue',
  'NavBody.vue',
  'NavItems.vue',
  'Navbar.vue',
  'NavbarButton.vue',
  'NavbarLogo.vue',
  'ArrowRight.vue',
  'ViteIcon.vue',
  'Vue.vue',
  'Nuxt.vue',
  'React.vue',
  'Svelte.vue',
  'Qwik.vue',
  'Vitest.vue',
  'Angular.vue',
  'Astro.vue',
  'Nitro.vue',
]

function isKebabFileName(filePath) {
  const baseName = path.basename(filePath)
  const extension = path.extname(baseName)
  const stem = baseName.slice(0, -extension.length)
  return `${toKebabCase(stem)}${extension}` === baseName
}

function isKebabDirectoryName(directoryPath) {
  return toKebabCase(path.basename(directoryPath)) === path.basename(directoryPath)
}

function absolute(relativeFilePath) {
  return path.join(repoRoot, relativeFilePath)
}

function normalizedContent(filePath) {
  const content = readFileSync(filePath, 'utf8')
  if (!filePath.endsWith('.json'))
    return content

  try {
    return JSON.stringify(JSON.parse(content))
  }
  catch {
    return content
  }
}

for (const [legacyRelativePath, canonicalRelativePath] of legacyPaths) {
  const legacyPath = absolute(legacyRelativePath)
  const canonicalPath = absolute(canonicalRelativePath)
  const legacyExists = existsSync(legacyPath)
  const canonicalExists = existsSync(canonicalPath)

  if (!legacyExists)
    continue

  if (!canonicalExists) {
    if (checkOnly)
      throw new Error(`Legacy file ${legacyRelativePath} must be renamed to ${canonicalRelativePath}`)

    renameSync(legacyPath, canonicalPath)
    report.renamed.push(`${legacyRelativePath} -> ${canonicalRelativePath}`)
    continue
  }

  if (normalizedContent(legacyPath) !== normalizedContent(canonicalPath))
    throw new Error(`Conflicting duplicate files detected: ${legacyRelativePath} and ${canonicalRelativePath}`)

  if (checkOnly)
    throw new Error(`Duplicate file ${legacyRelativePath} should be removed; canonical file is ${canonicalRelativePath}`)

  rmSync(legacyPath, { force: true })
  report.duplicatesRemoved.push(legacyRelativePath)
}

for (const canonicalFile of report.canonicalFiles) {
  if (!existsSync(absolute(canonicalFile)))
    throw new Error(`Missing canonical file: ${canonicalFile}`)
}

// `.agents/` is the authoritative agent expertise/skills directory and must be
// preserved. Only list directories here that are genuinely obsolete duplicates.
for (const obsoleteDirectory of []) {
  const obsoletePath = absolute(obsoleteDirectory)
  if (!existsSync(obsoletePath))
    continue

  if (checkOnly)
    throw new Error(`Obsolete duplicate directory remains: ${obsoleteDirectory}`)

  rmSync(obsoletePath, { recursive: true, force: true })
  report.duplicatesRemoved.push(obsoleteDirectory)
}

const namingRoots = [
  'docs/src',
  'docs/.vitepress/components',
]

for (const root of namingRoots) {
  const absoluteRoot = absolute(root)
  if (!existsSync(absoluteRoot))
    continue

  for (const file of listFiles(absoluteRoot)) {
    const relativeFilePath = path.relative(absoluteRoot, file).replaceAll(path.sep, '/')
    const segments = relativeFilePath.split('/')
    const directories = segments.slice(0, -1)

    if (directories.some(directory => !isKebabDirectoryName(directory)))
      throw new Error(`Non-kebab directory remains under ${root}: ${relativeFilePath}`)

    if (!isKebabFileName(file))
      throw new Error(`Non-kebab file remains under ${root}: ${relativeFilePath}`)
  }
}

const referenceRoots = [
  'docs',
  'scripts',
  'registry',
  '.github',
  '.ai',
  'package.json',
]

for (const root of referenceRoots) {
  const absoluteRoot = absolute(root)
  if (!existsSync(absoluteRoot))
    continue

  const files = absoluteRoot.endsWith('.json') || absoluteRoot.endsWith('.md') || absoluteRoot.endsWith('.yml')
    ? [absoluteRoot]
    : listFiles(absoluteRoot, file => /\.(?:vue|ts|js|mjs|mts|md|mdx|json|yml|yaml)$/.test(file))

  for (const file of files) {
    if (file === selfPath)
      continue

    const content = readFileSync(file, 'utf8')

    for (const fragment of stalePathFragments) {
      if (content.includes(fragment))
        throw new Error(`Stale legacy path fragment found in ${path.relative(repoRoot, file)}: ${fragment}`)
    }

    for (const fileName of staleFileNames) {
      if (content.includes(fileName))
        throw new Error(`Stale legacy filename found in ${path.relative(repoRoot, file)}: ${fileName}`)
    }
  }
}

console.log('Repository Cleanup')
console.log('')
console.log('Renamed:')
console.log(report.renamed.length > 0 ? report.renamed.map(entry => `* ${entry}`).join('\n') : '* None')
console.log('')
console.log('Duplicates Removed:')
console.log(report.duplicatesRemoved.length > 0 ? report.duplicatesRemoved.map(entry => `* ${entry}`).join('\n') : '* None')
console.log('')
console.log('Canonical Files:')
console.log(report.canonicalFiles.map(entry => `* ${entry}`).join('\n'))
console.log('')
console.log('No duplicate registries remain.')
console.log('Repository normalization passed.')
