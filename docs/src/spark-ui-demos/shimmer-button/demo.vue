<script setup lang="ts">
import { ref } from "vue";
import ShimmerButton from "../../components/spark-ui/shimmer-button/shimmer-button.vue";

const clicks = ref(0);
</script>

<template>
  <div class="flex w-[min(440px,70vw)] flex-col items-center gap-5 py-8">
    <ShimmerButton type="button" class="shadow-2xl" @click="clicks++">
      <span
        class="text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg"
      >
        Shimmer Button
      </span>
    </ShimmerButton>
    <p class="text-sm text-neutral-500" aria-live="polite">Clicked {{ clicks }} times</p>
  </div>
</template>
