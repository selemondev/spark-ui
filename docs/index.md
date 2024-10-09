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
import Demos from './src/components/Demos.vue'
import { ref } from "vue";

</script>

<Demos />

<demo src="./src/example/animatedList/Demo.vue" srcCode="./src/spark-ui-demos/blurIn/BlurIn.vue" />

<demo src="./src/example/animatedBeam/Demo.vue" srcCode="./src/components/Demos.vue" />

<demo src="./src/example/animatedGradientText/Demo.vue" srcCode="./src/components/Demos.vue" />

<demo src="./src/example/skewedInfiniteScroll/Demo.vue" srcCode="./src/components/Demos.vue" />

<demo src="./src/example/letterUp/Demo.vue" srcCode="./src/components/Demos.vue" />

<demo src="./src/example/animatedShinyText/Demo.vue" srcCode="./src/components/Demos.vue" />

<demo src="./src/example/bento/Demo.vue" srcCode="./src/components/Demos.vue" />

<demo src="./src/example/blurFade/Demo.vue" srcCode="./src/components/Demos.vue" />

<demo src="./src/example/blurIn/Demo.vue" srcCode="./src/components/Demos.vue" />

<demo src="./src/example/Globe/Demo.vue" srcCode="./src/components/Demos.vue" />

<!-- <demo src="./src/example/GradualSpacing/Demo.vue" />

<demo src="./src/example/retroGrid/Demo.vue" />

<demo src="./src/example/orbitingCircles/Demo.vue" />

<demo src="./src/example/meteors/Demo.vue" />

<demo src="./src/example/typingAnimation/Demo.vue" />

<demo src="./src/example/marquee/Demo.vue" />

<demo src="./src/example/ripple/Demo.vue" />

<demo src="./src/example/particles/Demo.vue" />

<demo src="./src/example/dotPattern/Demo.vue" />

<demo src="./src/example/avatarCircle/Demo.vue" /> -->
