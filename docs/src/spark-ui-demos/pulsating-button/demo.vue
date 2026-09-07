<script setup lang="ts">
import { ref } from "vue";
import PulsatingButton from "../../components/spark-ui/pulsating-button/pulsating-button.vue";

const clicks = ref(0);
</script>

<template>
  <div class="flex w-[min(440px,70vw)] flex-col items-center gap-8 py-8">
    <PulsatingButton @click="clicks++">Join Affiliate Program</PulsatingButton>
    <PulsatingButton variant="ripple" class="bg-blue-600 text-white" @click="clicks++">
      Ripple variant
    </PulsatingButton>
    <p class="text-sm text-muted-foreground" aria-live="polite">Clicks: {{ clicks }}</p>
  </div>
</template>
