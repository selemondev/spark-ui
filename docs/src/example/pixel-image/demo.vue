<script setup lang="ts">
import { ref } from "vue";
import PixelImage from "./pixel-image.vue";

const replay = ref(0);
</script>

<template>
  <div class="flex w-[min(440px,70vw)] flex-col items-center gap-5 py-6">
    <PixelImage
      :key="replay"
      src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85"
      alt="Mountains reflected in a lake"
      :custom-grid="{ rows: 4, cols: 6 }"
      class="!w-full"
    />
    <button class="rounded-md border px-4 py-2 text-sm" @click="replay++">
      Replay image reveal
    </button>
  </div>
</template>
