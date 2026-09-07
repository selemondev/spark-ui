<script setup lang="ts">
import WordRotate from "../../components/spark-ui/word-rotate/word-rotate.vue";
</script>

<template>
  <div class="flex min-h-48 w-[min(440px,70vw)] items-center justify-center">
    <WordRotate
      :words="['Word', 'Rotate']"
      class-name="text-4xl font-bold text-black dark:text-white"
    />
  </div>
</template>
