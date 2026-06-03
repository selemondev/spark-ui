import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { magicuiCacheDir, repoRoot } from './registry-utils.mjs'

const repository = process.env.MAGICUI_REPOSITORY ?? 'https://github.com/magicuidesign/magicui.git'
const ref = process.env.MAGICUI_REF
const parentDir = path.dirname(magicuiCacheDir)
const tempDir = path.join(parentDir, `magicui-${Date.now()}`)

mkdirSync(parentDir, { recursive: true })

if (existsSync(tempDir))
  rmSync(tempDir, { recursive: true, force: true })

const cloneArgs = ['clone', '--depth=1']
if (ref)
  cloneArgs.push('--branch', ref)
cloneArgs.push(repository, tempDir)

execFileSync('git', cloneArgs, { cwd: repoRoot, stdio: 'inherit' })

if (existsSync(magicuiCacheDir))
  rmSync(magicuiCacheDir, { recursive: true, force: true })

renameSync(tempDir, magicuiCacheDir)

console.log(`MagicUI cloned into ${path.relative(repoRoot, magicuiCacheDir)}`)
