<script setup lang="ts">
import TextReveal from "../../components/spark-ui/text-reveal/text-reveal.vue";
</script>

<template>
  <div class="w-[min(600px,70vw)]">
    <p class="py-4 text-center text-sm text-muted-foreground">
      Scroll inside the box to reveal the words. Scroll up to hide them.
    </p>
    <div class="relative h-[340px] overflow-y-auto">
      <TextReveal class="h-[680px]">Spark UI will change the way you design.</TextReveal>
    </div>
  </div>
</template>
