# Interactive Hover Button

A visually engaging button that responds to hover with an expanding-dot transition and sliding text with an arrow, adapting smoothly between light and dark modes.

<demo src="../../src/example/interactive-hover-button/demo.vue" srcCode="../../src/spark-ui-demos/interactive-hover-button/interactive-hover-button.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [interactive-hover-button.vue]
<script setup lang="ts">
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps {
  class?: string;
  [key: string]: any;
}

const props = defineProps<InteractiveHoverButtonProps>();
</script>

<template>
  <button
    v-bind="props"
    :class="
      cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-full border border-solid border-black/10 bg-white p-2 px-6 text-center font-semibold text-black dark:border-white/10 dark:bg-black dark:text-white',
        props.class,
      )
    "
  >
    <div class="flex items-center justify-center gap-2">
      <div
        class="h-2 w-2 rounded-full bg-black transition-all duration-300 group-hover:scale-[100.8] dark:bg-white"
      ></div>
      <span
        class="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        <slot />
      </span>
    </div>
    <div
      class="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100 dark:text-black"
    >
      <span><slot /></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </button>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import InteractiveHoverButton from "@/components/spark-ui/interactive-hover-button/interactive-hover-button.vue";
</script>

<template>
  <InteractiveHoverButton>Hover Me</InteractiveHoverButton>
</template>
```

## Props

| Prop    | Type     | Default | Description                                   |
| ------- | -------- | ------- | --------------------------------------------- |
| `class` | `string` | `-`     | Additional class names to style the component |

Any native `<button>` attributes (e.g. `disabled`, `type`, `@click`) fall through to the underlying element.

## Slots

| Slot      | Description                          |
| --------- | ----------------------------------- |
| `default` | The content displayed in the button |

## Credits

- Credit to [@AayushBharti](https://github.com/AayushBharti)
- Ported from [Magic UI](https://magicui.design/docs/components/interactive-hover-button)
