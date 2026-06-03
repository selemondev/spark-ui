<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  className: String,
  visible: Boolean,
})

const mobileNavStyles = computed(() => {
  return {
    backdropFilter: props.visible ? 'blur(10px)' : 'none',
    boxShadow: props.visible
      ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
      : 'none',
    width: props.visible ? '90%' : '100%',
    paddingRight: props.visible ? '12px' : '0px',
    paddingLeft: props.visible ? '12px' : '0px',
    borderRadius: props.visible ? '4px' : '2rem',
    transform: props.visible ? 'translateY(20px)' : 'translateY(0)',
    transition: 'all 0.3s',
  }
})

const mobileNavClasses = computed(() => {
  return [
    'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden',
    props.visible && 'bg-white/80 dark:bg-neutral-950/80',
    props.className,
  ].filter(Boolean).join(' ')
})
</script>

<template>
  <div :class="mobileNavClasses" :style="mobileNavStyles">
    <slot />
  </div>
</template>
