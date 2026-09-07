<script setup lang="ts">
import { ref } from "vue";
import { Check, ChevronRight } from "@lucide/vue";
import AnimatedSubscribeButton from "../../components/spark-ui/animated-subscribe-button/animated-subscribe-button.vue";

const subscribed = ref(false);
</script>

<template>
  <div class="flex w-[min(440px,70vw)] flex-col items-center gap-6 py-8">
    <AnimatedSubscribeButton v-model:subscribe-status="subscribed" class="w-44">
      <template #unsubscribed>
        <span class="inline-flex items-center gap-2"
          >Subscribe <ChevronRight class="size-4" aria-hidden="true"
        /></span>
      </template>
      <template #subscribed>
        <span class="inline-flex items-center gap-2"
          ><Check class="size-4" aria-hidden="true" /> Subscribed</span
        >
      </template>
    </AnimatedSubscribeButton>
    <p class="text-sm text-muted-foreground" aria-live="polite">
      {{ subscribed ? "You are subscribed." : "You are not subscribed." }}
    </p>
    <button
      type="button"
      class="rounded px-3 py-1 text-sm underline focus-visible:outline focus-visible:outline-2"
      @click="subscribed = false"
    >
      Reset from parent
    </button>
    <AnimatedSubscribeButton class="w-44">
      <template #unsubscribed>Uncontrolled</template>
      <template #subscribed>Subscribed</template>
    </AnimatedSubscribeButton>
  </div>
</template>
