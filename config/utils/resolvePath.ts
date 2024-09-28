import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

export function resolvePath(path: string): string {
  return resolve(_dirname, path)
}
