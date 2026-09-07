# Text 3D Flip

Flip each letter in 3D when you hover over the text.

<demo src="../../src/example/text-3d-flip/demo.vue" srcCode="../../src/spark-ui-demos/text-3d-flip/demo.vue" />

## Installation

Install `motion-v`. Copy the files below into `src/components/spark-ui/text-3d-flip/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [text-3d-flip.vue]
<script setup lang="ts">
import {
  Comment,
  isVNode,
  onMounted,
  onUnmounted,
  useSlots,
  type Component,
  type VNodeChild,
} from "vue";
import { useAnimate, type AnimationOptions, type ValueAnimationTransition } from "motion-v";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    as?: string | Component;
    className?: string;
    textClassName?: string;
    flipTextClassName?: string;
    staggerDuration?: number;
    staggerFrom?: "first" | "last" | "center" | "random" | number;
    transition?: ValueAnimationTransition | AnimationOptions;
    rotateDirection?: "top" | "right" | "bottom" | "left";
  }>(),
  {
    as: "p",
    staggerDuration: 0.05,
    staggerFrom: "first",
    transition: () => ({ type: "spring", damping: 30, stiffness: 300 }),
    rotateDirection: "right",
  },
);

const slots = useSlots();
const [scope, animate] = useAnimate();
const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter("en", { granularity: "grapheme" })
    : undefined;
let mounted = false;
let animating = false;
onMounted(() => {
  mounted = true;
});
onUnmounted(() => {
  mounted = false;
  animating = false;
});

function extractText(child: VNodeChild): string {
  if (typeof child === "string" || typeof child === "number") return String(child);
  if (Array.isArray(child)) return child.map(extractText).join("");
  if (isVNode(child) && child.type !== Comment) {
    if (Array.isArray(child.children) || typeof child.children === "string")
      return extractText(child.children);
    if (
      child.children &&
      typeof child.children === "object" &&
      typeof child.children.default === "function"
    ) {
      return extractText(child.children.default());
    }
  }
  return "";
}

function text() {
  return extractText(slots.default?.() ?? []);
}
function words() {
  return text()
    .split(" ")
    .map((word, index, all) => ({
      characters: segmenter
        ? Array.from(segmenter.segment(word), ({ segment }) => segment)
        : Array.from(word),
      needsSpace: index < all.length - 1,
    }));
}

const rotations = {
  top: "rotateX(90deg)",
  right: "rotateY(90deg)",
  bottom: "rotateX(-90deg)",
  left: "rotateY(-90deg)",
};
const secondFaces = {
  top: "rotateX(-90deg) translateZ(0.5lh)",
  right:
    "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
  bottom: "rotateX(90deg) translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)",
};
const frontFaces = {
  top: "translateZ(0.5lh)",
  bottom: "translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(-90deg) translateX(50%) rotateY(90deg)",
};
const containers = {
  top: "translateZ(-0.5lh)",
  bottom: "translateZ(-0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
};

function staggerDelay(index: number, total: number) {
  const from = props.staggerFrom;
  if (from === "first") return index * props.staggerDuration;
  if (from === "last") return (total - 1 - index) * props.staggerDuration;
  const origin =
    from === "center"
      ? Math.floor(total / 2)
      : from === "random"
        ? Math.floor(Math.random() * total)
        : from;
  return Math.abs(origin - index) * props.staggerDuration;
}

async function flip() {
  if (!mounted || animating) return;
  const total = scope.value?.querySelectorAll(".text-3d-flip-char").length ?? 0;
  if (!total) return;
  animating = true;
  const delays = Array.from({ length: total }, (_, index) => staggerDelay(index, total));
  try {
    await animate(
      ".text-3d-flip-char",
      { transform: rotations[props.rotateDirection] },
      {
        ...props.transition,
        delay: (index: number) => delays[index],
      },
    );
    if (!mounted) return;
    await animate(
      ".text-3d-flip-char",
      { transform: "rotateX(0deg) rotateY(0deg)" },
      { duration: 0 },
    );
  } finally {
    if (mounted) animating = false;
  }
}
</script>

<template>
  <component
    :is="props.as"
    ref="scope"
    :class="cn('relative flex flex-wrap', props.className)"
    @mouseenter="flip"
    @focus="flip"
  >
    <span class="sr-only">{{ text() }}</span>
    <span
      v-for="(word, wordIndex) in words()"
      :key="wordIndex"
      class="inline-flex"
      aria-hidden="true"
    >
      <span
        v-for="(char, charIndex) in word.characters"
        :key="charIndex"
        class="text-3d-flip-char relative inline-block"
        :style="{ transform: containers[props.rotateDirection] }"
      >
        <span
          :class="cn('text-3d-flip-face relative inline-block h-[1lh]', props.textClassName)"
          :style="{ transform: frontFaces[props.rotateDirection] }"
          >{{ char }}</span
        >
        <span
          :class="cn('text-3d-flip-face absolute left-0 top-0 h-[1lh]', props.flipTextClassName)"
          :style="{ transform: secondFaces[props.rotateDirection] }"
          >{{ char }}</span
        >
      </span>
      <span v-if="word.needsSpace" class="whitespace-pre"> </span>
    </span>
  </component>
</template>

<style scoped>
.text-3d-flip-char {
  transform-style: preserve-3d;
}
.text-3d-flip-face {
  backface-visibility: hidden;
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import Text3DFlip from "@/components/spark-ui/text-3d-flip/text-3d-flip.vue";
</script>

<template>
  <Text3DFlip rotate-direction="top" stagger-from="center" :stagger-duration="0.03">
    Stay hungry, stay foolish
  </Text3DFlip>
</template>
```

## Props

| Prop                | Type                                              | Default                                           | Description                                                          |
| ------------------- | ------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| `as`                | `string / Component`                              | `"p"`                                             | Root element or Vue component.                                       |
| `className`         | `string`                                          | None                                              | Root classes. Native `class` also works.                             |
| `textClassName`     | `string`                                          | None                                              | Classes for the front face.                                          |
| `flipTextClassName` | `string`                                          | None                                              | Classes for the second face.                                         |
| `staggerDuration`   | `number`                                          | `0.05`                                            | Delay between letters, in seconds.                                   |
| `staggerFrom`       | `"first" / "last" / "center" / "random" / number` | `"first"`                                         | Start position for the letter delays. Numbers select a letter index. |
| `transition`        | `ValueAnimationTransition / AnimationOptions`     | `{ type: "spring", damping: 30, stiffness: 300 }` | Motion transition configuration.                                     |
| `rotateDirection`   | `"top" / "right" / "bottom" / "left"`             | `"right"`                                         | Rotation direction.                                                  |
| Default slot        | Content                                           | Required                                          | Text to split into letters.                                          |

## Behavior

A stagger is a delay between letter animations. The component preserves words as groups and does not count spaces in the stagger. `Intl.Segmenter` keeps emoji and combined letters together when the browser supports it.

Each hover starts one flip and then resets the letters. Hover events during a flip do not restart it. The second face repeats the same letter with its own classes. Use an opaque background on both faces to match the upstream example.

The component reads text from the default slot. Nested markup does not keep its formatting. A screen reader receives one copy of the text. Add `tabindex="0"` to enable the same effect on keyboard focus.

Random delays start only after a user interaction. Motion stops active animations when the component unmounts. The component does not start a timer.

## Source

Ported from [Magic UI Text 3D Flip](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/text-3d-flip.tsx).
