<script setup lang="ts">
import { cn } from "../../lib/utils";

interface RainbowButtonProps {
  class?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  variant: "default",
  size: "default",
});

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-xl px-3 text-xs",
  lg: "h-11 rounded-xl px-8",
  icon: "h-9 w-9",
};
</script>

<template>
  <button
    type="button"
    data-slot="button"
    :data-variant="props.variant"
    :class="
      cn(
        'rainbow-button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring aria-invalid:border-destructive disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:h-4 [&_svg:not([class*=size-])]:w-4',
        sizes[props.size],
        props.variant === 'default' ? 'text-white dark:text-black' : 'text-accent-foreground',
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>

<style scoped>
.rainbow-button {
  --rainbow-surface: #121213;
  --rainbow-fade: rgba(18, 18, 19, 0.6);
  --rainbow-clear: rgba(18, 18, 19, 0);
  --rainbow-gradient: linear-gradient(
    90deg,
    var(--color-1, oklch(66.2% 0.225 25.9)),
    var(--color-5, oklch(90.7% 0.231 133)),
    var(--color-3, oklch(69.6% 0.165 251)),
    var(--color-4, oklch(80.2% 0.134 225)),
    var(--color-2, oklch(60.4% 0.26 302))
  );
  border: 0.125rem solid transparent;
  background-image:
    linear-gradient(var(--rainbow-surface), var(--rainbow-surface)),
    linear-gradient(var(--rainbow-surface) 50%, var(--rainbow-fade) 80%, var(--rainbow-clear)),
    var(--rainbow-gradient);
  background-size: 200%;
  background-clip: padding-box, border-box, border-box;
  background-origin: border-box;
  animation: rainbow var(--speed, 2s) infinite linear;
}
.rainbow-button[data-variant="outline"] {
  --rainbow-surface: #fff;
  border: 1px solid hsl(var(--input));
  border-bottom-color: transparent;
}
.dark .rainbow-button {
  --rainbow-surface: #fff;
  --rainbow-fade: rgba(255, 255, 255, 0.6);
  --rainbow-clear: rgba(0, 0, 0, 0);
}
.dark .rainbow-button[data-variant="outline"] {
  --rainbow-surface: #0a0a0a;
}
.rainbow-button::before {
  content: "";
  pointer-events: none;
  position: absolute;
  bottom: -20%;
  left: 50%;
  z-index: 0;
  width: 60%;
  height: 20%;
  transform: translateX(-50%);
  background-image: var(--rainbow-gradient);
  background-size: 200%;
  filter: blur(0.75rem);
  animation: rainbow var(--speed, 2s) infinite linear;
}
@keyframes rainbow {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .rainbow-button,
  .rainbow-button::before {
    animation: none;
  }
}
</style>
