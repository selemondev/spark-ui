<script setup lang="ts">
import { ref } from "vue";
import { cn } from "../../../lib/utils";

interface RippleButtonProps {
  class?: string;
  rippleColor?: string;
  duration?: string;
}

const props = withDefaults(defineProps<RippleButtonProps>(), {
  rippleColor: "#ffffff",
  duration: "600ms",
});
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const ripples = ref<Array<{ x: number; y: number; size: number; id: number }>>([]);
let nextId = 0;

function handleClick(event: MouseEvent) {
  const button = event.currentTarget as HTMLButtonElement;
  if (button.disabled) return;

  const rect = button.getBoundingClientRect();
  const size = Math.max(button.clientWidth, button.clientHeight);
  // Convert viewport coordinates to the button's padding box, including CSS scale.
  const x =
    event.detail === 0
      ? button.clientWidth / 2
      : (event.clientX - rect.left) * (rect.width ? button.offsetWidth / rect.width : 1) -
        button.clientLeft;
  const y =
    event.detail === 0
      ? button.clientHeight / 2
      : (event.clientY - rect.top) * (rect.height ? button.offsetHeight / rect.height : 1) -
        button.clientTop;
  ripples.value.push({ x: x - size / 2, y: y - size / 2, size, id: nextId++ });
  emit("click", event);
}

function removeRipple(id: number) {
  const index = ripples.value.findIndex((ripple) => ripple.id === id);
  if (index !== -1) ripples.value.splice(index, 1);
}
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-background px-4 py-2 text-center text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )
    "
    @click="handleClick"
  >
    <span class="relative z-10"><slot /></span>
    <span aria-hidden="true" class="pointer-events-none absolute inset-0">
      <span
        v-for="ripple in ripples"
        :key="ripple.id"
        class="ripple absolute rounded-full"
        :style="{
          width: `${ripple.size}px`,
          height: `${ripple.size}px`,
          top: `${ripple.y}px`,
          left: `${ripple.x}px`,
          backgroundColor: props.rippleColor,
          '--duration': props.duration,
        }"
        @animationend="removeRipple(ripple.id)"
        @animationcancel="removeRipple(ripple.id)"
      />
    </span>
  </button>
</template>

<style scoped>
.ripple {
  transform: scale(0);
  opacity: 0.3;
  animation: rippling var(--duration) ease-out forwards;
}
@keyframes rippling {
  0% {
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .ripple {
    animation-duration: 1ms;
  }
}
</style>
