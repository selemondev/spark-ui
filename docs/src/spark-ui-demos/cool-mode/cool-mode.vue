<script setup lang="ts">
import CoolMode from "../../components/spark-ui/cool-mode/cool-mode.vue";
</script>

<template>
  <div class="relative flex items-center justify-center">
    <CoolMode>
      <button
        class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Click Me!
      </button>
    </CoolMode>
  </div>
</template>
