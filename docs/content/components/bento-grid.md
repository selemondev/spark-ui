# Bento Grid

Bento grid is a layout used to showcase the features of a product in a simple and elegant way.

<demo src="../../src/example/bento/Demo.vue" srcCode="../../src/spark-ui-demos/bento/BentoGrid.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [BentoCard.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'

const props = defineProps<{
  name: string
  class?: string
}>()

const className = cn(
  'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
  // light styles
  'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
  // dark styles
  'transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',

  props.class
)
</script>

<template>
  <div :key="props.name" :class="className">
    <slot />
  </div>
</template>
```

```vue [BentoGrid.vue]
<script setup lang='ts'>
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
const classStyle = cn(
  'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
  props.class,
)
</script>

<template>
  <div :class="classStyle">
    <slot />
  </div>
</template>
```

:::
