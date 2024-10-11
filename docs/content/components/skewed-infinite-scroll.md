# Skewed Infinite Scroll

The Skewed Infinite Scroll Component adds a dynamic visual effect to your content as it scrolls continuously.

<demo src="../../src/example/skewedInfiniteScroll/Demo.vue" srcCode="../../src/spark-ui-demos/skewedInfiniteScroll/SkewedInfiniteScroll.vue" />

## Installation

Copy and paste the following code into your project:

```vue [SkewedInfiniteScroll.vue]
<script setup lang='ts'>
const props = defineProps<{
  items: { id: string, text: string }[]
}>()
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="relative w-full max-w-screen-lg overflow-hidden" :style="{
        maskComposite: 'intersect',
        maskImage: `
          linear-gradient(to right,  transparent, black 5rem),
          linear-gradient(to left,   transparent, black 5rem),
          linear-gradient(to bottom, transparent, black 5rem),
          linear-gradient(to top,    transparent, black 5rem)
        `,
      }"
    >
      <div class="mx-auto grid animate-skew-scroll grid-cols-1 gap-5 sm:grid-cols-2">
        <div v-for="item in props.items" :key="item.id">
          <div
            :key="item.id"
            class="flex cursor-pointer w-72 p-6 items-center space-x-2 rounded-md border border-gray-100 dark:border-gray-800 px-5 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="currentColor" stroke="white" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" class="h-6 w-6 flex-none text-red-500"
            >
              <path
                d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
              />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p class="text-gray-600">
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

Add the following animations to your `tailwind.config.js` file:

```js{4,5,6,7,8,9,10,11,12,13,14,15,16,17,18} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      animation: {
        'skew-scroll': 'skew-scroll 20s linear infinite',
      },
      keyframes: {
        'skew-scroll': {
          '0%': {
            transform:
              'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)',
          },
          '100%': {
            transform:
              'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)',
          },
        },
      },
    },
  },
};
```

## Props

| Prop  | Type  | Description       | Default |
| ----- | ----- | ----------------- | ------- |
| items | array | An array of items | ""      |
