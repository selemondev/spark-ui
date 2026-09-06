<script setup lang="ts">
import { useInView, useMotionValue, useSpring } from "motion-v";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { cn } from "../../lib/utils";

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
const inView = useInView(element, { once: true, margin: "0px" } as Parameters<typeof useInView>[1]);
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
