<script setup lang='ts'>
import { ref } from 'vue'

const circleRef = ref()

defineExpose({
  circleRef,
})
</script>

<template>
  <div
    ref="circleRef"
    class="z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
  >
    <slot />
  </div>
</template>
