<script setup lang="ts">
import { motion } from "motion-v";
import { useAttrs } from "vue";
import { cn } from "../../../lib/utils";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ className?: string }>();
const attrs = useAttrs();

const transition = {
  repeat: Infinity,
  repeatType: "loop" as const,
  repeatDelay: 1,
  type: "spring" as const,
  stiffness: 20,
  damping: 15,
  mass: 2,
  scale: {
    type: "spring" as const,
    stiffness: 200,
    damping: 5,
    mass: 0.5,
  },
};
</script>

<template>
  <motion.button
    :initial="{ '--x': '100%', scale: 0.8 }"
    :animate="{ '--x': '-100%', scale: 1 }"
    :while-press="{ scale: 0.95 }"
    :transition="transition"
    v-bind="attrs as any"
    :class="
      cn(
        'shiny-button relative cursor-pointer rounded-lg border px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow',
        props.className,
        attrs.class as string,
      )
    "
  >
    <span
      class="shiny-label relative block h-full w-full text-sm uppercase tracking-wide text-black/[0.65] dark:font-light dark:text-white/90"
    >
      <slot />
    </span>
    <span
      aria-hidden="true"
      class="shiny-border pointer-events-none absolute inset-0 z-10 block rounded-[inherit] p-px"
    />
  </motion.button>
</template>

<style scoped>
.shiny-button {
  --x: 100%;
}

.shiny-label {
  -webkit-mask-image: linear-gradient(
    -75deg,
    #000 calc(var(--x) + 20%),
    transparent calc(var(--x) + 30%),
    #000 calc(var(--x) + 100%)
  );
  mask-image: linear-gradient(
    -75deg,
    #000 calc(var(--x) + 20%),
    transparent calc(var(--x) + 30%),
    #000 calc(var(--x) + 100%)
  );
}

.shiny-border {
  background-image: linear-gradient(
    -75deg,
    hsl(var(--primary, 0 0% 0%) / 0.1) calc(var(--x) + 20%),
    hsl(var(--primary, 0 0% 0%) / 0.5) calc(var(--x) + 25%),
    hsl(var(--primary, 0 0% 0%) / 0.1) calc(var(--x) + 100%)
  );
  -webkit-mask:
    linear-gradient(#000, #000) content-box,
    linear-gradient(#000, #000);
  mask:
    linear-gradient(#000, #000) content-box,
    linear-gradient(#000, #000);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

:global(.dark) .shiny-button {
  background-image: radial-gradient(
    circle at 50% 0%,
    hsl(var(--primary, 0 0% 100%) / 0.1) 0%,
    transparent 60%
  );
}

:global(.dark) .shiny-button:hover {
  box-shadow: 0 0 20px hsl(var(--primary, 0 0% 100%) / 0.1);
}
</style>
