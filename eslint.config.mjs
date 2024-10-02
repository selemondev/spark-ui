import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  typescript: true,
  vue: true,
},
{
  rules: {
    'regexp/no-contradiction-with-assertion': ['off']
  }
}
)
