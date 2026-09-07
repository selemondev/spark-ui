<script setup lang="ts">
import { provide } from "vue";
import { scrollVelocityKey, useScrollVelocity } from "./scroll-velocity";

defineProps<{ className?: string }>();
provide(scrollVelocityKey, useScrollVelocity());
</script>

<template>
  <div class="relative w-full" :class="className"><slot /></div>
</template>
