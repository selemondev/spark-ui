<script setup lang="ts">
import ConfettiButton from "./confetti-button.vue";

const options = {
  get angle() {
    return Math.random() * 360;
  },
};
</script>

<template>
  <div class="relative">
    <ConfettiButton :options="options">Random Confetti 🎉</ConfettiButton>
  </div>
</template>
