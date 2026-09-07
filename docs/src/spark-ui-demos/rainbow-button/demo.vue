<script setup lang="ts">
import { ref } from "vue";
import RainbowButton from "../../components/spark-ui/rainbow-button/rainbow-button.vue";

const clicks = ref(0);
</script>

<template>
  <div class="flex w-[min(440px,70vw)] flex-col items-center gap-8 py-8">
    <RainbowButton @click="clicks++">Get Unlimited Access</RainbowButton>
    <RainbowButton variant="outline" @click="clicks++">Outline variant</RainbowButton>
    <p class="text-sm text-muted-foreground" aria-live="polite">Clicks: {{ clicks }}</p>
  </div>
</template>
