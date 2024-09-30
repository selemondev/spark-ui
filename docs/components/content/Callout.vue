<script setup lang="ts">
defineProps<{
  icon?: string
  to?: string
  target?: string
}>()
</script>

<template>
  <Alert :icon="icon" :to="to" :target="target">
    <slot />
  </Alert>
</template>
