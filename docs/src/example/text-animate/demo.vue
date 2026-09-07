<script setup lang="ts">
import { ref } from "vue";
import TextAnimate from "./text-animate.vue";

const animations = [
  "fadeIn",
  "blurIn",
  "blurInUp",
  "blurInDown",
  "slideUp",
  "slideDown",
  "slideLeft",
  "slideRight",
  "scaleUp",
  "scaleDown",
] as const;
const animation = ref<(typeof animations)[number]>("blurInUp");
const by = ref<"text" | "word" | "character" | "line">("character");
const replay = ref(0);
</script>

<template>
  <div class="w-[min(520px,70vw)] space-y-8 py-12">
    <div class="flex flex-wrap justify-center gap-3 text-sm">
      <label
        >Animation
        <select v-model="animation" class="rounded border bg-background p-1">
          <option v-for="name in animations" :key="name">{{ name }}</option>
        </select></label
      >
      <label
        >Split by
        <select v-model="by" class="rounded border bg-background p-1">
          <option>text</option>
          <option>word</option>
          <option>character</option>
          <option>line</option>
        </select></label
      >
      <button class="rounded border px-3 py-1" @click="replay++">Replay</button>
    </div>
    <TextAnimate
      :key="animation + by + replay"
      :animation="animation"
      :by="by"
      once
      class="text-center text-3xl font-semibold sm:text-4xl"
      >{{ "Bring your words to life.\nOne moment at a time." }}</TextAnimate
    >
  </div>
</template>
