<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";

interface BlurFadeProps {
  class?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
    enter: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  blur?: string;
  inViewMargin?: string;
}

const props = withDefaults(defineProps<BlurFadeProps>(), {
  duration: 0.4,
  delay: 500,
  yOffset: 6,
  inView: false,
  inViewMargin: "-50px",
  blur: "6px",
});

const elementRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const combinedVariants = computed(() => {
  const shown = {
    y: -props.yOffset,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: props.delay,
      duration: props.duration * 1000,
      ease: "easeIn",
    },
  };
  return (
    props.variant ?? {
      hidden: { y: props.yOffset, opacity: 0, filter: `blur(${props.blur})` },
      visible: shown,
      enter: shown,
    }
  );
});

// The directive captures its binding once, so keep this reactive object stable.
const motionVariants = reactive({
  initial: computed(() => combinedVariants.value.hidden),
  enter: computed(() => {
    if (!props.inView) return combinedVariants.value.enter;
    return isVisible.value ? combinedVariants.value.visible : combinedVariants.value.hidden;
  }),
});

watch(
  [elementRef, () => props.inView, () => props.inViewMargin],
  ([element, inView, rootMargin], _, onCleanup) => {
    isVisible.value = false;
    if (!element || !inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) isVisible.value = entry.isIntersecting;
      },
      { rootMargin },
    );
    observer.observe(element);
    onCleanup(() => observer.disconnect());
  },
  { flush: "post" },
);
</script>

<template>
  <div ref="elementRef" v-motion="motionVariants" :class="props.class">
    <slot />
  </div>
</template>
