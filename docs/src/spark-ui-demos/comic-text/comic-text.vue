<script setup lang="ts">
import ComicText from "../../components/spark-ui/comic-text/comic-text.vue";
</script>

<template>
  <div class="space-y-8 text-center">
    <ComicText :font-size="5" :style="{ fontSize: 'min(5rem, 16vw)' }">BOOM!</ComicText>
  </div>
</template>
