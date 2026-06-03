<script setup lang="ts">
import type { MotionProps } from "motion-v";
import { motion } from "motion-v";
import { cn } from "../../lib/utils";

interface AnimatedSpanProps extends MotionProps {
  delay?: number;
  className?: string;
}
const props = withDefaults(defineProps<AnimatedSpanProps>(), {
  delay: 0,
});
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: -5 }"
    :animate="{
      opacity: 1,
      y: 0,
    }"
    :transition="{
      duration: 0.3,
      delay: props.delay / 1000,
    }"
    :class="cn('grid text-sm font-normal tracking-tight', props.className)"
  >
    <slot />
  </motion.div>
</template>
