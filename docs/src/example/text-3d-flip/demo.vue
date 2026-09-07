<script setup lang="ts">
import { ref } from "vue";
import Text3DFlip from "./text-3d-flip.vue";

const direction = ref<"top" | "right" | "bottom" | "left">("top");
const stagger = ref<"first" | "last" | "center" | "random">("first");
</script>

<template>
  <div class="w-[min(560px,70vw)] space-y-8 py-12">
    <div class="flex flex-wrap justify-center gap-4 text-sm">
      <label
        >Direction
        <select v-model="direction" class="rounded border bg-background p-1">
          <option>top</option>
          <option>right</option>
          <option>bottom</option>
          <option>left</option>
        </select></label
      >
      <label
        >Stagger
        <select v-model="stagger" class="rounded border bg-background p-1">
          <option>first</option>
          <option>last</option>
          <option>center</option>
          <option>random</option>
        </select></label
      >
    </div>
    <Text3DFlip
      tabindex="0"
      class="justify-center bg-background text-center font-serif text-3xl sm:text-5xl"
      text-class-name="bg-background text-foreground"
      flip-text-class-name="bg-background text-violet-500"
      :rotate-direction="direction"
      :stagger-duration="0.03"
      :stagger-from="stagger"
      :transition="{ type: 'spring', damping: 25, stiffness: 160 }"
      >Stay hungry, stay foolish</Text3DFlip
    >
    <p class="text-center text-sm text-muted-foreground">
      Hover over or focus the text to flip each letter.
    </p>
  </div>
</template>
