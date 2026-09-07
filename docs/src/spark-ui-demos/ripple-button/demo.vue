<script setup lang="ts">
import { ref } from "vue";
import RippleButton from "../../components/spark-ui/ripple-button/ripple-button.vue";

const clicks = ref(0);
</script>

<template>
  <div class="flex w-[min(440px,70vw)] flex-col items-center gap-6 py-8">
    <RippleButton ripple-color="#ADD8E6" @click="clicks++">Click me</RippleButton>
    <RippleButton disabled ripple-color="#ADD8E6" @click="clicks++">Disabled</RippleButton>
    <p class="text-sm text-muted-foreground" aria-live="polite">Clicks: {{ clicks }}</p>
  </div>
</template>
