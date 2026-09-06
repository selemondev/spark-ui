<script setup lang="ts">
import type { MotionProps } from "motion-v";
import { motion } from "motion-v";
import { Comment, defineComponent, onMounted, ref, useSlots, watch, type VNode } from "vue";
import { cn } from "../../lib/utils";

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
