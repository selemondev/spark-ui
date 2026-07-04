<script setup lang="ts">
import type {
  GlobalOptions as ConfettiGlobalOptions,
  Options as ConfettiOptions,
} from "canvas-confetti";
import { cn } from "../../lib/utils";

type ConfettiButtonOptions = ConfettiOptions &
  ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };

interface ConfettiButtonProps {
  class?: string;
  options?: ConfettiButtonOptions;
}

const props = defineProps<ConfettiButtonProps>();

async function handleClick(event: MouseEvent) {
  try {
    const target = event.currentTarget as HTMLButtonElement;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const confetti = (await import("canvas-confetti")).default;
    await confetti({
      ...props.options,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  } catch (error) {
    console.error("Confetti button error:", error);
  }
}
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90',
        props.class,
      )
    "
    type="button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
