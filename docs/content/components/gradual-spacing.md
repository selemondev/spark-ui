# Gradual Spacing

Word animation for gradual spacing between letters

<demo src="../../src/example/gradual-spacing/demo.vue" srcCode="../../src/spark-ui-demos/gradual-spacing/gradual-spacing.vue" />

## Installation

Install `@vueuse/motion` and register its `MotionPlugin` on your Vue app as shown in the [installation guide](/content/guide/getting-started/installation). These components use the `v-motion` directive.

Copy the component files below into `src/components/spark-ui/gradual-spacing/`. Utility imports use `@/lib/utils`.

```vue [gradual-spacing.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface Variants {
  hidden: { opacity: number; x: number };
  visible: { opacity: number; x: number };
}
interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  motionProps?: Variants;
  class?: string;
}

const props = withDefaults(defineProps<GradualSpacingProps>(), {
  duration: 50,
  delayMultiple: 40,
  motionProps: () => ({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }),
});

const letters = computed(() => props.text.split(""));

const className = computed(() => cn("drop-shadow-sm ", props.class));
</script>

<template>
  <h1 class="flex justify-center space-x-1">
    <span class="sr-only">{{ props.text }}</span>
    <span aria-hidden="true" v-for="(char, index) in letters" :key="index">
      <span
        class="inline-block"
        v-motion
        :initial="props.motionProps.hidden"
        :visible="{
          ...props.motionProps.visible,
          transition: {
            duration: props.duration,
            delay: index * props.delayMultiple,
          },
        }"
        :class="className"
      >
        <span v-if="char === ' '">&nbsp;</span>
        <span v-else>{{ char }}</span>
      </span>
    </span>
  </h1>
</template>
```

## Behavior

`text` and `class` update while mounted. The component renders one heading with the complete accessible text; animated letter spans are decorative. Animation durations and delays use milliseconds.

## Props

| Prop          | Type     | Description                                 | Default |
| ------------- | -------- | ------------------------------------------- | ------- |
| class         | string   | The class to be applied to the component    |         |
| duration      | number   | Duration of the animation                   | 50      |
| delayMultiple | number   | Transition delay multiplier.                | 40      |
| text          | string   | Text to animate                             | ""      |
| motionProps   | Variants | An object containing motion animation props | {}      |
