# Kinetic Text

A text component that animates the font weight of characters on hover.

<demo src="../../src/example/kinetic-text/demo.vue" srcCode="../../src/spark-ui-demos/kinetic-text/kinetic-text.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [kinetic-text.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface KineticTextProps {
  text: string;
  as?: As;
  class?: string;
  style?: string | Record<string, string>;
}

const props = withDefaults(defineProps<KineticTextProps>(), {
  as: "h1",
});

const letters = computed(() =>
  props.text.split("").map((letter) => (letter === " " ? " " : letter)),
);
</script>

<template>
  <component
    :is="props.as"
    :class="cn('kinetic-text flex flex-wrap font-[300]', props.class)"
    :style="props.style"
  >
    <span v-for="(letter, i) in letters" :key="i" aria-hidden="true" class="kinetic-text__char">{{
      letter
    }}</span>
    <span class="sr-only">{{ props.text }}</span>
  </component>
</template>

<style scoped>
.kinetic-text {
  --hover-padding: calc(1em / 12);
  --text-stroke-width: calc(1em * 125 / 6000);
}

.kinetic-text__char {
  will-change:
    font-weight,
    -webkit-text-stroke-width,
    padding;
  -webkit-text-stroke-color: transparent;
  -webkit-text-stroke-width: var(--text-stroke-width);
  transition:
    font-weight 0.4s,
    -webkit-text-stroke-color 0.4s,
    padding 0.4s;
}

/* Hovered character: heaviest weight + visible stroke + padding */
.kinetic-text__char:hover {
  padding-inline: var(--hover-padding);
  font-weight: 900;
  -webkit-text-stroke-color: currentColor;
  -webkit-text-stroke-width: calc(var(--text-stroke-width) * 2);
}

/* The character immediately after the hovered one */
.kinetic-text__char:hover + .kinetic-text__char {
  padding-inline: var(--hover-padding);
  font-weight: 600;
}

/* The character two positions after the hovered one */
.kinetic-text__char:hover + .kinetic-text__char + .kinetic-text__char {
  font-weight: 400;
}

/* The character immediately before the hovered one */
.kinetic-text__char:has(+ .kinetic-text__char:hover) {
  padding-inline: var(--hover-padding);
  font-weight: 600;
}

/* The character two positions before the hovered one */
.kinetic-text__char:has(+ .kinetic-text__char + .kinetic-text__char:hover) {
  font-weight: 400;
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import KineticText from "@/components/spark-ui/kinetic-text/kinetic-text.vue";
</script>

<template>
  <KineticText text="some text" />
</template>
```

## Props

| Prop    | Type                                                            | Default | Description                                         |
| ------- | --------------------------------------------------------------- | ------- | --------------------------------------------------- |
| `text`  | `string`                                                        | `-`     | The text content to render with the kinetic effect. |
| `as`    | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p" \| "span"` | `"h1"`  | The HTML element to render as.                      |
| `class` | `string`                                                        | `-`     | Additional class names for the wrapper element.     |

## Credits

- Credit to [@abdmjd1](https://github.com/abdmjd1)
