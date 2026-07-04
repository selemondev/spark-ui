<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import AnimatedThemeToggler from "./animated-theme-toggler.vue";

const { isDark } = useData();
const theme = computed(() => (isDark.value ? "dark" : "light"));

const onThemeChange = (next: "light" | "dark") => {
  isDark.value = next === "dark";
};
</script>

<template>
  <div class="flex items-center justify-center p-6">
    <AnimatedThemeToggler
      variant="star"
      class="inline-flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 [&>svg]:size-5"
      :theme="theme"
      @theme-change="onThemeChange"
    />
  </div>
</template>
