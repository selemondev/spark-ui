import type { ExtractPropTypes } from 'vue'

export const demoProps = {
  github: {
    type: String,
    default: 'https://github.com/selemondev/spark-ui',
  },
  codeSandBox: {
    type: String,
    default: 'https://codesandbox.io/',
  },
  highlightedCode: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  srcCode: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  lang: {
    type: String,
    default: 'vue',
  },
  expand: {
    type: Boolean,
    default: false,
  },
} as const

export type DemoProps = ExtractPropTypes<typeof demoProps>
