<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";
import { cn } from "../../../lib/utils";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  class?: string;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
}

const props = withDefaults(defineProps<HighlighterProps>(), {
  action: "highlight",
  color: "#ffd1dc",
  strokeWidth: 1.5,
  animationDuration: 600,
  iterations: 2,
  padding: 2,
  multiline: true,
  isView: false,
});

const elementRef = ref<HTMLSpanElement | null>(null);
const shouldShow = ref(false);

let annotation: RoughAnnotation | null = null;
let resizeObserver: ResizeObserver | null = null;
let intersectionObserver: IntersectionObserver | null = null;

function clearAnnotation() {
  annotation?.remove();
  annotation = null;
  resizeObserver?.disconnect();
  resizeObserver = null;
}

function draw() {
  const element = elementRef.value;
  if (!shouldShow.value || !element) return;

  clearAnnotation();

  const currentAnnotation = annotate(element, {
    type: props.action,
    color: props.color,
    strokeWidth: props.strokeWidth,
    animationDuration: props.animationDuration,
    iterations: props.iterations,
    padding: props.padding,
    multiline: props.multiline,
  });

  annotation = currentAnnotation;
  currentAnnotation.show();

  resizeObserver = new ResizeObserver(() => {
    currentAnnotation.hide();
    currentAnnotation.show();
  });
  resizeObserver.observe(element);
  resizeObserver.observe(document.body);
}

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  if (!props.isView) {
    shouldShow.value = true;
    return;
  }

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        shouldShow.value = true;
        intersectionObserver?.disconnect();
        intersectionObserver = null;
      }
    },
    { rootMargin: "-10%" },
  );
  intersectionObserver.observe(element);
});

watch(
  [
    shouldShow,
    () => props.action,
    () => props.color,
    () => props.strokeWidth,
    () => props.animationDuration,
    () => props.iterations,
    () => props.padding,
    () => props.multiline,
  ],
  () => draw(),
  { flush: "post" },
);

onBeforeUnmount(() => {
  clearAnnotation();
  intersectionObserver?.disconnect();
  intersectionObserver = null;
});
</script>

<template>
  <span
    ref="elementRef"
    :class="cn('relative inline-block bg-transparent', props.class)"
  >
    <slot />
  </span>
</template>
