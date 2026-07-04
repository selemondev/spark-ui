<script setup lang="ts">
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";
import { onBeforeUnmount, onMounted, provide, ref } from "vue";
import { cn } from "../../lib/utils";
import { confettiApiKey } from "./context";

interface ConfettiProps {
  class?: string;
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
}

const props = withDefaults(defineProps<ConfettiProps>(), {
  globalOptions: () => ({ resize: true, useWorker: true }),
  manualstart: false,
});

defineOptions({ inheritAttrs: false });

const canvasRef = ref<HTMLCanvasElement | null>(null);
const instance = ref<ConfettiInstance | null>(null);

async function fire(opts: ConfettiOptions = {}) {
  try {
    await instance.value?.({ ...props.options, ...opts });
  } catch (error) {
    console.error("Confetti error:", error);
  }
}

const api = { fire };

provide(confettiApiKey, api);
defineExpose(api);

onMounted(async () => {
  if (!canvasRef.value) return;
  const confetti = (await import("canvas-confetti")).default;
  instance.value = confetti.create(canvasRef.value, {
    ...props.globalOptions,
    resize: true,
  });

  if (!props.manualstart) {
    try {
      await fire();
    } catch (error) {
      console.error("Confetti effect error:", error);
    }
  }
});

onBeforeUnmount(() => {
  if (instance.value) {
    instance.value.reset();
    instance.value = null;
  }
});
</script>

<template>
  <canvas ref="canvasRef" :class="cn(props.class)" v-bind="$attrs" />
  <slot />
</template>
