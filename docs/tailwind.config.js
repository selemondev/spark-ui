module.exports = {
  content: ['./docs/.vitepress/**/*.{js,ts,vue}', './components/**/*.{js,ts,vue,md}', './src/**/*.{js,ts,vue}'],
  plugins: [],
  darkMode: 'class',
  theme: {
    extends: {
      fontFamily: {
        Roboto: 'Roboto',
      },
    },
  },
}
