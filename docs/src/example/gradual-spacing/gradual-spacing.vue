<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../lib/utils";

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

const className = computed(() => cn("drop-shadow-sm", props.class));
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
