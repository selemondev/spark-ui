<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import GlyphMatrix from "../../components/spark-ui/glyph-matrix/glyph-matrix.vue";

const { isDark } = useData();

const color = computed(() => (isDark.value ? "#ffffff" : "#000000"));
</script>

<template>
  <div
    class="relative h-[400px] w-full overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <GlyphMatrix :color="color" />
  </div>
</template>
