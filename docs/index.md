---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Spark UI"
  text: "Build Animated Sites 10x Faster"
  tagline: Experience The Magic Of Animated Components. Crafted With Vue, TypeScript, TailwindCss And Vueuse Motion ✨
  image:
    src: /icon.png
    alt: Spark UI
  actions:
    - theme: brand
      text: Get Started
      link: /content/guide/getting-started/#introduction
    - theme: alt
      text: Why Spark UI?
      link: /content/guide/getting-started/#why-spark-ui
    - theme: alt
      text: View Components
      link: /content/components/animated-beam.md

features:
  - icon: 🦾
    title: TypeScript Support
    details: Built with TypeScript in mind and from the ground up.
    link: "#"
  - icon: 🔥
    title: Icon
    details: Use any icon in your project from your favourite icon set.
    link: "#"
  - icon: 🛠️
    title: Copy / paste components
    details: Spark UI allows you to easily copy and paste components.
    link: "#"
  - icon: 📦
    title: Diverse Component Selection
    details: Create your application effortlessly with our expansive collection of 20+ UI components.
    link: "#"
  - icon: ⚡️
    title: Powerful Tools
    details: Spark UI is built on top of powerful tools such as TailwindCss, VueUse, @vueuse/motion etc.
    link: "#"
  - icon: 🎨
    title: Themeable
    details: Customize any part of our beautiful components to match your style.
    link: "#"
---

<script setup>
import Demos from './src/components/demos.vue'
</script>

<Demos />

<demo src="./src/example/animated-list/demo.vue" srcCode="./src/example/animated-list/demo.vue" />

<demo src="./src/example/meteors/demo.vue" srcCode="./src/example/meteors/demo.vue" />

<demo src="./src/example/animated-gradient-text/demo.vue" srcCode="./src/example/animated-gradient-text/demo.vue" />

<demo src="./src/example/skewed-infinite-scroll/demo.vue" srcCode="./src/example/skewed-infinite-scroll/demo.vue" />

<demo src="./src/example/animated-shiny-text/demo.vue" srcCode="./src/example/animated-shiny-text/demo.vue" />

<demo src="./src/example/retro-grid/demo.vue" srcCode="./src/example/retro-grid/demo.vue" />

<demo src="./src/example/blur-fade/demo.vue" srcCode="./src/example/blur-fade/demo.vue" />

<demo src="./src/example/blur-in/demo.vue" srcCode="./src/example/blur-in/demo.vue" />

<demo src="./src/example/globe/demo.vue" srcCode="./src/example/globe/demo.vue" />
