<script setup lang='ts'>
const nuxtFeatures = [
  {
    id: 1,
    feature: 'SSR, SSG, CSR, ISR and Hybrid Rendering.',
  },

  {
    id: 2,
    feature: 'Auto imports.',
  },

  {
    id: 3,
    feature: ' Nuxt Devtools.',
  },

  {
    id: 4,
    feature: ' File-based routing.',
  },

  {
    id: 5,
    feature: 'Simple and powerful modules.',
  },
]
</script>

<template>
  <div>
    <WAccordion>
      <WAccordionItem title="What is Nuxt?">
        <template #leading>
          <WIcon name="logos:nuxt-icon" />
        </template>
        <template #trailing>
          <WIcon name="twemoji:thinking-face" />
        </template>
        <p>
          Nuxt is a popular open-source framework for building server-side rendered (SSR) or statically generated
          (SSG) Vue.js applications. It is built on top of Vue.js and provides additional features and conventions
          to
          simplify the development process of universal Vue applications
        </p>
      </WAccordionItem>
      <WAccordionItem title="What features does Nuxt offer?">
        <template #leading>
          <WIcon name="fxemoji:bolt" />
        </template>
        <template #trailing>
          <WIcon name="twemoji:thinking-face" />
        </template>
        <ul v-for="{ feature, id } in nuxtFeatures" :key="id">
          <li>{{ id }}. {{ feature }}</li>
        </ul>
      </WAccordionItem>
      <WAccordionItem title="Does Nuxt 3 use Vite by default?">
        <template #leading>
          <WIcon name="logos:vitejs" />
        </template>
        <template #trailing>
          <WIcon name="twemoji:thinking-face" />
        </template>
        Yes it does.
      </WAccordionItem>
    </WAccordion>
  </div>
</template>
