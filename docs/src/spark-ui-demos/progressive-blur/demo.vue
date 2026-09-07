<script setup lang="ts">
import { ref } from "vue";
import ProgressiveBlur from "../../components/spark-ui/progressive-blur/progressive-blur.vue";

const position = ref<"top" | "bottom" | "both">("bottom");
const preset = ref("smooth");
const presets: Record<string, number[]> = {
  smooth: [0.5, 1, 2, 4, 8, 16, 32, 64],
  short: [1, 4, 12],
  single: [8],
  none: [],
};
</script>

<template>
  <div class="w-[min(460px,75vw)] space-y-4">
    <div class="flex flex-wrap gap-3 text-sm">
      <label class="flex items-center gap-2"
        >Position
        <select
          v-model="position"
          class="rounded-md border border-solid border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="both">Both</option>
        </select>
      </label>
      <label class="flex items-center gap-2"
        >Layers
        <select
          v-model="preset"
          class="rounded-md border border-solid border-neutral-300 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="smooth">Eight</option>
          <option value="short">Three</option>
          <option value="single">One</option>
          <option value="none">None</option>
        </select>
      </label>
    </div>
    <div
      class="relative overflow-hidden rounded-xl border border-solid border-neutral-200 dark:border-neutral-800"
    >
      <div
        tabindex="0"
        role="region"
        aria-label="Scrollable blur example"
        class="h-80 overflow-y-auto"
      >
        <div class="space-y-3 p-4">
          <div
            v-for="index in 20"
            :key="index"
            class="flex h-20 items-center gap-4 rounded-lg border border-solid border-neutral-200 bg-white px-5 dark:border-neutral-700 dark:bg-neutral-900"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
              >{{ index }}</span
            >
            <span class="font-medium">Scroll to see more</span>
          </div>
        </div>
      </div>
      <ProgressiveBlur :position="position" height="35%" :blur-levels="presets[preset]" />
    </div>
  </div>
</template>
