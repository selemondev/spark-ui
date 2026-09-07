<script setup lang="ts">
import { ref } from "vue";
import NumberTicker from "../../components/spark-ui/number-ticker/number-ticker.vue";

const run = ref(0);
const value = ref(100);
</script>

<template>
  <div class="flex w-[min(560px,70vw)] flex-col items-center gap-6 py-8">
    <NumberTicker :key="run" :value="value" class-name="text-7xl font-medium tracking-tighter" />
    <div class="flex flex-wrap justify-center gap-8 text-center">
      <div>
        <p class="text-sm text-neutral-500">Decimals</p>
        <NumberTicker
          :key="run"
          :value="5.67"
          :decimal-places="2"
          :delay="0.2"
          class-name="text-3xl"
        />
      </div>
      <div>
        <p class="text-sm text-neutral-500">Count down</p>
        <NumberTicker
          :key="run"
          :value="100"
          :start-value="20"
          direction="down"
          class-name="text-3xl"
        />
      </div>
    </div>
    <div class="flex flex-wrap justify-center gap-3">
      <button class="rounded-md border px-3 py-1.5 text-sm" type="button" @click="run++">
        Replay
      </button>
      <button class="rounded-md border px-3 py-1.5 text-sm" type="button" @click="value += 25">
        Add 25
      </button>
    </div>
  </div>
</template>
