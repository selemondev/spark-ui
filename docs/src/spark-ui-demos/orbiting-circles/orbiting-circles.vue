<script setup lang="ts">
import OrbitingCircles from "../../components/spark-ui/orbiting-circles/orbiting-circles.vue";
</script>

<template>
  <div
    class="relative flex h-[500px] w-[300px] md:w-[600px] flex-col items-center justify-center overflow-hidden"
  >
    <span
      class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black"
    >
      Circle
    </span>

    <OrbitingCircles
      class="size-[30px] border-none bg-transparent"
      :duration="20"
      :delay="10"
      :radius="70"
    >
      <svg
        viewBox="0 0 24 24"
        class="size-full"
        aria-hidden="true"
        fill="currentColor"
        style="color: #00dc82"
      >
        <path d="m12 4 10 16H2Z" />
      </svg>
    </OrbitingCircles>

    <OrbitingCircles
      class="size-[30px] border-none bg-transparent"
      :duration="20"
      :delay="10"
      :radius="100"
      reverse
    >
      <svg
        viewBox="0 0 24 24"
        class="size-full"
        aria-hidden="true"
        fill="currentColor"
        style="color: #fb7185"
      >
        <path d="m13 2-9 12h7l-1 8 10-13h-7Z" />
      </svg>
    </OrbitingCircles>

    <OrbitingCircles class="size-[50px]" :radius="190" :duration="20" reverse>
      <svg
        viewBox="0 0 24 24"
        class="size-full"
        aria-hidden="true"
        fill="currentColor"
        style="color: #a855f7"
      >
        <path d="m3 3 9 18L21 3l-9 4Z" />
      </svg>
    </OrbitingCircles>

    <OrbitingCircles class="size-[50px]" :radius="145" :duration="20">
      <svg
        viewBox="0 0 24 24"
        class="size-full"
        aria-hidden="true"
        fill="currentColor"
        style="color: #84cc16"
      >
        <path d="m4 12 5 5L20 6" fill="none" stroke="currentColor" stroke-width="3" />
      </svg>
    </OrbitingCircles>

    <OrbitingCircles
      class="size-[30px] border-none bg-transparent"
      :duration="40"
      :delay="10"
      :radius="45"
      reverse
    >
      <svg
        viewBox="0 0 24 24"
        class="size-full"
        aria-hidden="true"
        fill="currentColor"
        style="color: #41b883"
      >
        <path d="m2 3 10 18L22 3h-6l-4 7-4-7Z" />
      </svg>
    </OrbitingCircles>
  </div>
</template>
