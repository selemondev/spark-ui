# Text Animate

Animate text, words, letters, or lines with ten motion presets.

<demo src="../../src/example/text-animate/demo.vue" srcCode="../../src/spark-ui-demos/text-animate/demo.vue" />

## Installation

Install `motion-v`. Copy the files below into `src/components/spark-ui/text-animate/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [text-animate.vue]
<script lang="ts">
import { Comment, defineComponent, h, isVNode, type PropType, type VNodeChild } from "vue";
import { AnimatePresence, motion, type Variants } from "motion-v";
import { cn } from "@/lib/utils";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";
type ElementTag =
  "article" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "li" | "p" | "section" | "span";

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.3 },
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 1.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
};

function extractText(child: VNodeChild): string {
  if (typeof child === "string" || typeof child === "number") return String(child);
  if (Array.isArray(child)) return child.map(extractText).join("");
  if (
    isVNode(child) &&
    child.type !== Comment &&
    (Array.isArray(child.children) || typeof child.children === "string")
  ) {
    return extractText(child.children);
  }
  return "";
}

export default defineComponent({
  name: "TextAnimate",
  inheritAttrs: false,
  props: {
    className: String,
    segmentClassName: String,
    delay: { type: Number, default: 0 },
    duration: { type: Number, default: 0.3 },
    variants: Object as PropType<Variants>,
    as: { type: String as PropType<ElementTag>, default: "p" },
    by: { type: String as PropType<AnimationType>, default: "word" },
    startOnView: { type: Boolean, default: true },
    once: { type: Boolean, default: false },
    animation: { type: String as PropType<AnimationVariant>, default: "fadeIn" },
    accessible: { type: Boolean, default: true },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const text = extractText(slots.default?.() ?? []);
      const segments =
        props.by === "word"
          ? text.split(/(\s+)/)
          : props.by === "character"
            ? text.split("")
            : props.by === "line"
              ? text.split("\n")
              : [text];
      const stagger = props.duration / Math.max(segments.length, 1);
      const container: Variants = props.variants
        ? {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                opacity: { duration: 0.01, delay: props.delay },
                delayChildren: props.delay,
                staggerChildren: stagger,
              },
            },
            exit: { opacity: 0, transition: { staggerChildren: stagger, staggerDirection: -1 } },
          }
        : {
            ...defaultContainerVariants,
            show: {
              opacity: 1,
              transition: { delayChildren: props.delay, staggerChildren: stagger },
            },
            exit: { opacity: 0, transition: { staggerChildren: stagger, staggerDirection: -1 } },
          };
      const item = props.variants ?? defaultItemAnimationVariants[props.animation].item;
      return h(
        AnimatePresence,
        { mode: "popLayout" },
        {
          default: () =>
            h(
              motion[props.as],
              {
                variants: container,
                initial: "hidden",
                whileInView: props.startOnView ? "show" : undefined,
                animate: props.startOnView ? undefined : "show",
                exit: "exit",
                viewport: { once: props.once },
                ...attrs,
                class: cn("whitespace-pre-wrap", props.className, attrs.class as string),
              },
              {
                default: () => [
                  ...(props.accessible ? [h("span", { class: "sr-only" }, text)] : []),
                  ...segments.map((segment, index) =>
                    h(
                      motion.span,
                      {
                        key: props.by + "-" + segment + "-" + index,
                        variants: item,
                        custom: index * staggerTimings[props.by],
                        class: cn(
                          props.by === "line" ? "block" : "inline-block whitespace-pre",
                          props.segmentClassName,
                        ),
                        "aria-hidden": props.accessible ? true : undefined,
                      },
                      { default: () => segment },
                    ),
                  ),
                ],
              },
            ),
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
import TextAnimate from "@/components/spark-ui/text-animate/text-animate.vue";
</script>

<template>
  <TextAnimate animation="blurInUp" by="word" :duration="0.6" once> Blur in by word </TextAnimate>
</template>
```

## Props

| Prop               | Type                                                                    | Default    | Description                                                    |
| ------------------ | ----------------------------------------------------------------------- | ---------- | -------------------------------------------------------------- |
| `className`        | `string`                                                                | None       | Root classes. Native `class` also works.                       |
| `segmentClassName` | `string`                                                                | None       | Classes for each text segment.                                 |
| `delay`            | `number`                                                                | `0`        | Delay before the first segment, in seconds.                    |
| `duration`         | `number`                                                                | `0.3`      | Total stagger interval, in seconds.                            |
| `variants`         | `Variants`                                                              | None       | Custom `hidden`, `show`, and `exit` variants for each segment. |
| `as`               | `article / div / h1 / h2 / h3 / h4 / h5 / h6 / li / p / section / span` | `p`        | Root element.                                                  |
| `by`               | `"text" / "word" / "character" / "line"`                                | `"word"`   | Text splitting method.                                         |
| `startOnView`      | `boolean`                                                               | `true`     | Wait until the text enters the viewport.                       |
| `once`             | `boolean`                                                               | `false`    | Play only on the first viewport entry.                         |
| `animation`        | `AnimationVariant`                                                      | `"fadeIn"` | Animation preset.                                              |
| `accessible`       | `boolean`                                                               | `true`     | Expose one text copy to screen readers.                        |
| Default slot       | Text                                                                    | Required   | Text to animate.                                               |

## Behavior

The presets are `fadeIn`, `blurIn`, `blurInUp`, `blurInDown`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scaleUp`, and `scaleDown`. Each preset keeps the upstream positions, blur values, spring configuration, and exit behavior. `blurInDown` has no preset exit animation.

A segment is one animated part of the text. Word mode keeps whitespace segments. Line mode splits on newline characters. Character mode follows the upstream UTF-16 split behavior. Use word mode for text with combined emoji.

A stagger is a delay between segment animations. `duration` controls the total stagger interval, not each segment transition. Preset transitions keep their own durations. Custom variants replace the preset and receive `index × split timing` as their `custom` value. Split timings are 0.06 for text and lines, 0.05 for words, and 0.03 for characters.

When `startOnView` is `false`, animation starts on mount. When `once` is `false`, scrolling out and back in replays the animation. This is an entry animation, not a scroll-progress effect. Use Text Reveal for an animation that follows scroll progress.

Additional attributes and Motion properties pass to the root Motion element. The default slot accepts text. The accessible output contains one full-text copy and hides animated segments from screen readers.

## Source

Ported from [Magic UI Text Animate](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/text-animate.tsx).
