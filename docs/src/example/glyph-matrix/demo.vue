<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import GlyphMatrix from "./glyph-matrix.vue";

const { isDark } = useData();

// Drive the glyph color from the resolved theme so it adapts to light/dark.
const color = computed(() => (isDark.value ? "#ffffff" : "#000000"));
</script>

<template>
  <div
    class="relative h-[400px] w-[300px] md:w-[600px] overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <GlyphMatrix
      glyphs="01·•+*/\<>="
      :cell-size="14"
      :mutation-rate="0.04"
      :interval="90"
      :fade-bottom="0.6"
      :color="color"
    />
  </div>
</template>
