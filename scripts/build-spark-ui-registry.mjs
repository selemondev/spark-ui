import { existsSync } from 'node:fs'
import path from 'node:path'
import {
  aliasCandidates,
  latestCommitForPath,
  listDirs,
  listFiles,
  pathMatchesComponent,
  readAliases,
  registryDir,
  relativePath,
  repoRoot,
  toKebabCase,
  toPascalCase,
  writeJson,
} from './registry-utils.mjs'

const componentRoot = path.join(repoRoot, 'docs/src/components/spark-ui')
const exampleRoots = [
  path.join(repoRoot, 'docs/src/example'),
  path.join(repoRoot, 'docs/src/spark-ui-demos'),
]
const docsRoot = path.join(repoRoot, 'docs/content/components')
const testsRoot = path.join(repoRoot, 'tests')
const aliases = readAliases()

function matchingFiles(root, slug) {
  if (!existsSync(root))
    return []

  const identifiers = aliasCandidates(slug, aliases)
  return listFiles(root, file => pathMatchesComponent(file, root, identifiers)).map(file => relativePath(file))
}

const components = listDirs(componentRoot).map((dir) => {
  const slug = toKebabCase(path.basename(dir))
  const sourceFiles = listFiles(dir, file => ['.vue', '.ts'].includes(path.extname(file)))
    .map(file => relativePath(file))
  const docsFiles = matchingFiles(docsRoot, slug)
  const exampleFiles = exampleRoots.flatMap(root => matchingFiles(root, slug))
  const testFiles = matchingFiles(testsRoot, slug)
  const mainSource = sourceFiles.find(file => file.endsWith('.vue')) ?? sourceFiles[0]

  return {
    name: toPascalCase(slug),
    slug,
    path: relativePath(dir),
    sourceFiles,
    docsExists: docsFiles.length > 0,
    docsFiles,
    examplesExists: exampleFiles.length > 0,
    exampleFiles,
    testsExists: testFiles.length > 0,
    testFiles,
    lastCommitHash: mainSource ? latestCommitForPath(repoRoot, mainSource) : '',
  }
}).sort((left, right) => left.slug.localeCompare(right.slug))

const registry = {
  $schema: './spark-ui.schema.json',
  generatedAt: new Date().toISOString(),
  source: {
    componentRoot: relativePath(componentRoot),
    docsRoot: relativePath(docsRoot),
    exampleRoots: exampleRoots.map(root => relativePath(root)),
    testsRoot: relativePath(testsRoot),
  },
  components,
}

writeJson(path.join(registryDir, 'spark-ui.json'), registry)
console.log(`Wrote ${components.length} SparkUI components to registry/spark-ui.json`)
