import Theme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h, watch } from 'vue'
import DemoBlock from '../components/demo-block'
import './overrides.css'
import './rainbow.css'
import './style.css'
import './tailwind.css'
import 'uno.css'

let homePageStyle: HTMLStyleElement | undefined
export default {
  extend: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router }) {
    app.component('Demo', DemoBlock)
    if (typeof window === 'undefined')
      return

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/'),
      { immediate: true },
    )
  },
}

function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
