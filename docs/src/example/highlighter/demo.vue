<script setup lang="ts">
import Highlighter from "./highlighter.vue";
</script>

<template>
  <div class="px-6 text-center">
    <p class="max-w-[500px] text-lg leading-relaxed">
      The
      <Highlighter action="underline" color="#FF9800"> Spark UI Highlighter </Highlighter>
      makes important
      <Highlighter action="highlight" color="#87CEFA"> text stand out </Highlighter>
      effortlessly.
    </p>
  </div>
</template>
