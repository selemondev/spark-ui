# Spinning Text

Arrange text around a circle and rotate it in either direction.

<demo src="../../src/example/spinning-text/demo.vue" srcCode="../../src/spark-ui-demos/spinning-text/demo.vue" />

## Installation

Install the animation dependency with `pnpm add motion-v`.

Copy the component into `src/components/spark-ui/spinning-text/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [spinning-text.vue]
<script lang="ts">
import { motion, type Options } from "motion-v";
import { Comment, Fragment, Text, defineComponent, h, type PropType, type VNodeChild } from "vue";
import { cn } from "@/lib/utils";

type SpinningVariants = {
  container?: Options["variants"];
  item?: Options["variants"];
};

function readText(node: VNodeChild): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(readText).join("");
  if (node.type === Comment) return "";
  if (node.type === Text || node.type === Fragment) return readText(node.children as VNodeChild);
  throw new Error("SpinningText requires plain text in its default slot.");
}

export default defineComponent({
  name: "SpinningText",
  props: {
    duration: { type: Number, default: 10 },
    reverse: { type: Boolean, default: false },
    radius: { type: Number, default: 5 },
    className: { type: String, default: undefined },
    transition: { type: Object as PropType<Options["transition"]>, default: undefined },
    variants: { type: Object as PropType<SpinningVariants>, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const text = readText(slots.default?.() ?? []);
      const letters = Array.from(text);
      letters.push(" ");
      const transition = {
        repeat: Infinity,
        ease: "linear" as const,
        ...props.transition,
        duration: props.transition?.duration ?? props.duration,
      };
      const containerVariants = {
        visible: { rotate: props.reverse ? -360 : 360 },
        ...props.variants?.container,
      };
      const itemVariants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        ...props.variants?.item,
      };
      return h(
        motion.div,
        {
          class: cn("relative", props.className),
          initial: "hidden",
          animate: "visible",
          variants: containerVariants,
          transition,
        },
        {
          default: () => [
            ...letters.map((letter, index) =>
              h(
                motion.span,
                {
                  key: `${index}-${letter}`,
                  "aria-hidden": "true",
                  variants: itemVariants,
                  class: "absolute left-1/2 top-1/2 inline-block",
                  style: {
                    transform: `translate(-50%, -50%) rotate(${(360 / letters.length) * index}deg) translateY(${-props.radius}ch)`,
                    transformOrigin: "center",
                  },
                },
                { default: () => letter },
              ),
            ),
            h("span", { class: "sr-only" }, text),
          ],
        },
      );
    };
  },
});
</script>
```

:::

## Usage

```vue
<script setup lang="ts">
import SpinningText from "@/components/spark-ui/spinning-text/spinning-text.vue";
</script>

<template>
  <div class="flex h-64 items-center justify-center">
    <SpinningText :duration="10" :radius="5">learn more · earn more · grow more ·</SpinningText>
  </div>
</template>
```

## Behavior

The default slot replaces upstream `children`. Pass plain text or text interpolation. The component rejects HTML elements in the slot.

Letters sit at equal angles around the center. The component adds one trailing space, as upstream does. `radius` uses `ch`, the width of the font’s zero character.

The letters use absolute positions and do not reserve space. Give the parent enough width and height for the circle.

One clockwise rotation takes 10 seconds by default. Set `reverse` for counterclockwise rotation. Changes to the slot text and props update the circle.

`transition.duration` takes priority over `duration`. Other transition options merge with infinite repeat and linear timing. Container and item variants use the `hidden` and `visible` states.

Screen readers receive the complete text once. Animated letters are hidden from assistive technology. Motion-v stops its animations when the component unmounts.

## Props

| Prop         | Type                                                              | Default                        | Description                              |
| ------------ | ----------------------------------------------------------------- | ------------------------------ | ---------------------------------------- |
| `duration`   | `number`                                                          | `10`                           | Seconds per rotation.                    |
| `reverse`    | `boolean`                                                         | `false`                        | Rotate counterclockwise.                 |
| `radius`     | `number`                                                          | `5`                            | Radius in `ch` units.                    |
| `transition` | `Options["transition"]` from `motion-v`                           | Infinite repeat, linear timing | Configuration for the rotation.          |
| `variants`   | `{ container?: Options["variants"]; item?: Options["variants"] }` | Rotation and visible letters   | Named states for the circle and letters. |
| `className`  | `string`                                                          | `undefined`                    | Classes for the container.               |
| `style`      | Vue style attribute                                               | `undefined`                    | Styles for the container.                |

## Slots

| Slot    | Description                              |
| ------- | ---------------------------------------- |
| Default | Plain text to arrange around the circle. |

## Source

Ported from [Magic UI Spinning Text](https://magicui.design/docs/components/spinning-text).
