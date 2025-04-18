# Aurora Text

A beautiful aurora text effect

<demo src="../../src/example/aurora/Demo.vue" srcCode="../../src/spark-ui-demos/aurora/Demo.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group
```vue [AuroraText.vue]
<script setup lang='ts'>
interface AuroraTextProps {
    className?: string;
    colors?: string[];
    speed?: number;
}
const props = withDefaults(defineProps<AuroraTextProps>(), {
    colors: () => (["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]),
    speed: 1,
});
const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${props.colors.join(", ")}, ${props.colors[0]
        })`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${10 / props.speed}s`,
};
</script>

<template>
    <span :class="`relative inline-block ${props.className}`">
        <span class="sr-only">
            <slot />
        </span>
        <span class="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent" :style="gradientStyle"
            aria-hidden="true">
            <slot />
        </span>
    </span>
</template>
```

```js [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      animation: {
        "aurora": 'aurora 8s ease-in-out infinite alternate',
      },
      keyframes: {
        'aurora': {
          '0%': {
            backgroundPosition: '0% 50%',
            transform: 'rotate(-5deg) scale(0.9)',
          },
          '25%': {
            backgroundPosition: '50% 100%',
            transform: 'rotate(5deg) scale(1.1)',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            transform: 'rotate(-3deg) scale(0.95)',
          },
          '75%': {
            backgroundPosition: '50% 0%',
            transform: 'rotate(3deg) scale(1.05)',
          },
          '100%': {
            backgroundPosition: '0% 50%',
            transform: 'rotate(-5deg) scale(0.9)',
          },
        },
      },
    },
  },
}
```
:::


## Props

| Prop               | Type   | Description                                         | Default |
| ------------------ | ------ | --------------------------------------------------- | ------- |
| className          | string | The class for the component.                        | -       |
| colors             | string[]| Array of colors used for the aurora effect         | ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]      |
| speed              | number | Animation speed multiplier (1 is default, 2 is twice as fast) | 1       |