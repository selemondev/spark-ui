# Terminal

An implementation of the MacOS terminal. Useful for showcasing a command line interface.

<demo src="../../src/example/terminal/demo.vue" srcCode="../../src/spark-ui-demos/terminal/demo.vue" />

## Installation

Install the following dependencies

```bash
pnpm add motion-v@2
```

Copy and paste the following code into your project:

::: code-group

```vue [animated-span.vue]
<script setup lang="ts">
import type { MotionProps } from "motion-v";
import { motion } from "motion-v";
import { cn } from "@/lib/utils";
interface AnimatedSpanProps extends MotionProps {
  delay?: number;
  className?: string;
}
const props = withDefaults(defineProps<AnimatedSpanProps>(), {
  delay: 0,
});
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: -5 }"
    :animate="{
      opacity: 1,
      y: 0,
    }"
    :transition="{
      duration: 0.3,
      delay: props.delay / 1000,
    }"
    :class="cn('grid text-sm font-normal tracking-tight', props.className)"
  >
    <slot />
  </motion.div>
</template>
```

```vue [terminal.vue]
<script setup lang="ts">
import { cn } from "@/lib/utils";
interface TerminalProps {
  className?: string;
}
const props = defineProps<TerminalProps>();
</script>

<template>
  <div
    :class="
      cn(
        'z-0 min-h-[300px] w-full max-w-lg rounded-xl border border-gray-300 bg-background',
        props.className,
      )
    "
  >
    <div class="flex flex-col gap-y-2 border-b border-gray-300 p-4">
      <div class="flex flex-row gap-x-2">
        <div class="h-2 w-2 rounded-full bg-red-500" />
        <div class="h-2 w-2 rounded-full bg-yellow-500" />
        <div class="h-2 w-2 rounded-full bg-green-500" />
      </div>
    </div>
    <pre class="px-4 h-auto">
        <code class="grid gap-y-1">
            <slot />
        </code>
      </pre>
  </div>
</template>
```

```vue [typing-animation.vue]
<script setup lang="ts">
import type { MotionProps } from "motion-v";
import { motion } from "motion-v";
import { Comment, defineComponent, onMounted, ref, useSlots, watch, type VNode } from "vue";
import { cn } from "@/lib/utils";

interface TypingAnimationProps extends MotionProps {
  className?: string;
  duration?: number;
  delay?: number;
}

const props = withDefaults(defineProps<TypingAnimationProps>(), {
  duration: 60,
  delay: 0,
});

const MotionComponent = motion.create("span", {
  forwardMotionProps: true,
});

const slots = useSlots();

// Extract text during render so reactive reads inside slots are tracked.
function textContent(nodes: VNode[]): string {
  return nodes
    .map((node) => {
      if (node.type === Comment) return "";
      if (typeof node.children === "string") return node.children;
      return Array.isArray(node.children) ? textContent(node.children as VNode[]) : "";
    })
    .join("");
}

const TypedText = defineComponent({
  props: {
    text: { type: String, required: true },
  },
  setup(content) {
    const displayedText = ref("");
    onMounted(() => {
      watch(
        () => [content.text, props.duration, props.delay] as const,
        ([text, duration, delay], _previous, onCleanup) => {
          displayedText.value = "";
          if (!text) return;
          let interval: ReturnType<typeof setInterval> | undefined;
          const timeout = setTimeout(() => {
            let index = 0;
            interval = setInterval(() => {
              displayedText.value = text.slice(0, ++index);
              if (index >= text.length) clearInterval(interval);
            }, duration);
          }, delay);
          onCleanup(() => {
            clearTimeout(timeout);
            clearInterval(interval);
          });
        },
        { immediate: true },
      );
    });
    return () => displayedText.value;
  },
});
</script>

<template>
  <MotionComponent :class="cn('text-sm font-normal tracking-tight', props.className)">
    <TypedText :text="textContent(slots.default?.() ?? [])" />
  </MotionComponent>
</template>
```

:::

## Props

### Terminal

| Prop        | Type   | Description                  | Default |
| ----------- | ------ | ---------------------------- | ------- |
| `className` | string | The class for the component. | -       |

### AnimatedSpan

| Prop        | Type   | Description                                        | Default |
| ----------- | ------ | -------------------------------------------------- | ------- |
| `delay`     | number | Delay in milliseconds before the animation starts. | 0       |
| `className` | string | The class for the component.                       | -       |

### TypingAnimation

| Prop        | Type   | Description                                        | Default |
| ----------- | ------ | -------------------------------------------------- | ------- |
| `delay`     | number | Delay in milliseconds before the animation starts. | 0       |
| `className` | string | The class for the component.                       | -       |
| `duration`  | number | Duration in milliseconds for each character typed. | 60      |

The default slot supplies text (including text across fragments). Typing starts empty after mount. Changing the slot text, `duration`, or `delay` cancels the previous sequence and restarts after the current delay. Timers are canceled when the component is removed.
