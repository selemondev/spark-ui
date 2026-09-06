<script setup lang="ts">
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";
import { nextTick, onBeforeUnmount, onMounted, provide, ref } from "vue";
import { cn } from "../../lib/utils";
import { confettiApiKey } from "./context";

interface ConfettiProps {
  class?: string;
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
}

const props = withDefaults(defineProps<ConfettiProps>(), {
  globalOptions: () => ({ resize: true, useWorker: false }),
  manualstart: false,
});

defineOptions({ inheritAttrs: false });

const canvasRef = ref<HTMLCanvasElement | null>(null);
let instance: ConfettiInstance | null = null;
let initialization: Promise<ConfettiInstance | null> | null = null;
let disposed = false;

function initialize() {
  initialization ??= (async () => {
    await nextTick();
    if (disposed || !canvasRef.value) return null;
    const confetti = (await import("canvas-confetti")).default;
    if (disposed || !canvasRef.value) return null;
    instance = confetti.create(canvasRef.value, {
      resize: true,
      useWorker: false,
      ...props.globalOptions,
    });
    return instance;
  })();
  return initialization;
}

async function fire(opts: ConfettiOptions = {}) {
  try {
    const options = { ...props.options, ...opts };
    const confetti = await initialize();
    if (!disposed) await confetti?.(options);
  } catch (error) {
    console.error("Confetti error:", error);
  }
}

const api = { fire };

provide(confettiApiKey, api);
defineExpose(api);

onMounted(() => {
  if (!props.manualstart) {
    void fire();
  } else {
    void initialize().catch((error) => console.error("Confetti error:", error));
  }
});

onBeforeUnmount(() => {
  disposed = true;
  instance?.reset();
  instance = null;
});
</script>

<template>
  <canvas ref="canvasRef" :class="cn(props.class)" v-bind="$attrs" />
  <slot />
</template>
