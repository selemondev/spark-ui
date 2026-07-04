<script setup lang="ts">
import { cn } from "../../lib/utils";
import AnimatedGridPattern from "./animated-grid-pattern.vue";
</script>

<template>
  <div
    class="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20"
  >
    <p
      class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
    >
      Animated Grid Pattern
    </p>
    <AnimatedGridPattern
      :num-squares="30"
      :max-opacity="0.1"
      :duration="3"
      :repeat-delay="1"
      :class="
        cn(
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
        )
      "
    />
  </div>
</template>
