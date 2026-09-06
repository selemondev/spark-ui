<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AnimatedCircularProgressBar from "./animated-circular-progress-bar.vue";

const value = ref(0);
let interval: ReturnType<typeof setInterval> | undefined;

const increment = () => {
  value.value = value.value === 100 ? 0 : value.value + 10;
};

onMounted(() => {
  increment();
  interval = setInterval(increment, 2000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <AnimatedCircularProgressBar
    aria-label="Example progress"
    :value="value"
    gauge-primary-color="rgb(79 70 229)"
    gauge-secondary-color="rgba(0, 0, 0, 0.1)"
  />
</template>
