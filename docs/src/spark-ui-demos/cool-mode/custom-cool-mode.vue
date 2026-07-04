<script setup lang="ts">
import CoolMode from "../../components/spark-ui/cool-mode/cool-mode.vue";
</script>

<template>
  <div class="relative flex items-center justify-center">
    <CoolMode
      :options="{
        particle: 'https://avatars.githubusercontent.com/u/81306489',
      }"
    >
      <button
        class="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Click Me!
      </button>
    </CoolMode>
  </div>
</template>
