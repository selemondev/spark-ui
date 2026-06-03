<script setup lang="ts">
const props = defineProps<{
  className?: string
}>()
</script>

<template>
  <div class="flex w-full flex-row items-center justify-between" :class="[props.className]">
    <slot />
  </div>
</template>
