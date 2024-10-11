<script setup lang='ts'>
import ArrowRight from '../../components/icons/ArrowRight.vue'
import AnimatedGradientText from '../../components/spark-ui/animatedGradientText/animatedGradientText.vue'
import { cn } from '../../lib/utils'
</script>

<template>
  <div class="grid place-items-center min-h-screen w-full">
    <AnimatedGradientText>
      🎉
      <hr class="mx-2 h-4 w-px shrink-0 bg-gray-300">
      <span
        :class="cn(
          `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
        )"
      >
        Introducing Spark UI
      </span>
      <ArrowRight
        class="ml-1 size-3 transition-transform w-5 h-5 text-white duration-300 ease-in-out group-hover:translate-x-0.5"
      />
    </AnimatedGradientText>
  </div>
</template>

## Props

| Prop      | Type   | Description                            | Default |
| --------- | ------ | -------------------------------------- | ------- |
| children  |        | The children passed into the component |         |
| className | string | The class name to be applied.          |         |
