<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  visible?: boolean;
  className?: string;
}>();

const navBodyStyles = computed(() => {
  return {
    backdropFilter: props.visible ? "blur(10px)" : "none",
    boxShadow: props.visible
      ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
      : "none",
    width: props.visible ? "40%" : "100%",
    transform: props.visible ? "translateY(20px)" : "translateY(0)",
    minWidth: "800px",
    transition: "all 0.3s",
  };
});

const navBodyClasses = computed(() => {
  return [
    "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
    props.visible && "bg-white/80 dark:bg-neutral-950/80",
    props.className,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <div :class="navBodyClasses" :style="navBodyStyles">
    <slot />
  </div>
</template>
