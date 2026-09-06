# Blur Fade

Blur fade in and out animation. Used to smoothly fade in and out content.

<demo src="../../src/example/blur-fade/demo.vue" srcCode="../../src/spark-ui-demos/blur-fade/blur-fade.vue" />

## Installation

This component uses the `v-motion` directive from `@vueuse/motion`; register `MotionPlugin` as described in [Getting Started](../guide/getting-started/installation.md).

Copy the following files into `src/components/spark-ui/blur-fade/`:

```vue [blur-fade.vue]
<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";

interface BlurFadeProps {
  class?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
    enter: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  blur?: string;
  inViewMargin?: string;
}

const props = withDefaults(defineProps<BlurFadeProps>(), {
  duration: 0.4,
  delay: 500,
  yOffset: 6,
  inView: false,
  inViewMargin: "-50px",
  blur: "6px",
});

const elementRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const combinedVariants = computed(() => {
  const shown = {
    y: -props.yOffset,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: props.delay,
      duration: props.duration * 1000,
      ease: "easeIn",
    },
  };
  return (
    props.variant ?? {
      hidden: { y: props.yOffset, opacity: 0, filter: `blur(${props.blur})` },
      visible: shown,
      enter: shown,
    }
  );
});

// The directive captures its binding once, so keep this reactive object stable.
const motionVariants = reactive({
  initial: computed(() => combinedVariants.value.hidden),
  enter: computed(() => {
    if (!props.inView) return combinedVariants.value.enter;
    return isVisible.value ? combinedVariants.value.visible : combinedVariants.value.hidden;
  }),
});

watch(
  [elementRef, () => props.inView, () => props.inViewMargin],
  ([element, inView, rootMargin], _, onCleanup) => {
    isVisible.value = false;
    if (!element || !inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) isVisible.value = entry.isIntersecting;
      },
      { rootMargin },
    );
    observer.observe(element);
    onCleanup(() => observer.disconnect());
  },
  { flush: "post" },
);
</script>

<template>
  <div ref="elementRef" v-motion="motionVariants" :class="props.class">
    <slot />
  </div>
</template>
```

## Props

| Prop         | Type    | Description                                            | Default |
| ------------ | ------- | ------------------------------------------------------ | ------- |
| class        | string  | The class name to be applied to the component          |         |
| variant      | object  | Custom animation variants for motion component         |         |
| duration     | number  | Duration (seconds) for the animation                   | 0.4     |
| delay        | number  | Delay in milliseconds before the animation starts      | 500     |
| yOffset      | number  | Vertical offset for the animation                      | 6       |
| inView       | boolean | Whether to trigger animation when component is in view | false   |
| inViewMargin | string  | IntersectionObserver root margin; updates reactively   | "-50px" |
| blur         | string  | Amount of blur to apply during the animation           | "6px"   |

`duration` is in seconds; `delay` is in milliseconds to match the existing demos. With `inView`, the animation returns to its hidden variant when it leaves the observer region. Custom `variant` objects replace the defaults and control their own transitions. Motion props and replacement variants update without remounting.
