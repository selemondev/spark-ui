import type { ComponentRegistry, RegistryComponent } from './types.ts'
import path from 'node:path'
import { aliasCandidates, normalizeName, readAliases, readJson, registryDir, toKebabCase, writeJson } from './registry-utils.ts'

const aliases = readAliases()

function keysFor(component: RegistryComponent): string[] {
  return [
    ...aliasCandidates(component.slug, aliases),
    ...aliasCandidates(component.name, aliases),
    normalizeName(component.slug),
    normalizeName(component.name),
  ].map(value => normalizeName(toKebabCase(value)))
}

const magicui = readJson<ComponentRegistry>(path.join(registryDir, 'magic-ui.json'), { components: [] })
const sparkui = readJson<ComponentRegistry>(path.join(registryDir, 'spark-ui.json'), { components: [] })
const sparkKeys = new Set(sparkui.components.flatMap(component => keysFor(component)))

const missing = magicui.components
  .filter(component => !keysFor(component).some(key => sparkKeys.has(key)))
  .map(component => ({
    ...component,
    issueTitle: `[Agent] Port ${component.name} from MagicUI`,
    targetBranch: `agent/${component.slug}`,
    pullRequestTitle: `feat(${component.slug}): add SparkUI port`,
    requirements: [
      'Port the MagicUI React component to Vue 3 using <script setup lang="ts">.',
      'Use TailwindCSS and SparkUI naming/layout conventions.',
      'Use Motion for Vue when the MagicUI source uses Framer Motion or motion/react.',
      'Add docs, examples, and focused tests for the new SparkUI component.',
      'Do not use React, JSX, clsx, class-variance-authority, Radix, or shadcn/ui.',
    ],
  }))
  .sort((left, right) => left.slug.localeCompare(right.slug))

writeJson(path.join(registryDir, 'missing-components.json'), {
  $schema: './missing-components.schema.json',
  generatedAt: new Date().toISOString(),
  source: {
    magicuiGeneratedAt: magicui.generatedAt,
    sparkuiGeneratedAt: sparkui.generatedAt,
  },
  count: missing.length,
  components: missing,
})

console.log(`Wrote ${missing.length} missing components to registry/missing-components.json`)
