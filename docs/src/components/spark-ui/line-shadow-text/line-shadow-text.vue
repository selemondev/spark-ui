<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../../lib/utils";

interface LineShadowTextProps {
  class?: string;
  text: string;
  shadowColor?: string;
  as?: keyof HTMLElementTagNameMap;
}

const props = withDefaults(defineProps<LineShadowTextProps>(), {
  shadowColor: "black",
  as: "span",
});

const style = computed(() => ({
  "--shadow-color": props.shadowColor,
}));
</script>

<template>
  <component
    :is="props.as"
    :style="style"
    :data-text="props.text"
    :class="cn('line-shadow-text relative z-0 inline-flex', props.class)"
  >
    {{ props.text }}
  </component>
</template>

<style scoped>
.line-shadow-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0.04em;
  left: 0.04em;
  z-index: -10;
  background-image: linear-gradient(
    45deg,
    transparent 45%,
    var(--shadow-color) 45%,
    var(--shadow-color) 55%,
    transparent 0
  );
  background-size: 0.06em 0.06em;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: line-shadow 15s linear infinite;
}

@keyframes line-shadow {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% -100%;
  }
}
</style>
