<script setup lang="ts">
import { computed, reactive } from "vue";
import { cn } from "../../lib/utils";

interface BlurIntProps {
  word: string;
  class?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}

const props = withDefaults(defineProps<BlurIntProps>(), {
  duration: 500,
});

const defaultVariants = computed(() => ({
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: props.duration,
    },
  },
}));

const combinedVariants = computed(() => props.variant ?? defaultVariants.value);
// Keep the binding stable because the motion directive captures it on creation.
const motionVariants = reactive({
  initial: computed(() => combinedVariants.value.hidden),
  visible: computed(() => combinedVariants.value.visible),
});
const className = computed(() =>
  cn(
    "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
    props.class,
  ),
);
</script>

<template>
  <h1 v-motion="motionVariants" :class="className">
    {{ props.word }}
  </h1>
</template>
