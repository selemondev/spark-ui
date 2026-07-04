<script setup lang="ts">
import BorderBeam from "../../components/spark-ui/border-beam/border-beam.vue";
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <button
      class="relative inline-flex h-11 items-center justify-center overflow-hidden rounded-md border border-solid border-black/15 dark:border-white/20 px-8 text-sm font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
    >
      Buy Now
      <BorderBeam
        :size="40"
        :initial-offset="20"
        class="from-transparent via-yellow-500 to-transparent"
      />
    </button>
  </div>
</template>
