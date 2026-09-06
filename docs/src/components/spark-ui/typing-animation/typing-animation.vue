<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { cn } from "../../../lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  class?: string;
}

const props = withDefaults(defineProps<TypingAnimationProps>(), {
  duration: 300,
});

const displayedText = ref("");

onMounted(() => {
  watch(
    () => [props.text, props.duration] as const,
    ([text, duration], _previous, onCleanup) => {
      displayedText.value = "";
      if (!text) return;

      let index = 0;
      const timer = setInterval(() => {
        displayedText.value = text.slice(0, ++index);
        if (index >= text.length) clearInterval(timer);
      }, duration);
      onCleanup(() => clearInterval(timer));
    },
    { immediate: true },
  );
});

const className = computed(() =>
  cn(
    "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm dark:text-white",
    props.class,
  ),
);
</script>

<template>
  <h1 :class="className">
    {{ displayedText }}
  </h1>
</template>
