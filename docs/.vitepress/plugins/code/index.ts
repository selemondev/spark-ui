import { fencePlugin } from './fencePlugin'
import { demoBlockPlugin } from './plugin-demo-block'

export function applyPlugins(md: any) {
  md.use(fencePlugin)
  md.use(demoBlockPlugin)
}
