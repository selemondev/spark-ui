<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import AnimatedGradientText from '../../components/spark-ui/animatedGradientText/animatedGradientText.vue'
import { cn } from '../../lib/utils'
</script>

<template>
  <AnimatedGradientText>
    🎉
    <hr class="mx-2 h-4 w-[1px] shrink-0 bg-gray-300">
    <span
      :class="cn(
        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
      )"
    >
      Introducing Spark UI
    </span>
    <Icon
      icon="ic:sharp-keyboard-arrow-right"
      class="ml-1 size-3 transition-transform w-4 h-4 text-black dark:text-white duration-300 ease-in-out group-hover:translate-x-0.5"
    />
  </AnimatedGradientText>
</template>

<style>
.animate-gradient {
  background-size: var(--bg-size);
  animation: gradientAnimation 8s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: var(--bg-size) 0;
  }

  50% {
    background-position: 0 0;
  }

  100% {
    background-position: var(--bg-size) 0;
  }
}
</style>
