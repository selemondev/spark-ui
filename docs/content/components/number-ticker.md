# Number Ticker

Count up or down with a spring animation when the number enters the viewport.

<demo src="../../src/example/number-ticker/demo.vue" srcCode="../../src/spark-ui-demos/number-ticker/demo.vue" />

## Installation

Install the animation dependency with `pnpm add motion-v`.

Copy the component into `src/components/spark-ui/number-ticker/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [number-ticker.vue]
<script setup lang="ts">
import { useInView, useMotionValue, useSpring } from "motion-v";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  className?: string;
}
const props = withDefaults(defineProps<NumberTickerProps>(), {
  startValue: 0,
  direction: "up",
  delay: 0,
  decimalPlaces: 0,
});
const element = ref<HTMLSpanElement | null>(null);
const initialValue = computed(() => (props.direction === "down" ? props.value : props.startValue));
const targetValue = computed(() => (props.direction === "down" ? props.startValue : props.value));
const motionValue = useMotionValue(initialValue.value);
const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
const current = ref(initialValue.value);
const inView = useInView(element, { once: true, margin: "0px" });
const formatter = computed(
  () =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: props.decimalPlaces,
      maximumFractionDigits: props.decimalPlaces,
    }),
);
const formatted = computed(() =>
  formatter.value.format(Number(current.value.toFixed(props.decimalPlaces))),
);
const accessibleValue = computed(() => formatter.value.format(targetValue.value));
const unsubscribe = springValue.on("change", (value) => {
  current.value = value;
});

watch(
  [inView, () => props.value, () => props.startValue, () => props.direction, () => props.delay],
  ([visible], _previous, onCleanup) => {
    if (!visible) {
      motionValue.jump(initialValue.value);
      springValue.jump(initialValue.value);
      current.value = initialValue.value;
      return;
    }
    const timer = setTimeout(() => motionValue.set(targetValue.value), props.delay * 1000);
    onCleanup(() => clearTimeout(timer));
  },
  { immediate: true },
);
onBeforeUnmount(() => {
  unsubscribe();
  springValue.destroy();
  motionValue.destroy();
});
</script>

<template>
  <span
    ref="element"
    :class="
      cn('inline-block tracking-wider text-black tabular-nums dark:text-white', props.className)
    "
  >
    <span class="sr-only">{{ accessibleValue }}</span>
    <span aria-hidden="true">{{ formatted }}</span>
  </span>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import NumberTicker from "@/components/spark-ui/number-ticker/number-ticker.vue";
</script>

<template>
  <NumberTicker :value="100" />
  <NumberTicker :value="5.67" :decimal-places="2" />
  <NumberTicker :value="100" :start-value="20" direction="down" />
</template>
```

## Behavior

The animation starts once the number enters the viewport, the visible area of the page. Scrolling away and back does not restart it.

With `direction="up"`, the number moves from `startValue` to `value`. With `direction="down"`, it moves from `value` to `startValue`.

Changes to the target animate from the current number after `delay`. Changes before first visibility update the starting number. The delay uses seconds.

Numbers use English grouping separators and a fixed number of decimal places. Changes to `decimalPlaces` update the display at once.

Screen readers receive the target number without each animation step. The component removes its timer, spring subscription, and viewport observer when it unmounts.

## Props

| Prop            | Type             | Default     | Description                                                              |
| --------------- | ---------------- | ----------- | ------------------------------------------------------------------------ |
| `value`         | `number`         | Required    | End value when counting up, or initial value when counting down.         |
| `startValue`    | `number`         | `0`         | Initial value when counting up, or end value when counting down.         |
| `direction`     | `"up" \| "down"` | `"up"`      | Direction of the count.                                                  |
| `delay`         | `number`         | `0`         | Delay in seconds.                                                        |
| `decimalPlaces` | `number`         | `0`         | Number of decimal places supported by `Intl.NumberFormat` and `toFixed`. |
| `className`     | `string`         | `undefined` | Classes for the number.                                                  |

## Source

Ported from [Magic UI Number Ticker](https://magicui.design/docs/components/number-ticker).
