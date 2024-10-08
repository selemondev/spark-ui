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
      link: /guide/getting-started/#introduction
    - theme: alt
      text: Why Spark UI?
      link: /guide/getting-started/#why-spark-ui
    - theme: alt
      text: View Components
      link: /guide/components/accordion.html

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
    title: On Demand Import
    details: Spark UI comes with an intelligent resolver that automatically imports only used components.
    link: "#"
  - icon: 📦
    title: Diverse Component Selection
    details: Create your application effortlessly with our expansive collection of 50+ UI components.
    link: "#"
  - icon: ⚡️
    title: Powerful Tools
    details: Spark UI is built on top of powerful tools such as TailwindCss, VueUse, Headless UI etc.
    link: "#"
  - icon: 🎨
    title: Themeable
    details: Customize any part of our beautiful components to match your style.
    link: "#"
---

<script setup>
import Demos from './src/components/Demos.vue'
</script>

<Demos />

<demo src="./src/example/animatedBeamDemo/Demo.vue" />

<demo src="./src/example/beam/Demo.vue" />

<demo src="./src/example/animatedGradientText/Demo.vue" />

<demo src="./src/example/skewedInfiniteScroll/Demo.vue" />

<demo src="./src/example/letterUp/Demo.vue" />

<demo src="./src/example/animatedShinyText/Demo.vue" />

<demo src="./src/example/bento/Demo.vue" />

<demo src="./src/example/blurFade/Demo.vue" />

<demo src="./src/example/blurIn/Demo.vue" />

<demo src="./src/example/Globe/Demo.vue" />

<demo src="./src/example/GradualSpacing/Demo.vue" />

<demo src="./src/example/retroGrid/Demo.vue" />

<demo src="./src/example/orbitingCircles/Demo.vue" />

<demo src="./src/example/meteors/Demo.vue" />

<demo src="./src/example/typingAnimation/Demo.vue" />

<demo src="./src/example/marquee/Demo.vue" />

<demo src="./src/example/ripple/Demo.vue" />

<demo src="./src/example/particles/Demo.vue" />

<demo src="./src/example/dotPattern/Demo.vue" />

<demo src="./src/example/avatarCircle/Demo.vue" />
