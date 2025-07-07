<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  href?: string
  to?: string
  variant?: 'primary' | 'secondary' | 'dark' | 'gradient'
  className?: string
}>()

const baseStyles = 'px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center'

const variantStyles: Record<string, string> = {
  primary: 'shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
  secondary: 'bg-transparent shadow-none dark:text-white',
  dark: 'bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
  gradient: 'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]',
}

const classes = computed(() => {
  return [baseStyles, props.variant && variantStyles[props.variant], props.className].filter(Boolean).join(' ')
})

// Determine whether to use router-link or regular anchor tag
const isRouterLink = computed(() => props.to !== undefined)
</script>

<template>
  <RouterLink v-if="isRouterLink" :to="to ?? ''" :class="classes">
    <slot />
  </RouterLink>
  <a v-else :href="href || '#'" :class="classes">
    <slot />
  </a>
</template>
