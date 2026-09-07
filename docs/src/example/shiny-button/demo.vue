<script setup lang="ts">
import { ref } from "vue";
import ShinyButton from "./shiny-button.vue";

const clicks = ref(0);
</script>

<template>
  <div class="flex w-[min(440px,70vw)] flex-col items-center gap-5 py-8">
    <ShinyButton type="button" @click="clicks++">Shiny Button</ShinyButton>
    <p class="text-sm text-neutral-500" aria-live="polite">Clicked {{ clicks }} times</p>
  </div>
</template>
