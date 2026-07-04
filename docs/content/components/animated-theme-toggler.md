# Animated Theme Toggler

A theme toggle button that switches between light and dark mode with an animated clip-path circle reveal powered by the View Transitions API.

<demo src="../../src/example/animated-theme-toggler/demo.vue" srcCode="../../src/spark-ui-demos/animated-theme-toggler/animated-theme-toggler.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [animated-theme-toggler.vue]
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps {
  class?: string;
  duration?: number;
}

const props = withDefaults(defineProps<AnimatedThemeTogglerProps>(), {
  duration: 400,
});

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

const buttonRef = ref<HTMLButtonElement | null>(null);
const isDark = ref(false);
let observer: MutationObserver | null = null;

onMounted(() => {
  const updateTheme = () => {
    isDark.value = document.documentElement.classList.contains("dark");
  };

  updateTheme();

  observer = new MutationObserver(updateTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});

const applyTheme = () => {
  const newIsDark = !isDark.value;
  // Toggle the class synchronously so the View Transitions API snapshots
  // the new theme inside the startViewTransition callback.
  document.documentElement.classList.toggle("dark");
  isDark.value = newIsDark;
  localStorage.setItem("theme", newIsDark ? "dark" : "light");
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

defineExpose({ toggleTheme });
</script>

<template>
  <button ref="buttonRef" type="button" :class="cn(props.class)" @click="toggleTheme">
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
      width="24"
      height="24"
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
```

:::

To smooth out the reveal, add the following to your global CSS so the default cross-fade does not fight the clip-path animation:

```css [globals.css]
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
```

## Usage

```vue
<script setup lang="ts">
import AnimatedThemeToggler from "@/components/spark-ui/animated-theme-toggler/animated-theme-toggler.vue";
</script>

<template>
  <AnimatedThemeToggler />
</template>
```

Set a longer `duration` to slow down the reveal:

```vue
<template>
  <AnimatedThemeToggler :duration="600" />
</template>
```

## Props

| Prop     | Type   | Default | Description                                                 |
| -------- | ------ | ------- | ----------------------------------------------------------- |
| class    | string |         | Additional classes applied to the button.                   |
| duration | number | 400     | Duration of the clip-path reveal animation in milliseconds. |
