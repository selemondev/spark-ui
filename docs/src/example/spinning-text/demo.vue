<script setup lang="ts">
import { ref } from "vue";
import SpinningText from "./spinning-text.vue";

const reverse = ref(false);
</script>

<template>
  <div class="flex w-[min(440px,70vw)] flex-col items-center gap-6 py-8">
    <div class="flex h-60 w-full items-center justify-center">
      <SpinningText :reverse="reverse" :duration="10" :radius="5" class-name="text-xl font-medium">
        learn more · earn more · grow more ·
      </SpinningText>
    </div>
    <button class="rounded-md border px-3 py-1.5 text-sm" type="button" @click="reverse = !reverse">
      {{ reverse ? "Rotate clockwise" : "Rotate counterclockwise" }}
    </button>
  </div>
</template>
