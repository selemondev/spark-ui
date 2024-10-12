import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { version } from '../../package.json'
import { applyPlugins } from './plugins/code'

const components = [
  { text: 'Animated Beam', link: '/content/components/animated-beam.md' },
  { text: 'Animated Gradient Text', link: '/content/components/animated-gradient-text.md' },
  { text: 'Animated List', link: '/content/components/animated-list.md' },
  { text: 'Animated Shiny Text', link: '/content/components/animated-shiny-text.md' },
  { text: 'Avatar Circle', link: '/content/components/avatar-circles.md' },
  { text: 'Bento Grid', link: '/content/components/bento-grid.md' },
  { text: 'Blur Fade', link: '/content/components/blur-fade.md' },
  { text: 'Blur In', link: '/content/components/blur-in.md' },
  { text: 'Dot Pattern', link: '/content/components/dot-pattern.md' },
  { text: 'Globe', link: '/content/components/globe.md' },
  { text: 'Gradual Spacing', link: '/content/components/gradual-spacing.md' },
  { text: 'Letter Up', link: '/content/components/letter-up.md' },
  { text: 'Marquee', link: '/content/components/marquee.md' },
  { text: 'Meteors', link: '/content/components/meteors.md' },
  { text: 'Orbiting Circles', link: '/content/components/orbiting-circles.md' },
  { text: 'Particles', link: '/content/components/particles.md' },
  { text: 'Retro Grid', link: '/content/components/retro-grid.md' },
  { text: 'Ripple', link: '/content/components/ripple.md' },
  { text: 'Skewed Infinite Scroll', link: '/content/components/skewed-infinite-scroll.md' },
  { text: 'Typing Animation', link: '/content/components/typing-animation.md' },
]

export default defineConfig({
  vite: {
    plugins: [
      groupIconVitePlugin(),
    ],
  },
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
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/selemondev/spark-ui/edit/main/docs/:path',
    },
    logo: '../icon.png',
    nav: [
      { text: 'Guide', items: [
        { text: 'Introduction', link: '/content/guide/getting-started/index.md' },
        { text: 'Installation', link: '/content/guide/getting-started/installation.md' },
      ] },
      { text: 'Components', items: components },
      { text: 'Showcase', link: '' },
      { text: `v${version}`, link: '' },

    ],

    sidebar: {
      '/content/': [
        {
          text: '✨&nbsp;&nbsp; Getting Started',
          collapsed: true,
          items: [
            { text: 'Introduction', link: '/content/guide/getting-started/index.md' },
            { text: 'Installation', link: '/content/guide/getting-started/installation.md' },
          ],
        },

        {
          text: '📦&nbsp;&nbsp; Components',
          collapsed: false,
          items: components,
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/selemondev/spark-ui' },
      { icon: 'twitter', link: 'https://twitter.com/selemondev' },
      { icon: 'discord', link: 'https://discord.com/invite/87p2vpsat5' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-PRESENT Selemon Brahanu.',
    },
  },
  markdown: {
    config: (md) => {
      applyPlugins(md)
      md.use(groupIconMdPlugin)
    },
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },

  },
})
