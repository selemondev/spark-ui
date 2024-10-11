<script setup lang="ts">
import { ref } from 'vue'
import Nuxt from '../../components/icons/Nuxt.vue'
import Vue from '../../components/icons/Vue.vue'
import AnimatedBeam from '../../components/spark-ui/animatedBeam/AnimatedBeam.vue'
import Circle from '../../components/spark-ui/animatedBeam/Circle.vue'

const containerRef = ref<HTMLDivElement>()
const div1Ref = ref()
const div2Ref = ref()
</script>

<template>
  <div class="grid place-items-center min-h-screen w-full">
    <div
      ref="containerRef"
      class="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
    >
      <div class="flex size-full flex-col items-stretch justify-between gap-10">
        <div class="flex flex-row justify-between">
          <Circle ref="div1Ref">
            <Vue />
          </Circle>
          <Circle ref="div2Ref">
            <Nuxt />
          </Circle>
        </div>
      </div>
      <AnimatedBeam :duration="3" :container-ref="containerRef" :from-ref="div1Ref" :to-ref="div2Ref" />
    </div>
  </div>
</template>
