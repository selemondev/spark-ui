<script setup lang="ts">
import TextReveal from "../../components/spark-ui/text-reveal/text-reveal.vue";
</script>

<template>
  <div class="w-[min(600px,70vw)]">
    <p class="py-6 text-center text-sm text-muted-foreground">
      Scroll down to reveal the words. Scroll up to hide them.
    </p>
    <TextReveal>Spark UI will change the way you design.</TextReveal>
  </div>
</template>
