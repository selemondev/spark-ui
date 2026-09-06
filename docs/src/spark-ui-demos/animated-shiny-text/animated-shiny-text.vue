<script setup lang="ts">
import AnimatedShinyText from "../../components/spark-ui/animated-shiny-text/animated-shiny-text.vue";
import { cn } from "../../lib/utils";
</script>

<template>
  <div class="grid place-items-center min-h-screen w-full">
    <div class="z-10 flex min-h-[16rem] items-center justify-center">
      <div
        :class="
          cn(
            'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
          )
        "
      >
        <AnimatedShinyText
          class="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
        >
          <span>✨ Introducing Spark UI</span>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="ml-1 text-neutral-400 w-5 h-5 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
          >
            <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </AnimatedShinyText>
      </div>
    </div>
  </div>
</template>
