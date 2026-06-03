import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  ignores: [
    'goal.md',
    '.agents',
    '.agents/**',
  ],
  typescript: true,
  vue: true,
}, {
  rules: {
    'regexp/no-contradiction-with-assertion': ['off'],
  },
})
