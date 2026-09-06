# Hyper Text

A text animation that scrambles letters before revealing the final text.

<demo src="../../src/example/hyper-text/demo.vue" srcCode="../../src/spark-ui-demos/hyper-text/hyper-text.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [hyper-text.vue]
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots } from "vue";
import { cn } from "@/lib/utils";

type CharacterSet = string[] | readonly string[];

type HyperTextTag =
  "article" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "li" | "p" | "section" | "span";

interface HyperTextProps {
  /** The text content to animate (alternative to the default slot) */
  text?: string;
  /** Optional className for styling */
  class?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Element to render as - defaults to div */
  as?: HyperTextTag;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
}

const props = withDefaults(defineProps<HyperTextProps>(), {
  duration: 800,
  delay: 0,
  as: "div",
  startOnView: false,
  animateOnHover: true,
  characterSet: () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("") as readonly string[],
});

const slots = useSlots();

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

const slotText = (): string => {
  const nodes = slots.default?.() ?? [];
  return nodes.map((node) => (typeof node.children === "string" ? node.children : "")).join("");
};

let sourceText = props.text ?? "";
let sourceCharacters = sourceText.split("");
const displayText = ref<string[]>(sourceCharacters);
const elementRef = ref<HTMLElement | null>(null);

let animationFrameId: number | null = null;
let startTimeoutId: ReturnType<typeof setTimeout> | null = null;
let observer: IntersectionObserver | null = null;
let isAnimating = false;

const cancelAnimation = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

const startAnimation = () => {
  const chars = sourceCharacters;
  const maxIterations = chars.length;
  const startTime = performance.now();
  isAnimating = true;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = props.duration <= 0 ? 1 : Math.min(elapsed / props.duration, 1);
    const iteration = progress * maxIterations;

    displayText.value = chars.map((letter, index) =>
      letter === " "
        ? letter
        : index <= iteration
          ? chars[index]
          : (props.characterSet[getRandomInt(props.characterSet.length)] ?? letter),
    );

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      animationFrameId = null;
      isAnimating = false;
    }
  };

  cancelAnimation();
  animationFrameId = requestAnimationFrame(animate);
};

const handleHover = () => {
  if (props.animateOnHover && !isAnimating) {
    startAnimation();
  }
};

// Invoke slots during render so their reactive text reads trigger updates.
function lettersToShow() {
  const next = props.text ?? slotText();
  if (next !== sourceText) {
    sourceText = next;
    sourceCharacters = next.split("");
    if (isAnimating) startAnimation();
  }
  const animatedCharacters = displayText.value;
  return isAnimating ? animatedCharacters : sourceCharacters;
}

onMounted(() => {
  if (!props.startOnView) {
    startTimeoutId = setTimeout(startAnimation, props.delay);
    return;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startTimeoutId = setTimeout(startAnimation, props.delay);
        observer?.disconnect();
      }
    },
    { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" },
  );

  if (elementRef.value) {
    observer.observe(elementRef.value);
  }
});

onBeforeUnmount(() => {
  cancelAnimation();
  if (startTimeoutId !== null) clearTimeout(startTimeoutId);
  observer?.disconnect();
});

const rootClass = computed(() => cn("overflow-hidden py-2 text-4xl font-bold", props.class));
</script>

<template>
  <component :is="props.as" ref="elementRef" :class="rootClass" @mouseenter="handleHover">
    <span
      v-for="(letter, index) in lettersToShow()"
      :key="index"
      :class="cn('font-mono', letter === ' ' ? 'w-3' : '')"
    >
      {{ letter.toUpperCase() }}
    </span>
  </component>
</template>
```

:::

## Usage

Pass the text as the default slot (matching the upstream `children` API), or use the `text` prop:

```vue
<HyperText>Hover Me!</HyperText>
```

```vue
<HyperText text="Hover Me!" />
```

## Props

| Prop             | Type                                                                                                       | Default | Description                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------ |
| `text`           | `string`                                                                                                   | `-`     | Text content to animate (alternative to default slot). |
| `class`          | `string`                                                                                                   | `-`     | The class name to be applied to the component.         |
| `duration`       | `number`                                                                                                   | `800`   | Duration of the animation in milliseconds.             |
| `delay`          | `number`                                                                                                   | `0`     | Delay before animation starts (in ms).                 |
| `as`             | `"article" \| "div" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "li" \| "p" \| "section" \| "span"` | `"div"` | Element to render as.                                  |
| `startOnView`    | `boolean`                                                                                                  | `false` | Start animation when the component scrolls into view.  |
| `animateOnHover` | `boolean`                                                                                                  | `true`  | Re-trigger the scramble animation on hover.            |
| `characterSet`   | `string[]`                                                                                                 | `A-Z`   | Custom character set for the scramble effect.          |

## Slots

| Slot      | Description                                               |
| --------- | --------------------------------------------------------- |
| `default` | The text to animate (used when the `text` prop is unset). |

Updating the source during a scramble restarts it with the latest text. An empty `characterSet` displays the source characters instead of random replacements.
