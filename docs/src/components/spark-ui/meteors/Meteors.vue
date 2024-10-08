<script setup lang='ts'>
import { ref, watch } from 'vue'
import { cn } from '../../../lib/utils'

interface MeteorsProps {
  number?: number
}

const props = withDefaults(defineProps<MeteorsProps>(), {
  number: 20,
})

const meteorStyles = ref()

watch(() => props.number, (val) => {
  const styles = [...Array.of(val)].map(() => ({
    top: -5,
    left: `${Math.floor(Math.random() * window.innerWidth)}px`,
    animationDelay: `${Math.random() * 1 + 0.2}s`,
    animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
  }))
  meteorStyles.value = styles
}, {
  deep: true,
  immediate: true,
})
</script>

<template>
  <div v-for="(style, idx) in meteorStyles" :key="idx" class="absolute">
    <span
      :key="idx" :class="cn(
        'pointer-events-none absolute left-1/2 top-1/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
      )" :style="style"
    >
      <div
        class="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent"
      />
    </span>
  </div>
</template>
