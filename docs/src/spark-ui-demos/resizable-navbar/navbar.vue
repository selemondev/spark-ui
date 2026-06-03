<script setup lang="ts">
import type { Slot } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  className?: string
}>()

const navbarRef = ref(null)
const visible = ref(false)

function handleScroll() {
  if (window.scrollY > 100) {
    visible.value = true
  }
  else {
    visible.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function provide(slot?: Slot) {
  if (!slot)
    return
  return {
    visible: visible.value,
  }
}
</script>

<template>
  <div
    ref="navbarRef"
    class="sticky inset-x-0 top-10 z-40 w-full"
    :class="props.className"
  >
    <slot v-bind="provide($slots?.default)" />
  </div>
</template>
