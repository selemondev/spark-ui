<script setup lang="ts">
import { AnimatePresence, motion, type Options } from "motion-v";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "../../lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: Options;
  className?: string;
}
const props = withDefaults(defineProps<WordRotateProps>(), {
  duration: 2500,
  motionProps: () => ({
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  }),
});
const index = ref(0);
const word = computed(() => props.words[index.value] ?? "");
let interval: ReturnType<typeof setInterval> | undefined;
let mounted = false;

function start() {
  clearInterval(interval);
  if (props.words.length < 2) return;
  interval = setInterval(() => {
    index.value = (index.value + 1) % props.words.length;
  }, props.duration);
}
onMounted(() => {
  mounted = true;
  start();
});
watch(
  () => props.words,
  () => {
    index.value = 0;
    if (mounted) start();
  },
  { deep: true },
);
watch(
  () => props.duration,
  () => {
    if (mounted) start();
  },
);
onBeforeUnmount(() => {
  mounted = false;
  clearInterval(interval);
});
</script>

<template>
  <div class="overflow-hidden py-2">
    <span class="sr-only">{{ props.words.join(", ") }}</span>
    <AnimatePresence mode="wait">
      <motion.h1
        v-if="props.words.length"
        :key="word"
        :class="cn(props.className)"
        v-bind="props.motionProps"
        aria-hidden="true"
      >
        {{ word }}
      </motion.h1>
    </AnimatePresence>
  </div>
</template>
