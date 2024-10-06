import { defineConfig } from 'vitepress'
import { version } from '../../package.json'
import { applyPlugins } from './plugins/code'

const components = [
  { text: 'Accordion', link: '/guide/components/accordion.md' },
  { text: 'Alert', link: '/guide/components/alert.md' },
  { text: 'Avatar', link: '/guide/components/avatar.md' },
  { text: 'Badge', link: '/guide/components/badge.md' },
  { text: 'Button', link: '/guide/components/button.md' },
  { text: 'Checkbox', link: '/guide/components/checkbox.md' },
  { text: 'Divider', link: '/guide/components/divider.md' },
  { text: 'Icon', link: '/guide/components/icon.md' },
  { text: 'Input', link: '/guide/components/input.md' },
  { text: 'Kbd', link: '/guide/components/kbd.md' },
  { text: 'Modal', link: '/guide/components/modal.md' },
  { text: 'Switch', link: '/guide/components/switch.md' },
  { text: 'Tag', link: '/guide/components/tag.md' },
]
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: { plugins: [] },
  title: 'Spark UI',
  description: 'Experience The Magic Of Animated Components. Crafted With Vue, TypeScript, TailwindCss And Vueuse Motion ✨',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/icon.png',
      },
    ],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' },
    ],
  ],
  themeConfig: {
    search: {
      provider: 'local',
    },
    logo: '../icon.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', items: [
        { text: 'Introduction', link: '/guide/getting-started/index.md' },
        { text: 'Installation', link: '/guide/getting-started/installation.md' },
      ] },
      { text: 'Components', items: components },
      { text: 'Showcase', link: '' },
      { text: `v${version}`, link: '' },

    ],

    sidebar: {
      '/guide/': [
        {
          text: '✨&nbsp;&nbsp; Getting Started',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/guide/getting-started/index.md' },
            { text: 'Installation', link: '/guide/getting-started/installation.md' },
            { text: 'Theme', link: '/guide/getting-started/theme.md' },
          ],
        },

        {
          text: '📦&nbsp;&nbsp; Components',
          collapsed: true,
          items: components,
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/selemondev/spark-ui' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT Selemon Brahanu',
    },
  },
  markdown: {
    config: (md) => {
      applyPlugins(md)
    },
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },

  },
})
