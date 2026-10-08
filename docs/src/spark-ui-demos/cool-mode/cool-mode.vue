<script setup lang="ts">
import { ref } from "vue";
import CoolMode from "../../components/spark-ui/cool-mode/cool-mode.vue";

const area = ref<HTMLElement | null>(null);
</script>

<template>
  <div
    ref="area"
    class="relative flex size-full min-h-[400px] items-center justify-center overflow-hidden"
  >
    <CoolMode :container="area">
      <button
        class="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Click Me!
      </button>
    </CoolMode>
  </div>
</template>
