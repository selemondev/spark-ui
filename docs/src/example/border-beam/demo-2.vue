<script setup lang="ts">
import BorderBeam from "./border-beam.vue";
</script>

<template>
  <div class="flex items-center justify-center p-2">
    <div
      class="relative w-[350px] overflow-hidden rounded-xl border border-solid border-black/10 bg-white p-6 text-neutral-900 shadow-sm dark:border-white/15 dark:bg-neutral-950 dark:text-neutral-100"
    >
      <div class="space-y-1.5">
        <h3 class="text-lg font-semibold leading-none tracking-tight">Now Playing</h3>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">Stairway to Heaven - Led Zeppelin</p>
      </div>
      <div class="mt-6 flex flex-col items-center gap-4">
        <div class="h-48 w-48 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
        <div class="h-1 w-full rounded-full bg-secondary">
          <div class="h-full w-1/3 rounded-full bg-primary" />
        </div>
        <div class="flex w-full justify-between text-sm text-neutral-500 dark:text-neutral-400">
          <span>2:45</span>
          <span>8:02</span>
        </div>
      </div>
      <BorderBeam :duration="6" :size="400" class="from-transparent via-red-500 to-transparent" />
      <BorderBeam
        :duration="6"
        :delay="3"
        :size="400"
        :border-width="2"
        class="from-transparent via-blue-500 to-transparent"
      />
    </div>
  </div>
</template>
