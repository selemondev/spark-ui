<script setup lang="ts">
import { useData } from "vitepress";
import { ref } from "vue";
import { cn } from "../../lib/utils";

interface AnimatedThemeTogglerProps {
  class?: string;
  duration?: number;
}

const props = withDefaults(defineProps<AnimatedThemeTogglerProps>(), {
  duration: 400,
});

// In the docs preview we drive VitePress' own dark mode so the toggle
// actually switches the site theme. The copy-paste component instead
// toggles the `dark` class on `<html>` directly (framework-agnostic).
const { isDark } = useData();

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

const buttonRef = ref<HTMLButtonElement | null>(null);

const applyTheme = () => {
  isDark.value = !isDark.value;
};

const toggleTheme = async () => {
  const button = buttonRef.value;
  if (!button) return;

  const doc = document as ViewTransitionDocument;

  if (typeof doc.startViewTransition !== "function") {
    applyTheme();
    return;
  }

  const transition = doc.startViewTransition(applyTheme);
  await transition.ready;

  const { top, left, width, height } = button.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  document.documentElement.animate(
    {
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
    },
    {
      duration: props.duration,
      easing: "ease-in-out",
      pseudoElement: "::view-transition-new(root)",
    },
  );
};
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    :class="
      cn(
        'inline-flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 transition-colors hover:bg-gray-100 dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800',
        props.class,
      )
    "
    @click="toggleTheme"
  >
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
    <span class="sr-only">Toggle theme</span>
  </button>
</template>
