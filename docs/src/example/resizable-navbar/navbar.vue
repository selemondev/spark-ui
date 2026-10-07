<script setup lang="ts">
import type { Slot } from "vue";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{
  className?: string;
  /** Scrollable element to track instead of the window. */
  container?: HTMLElement | null;
}>();

const navbarRef = ref(null);
const visible = ref(false);

let unbind: (() => void) | undefined;

function handleScroll() {
  const scrollY = props.container ? props.container.scrollTop : window.scrollY;
  visible.value = scrollY > 100;
}

function bind(container?: HTMLElement | null) {
  unbind?.();
  const target = container ?? window;
  target.addEventListener("scroll", handleScroll, { passive: true });
  unbind = () => target.removeEventListener("scroll", handleScroll);
  handleScroll();
}

onMounted(() => bind(props.container));

watch(() => props.container, bind);

onUnmounted(() => unbind?.());

function provide(slot?: Slot) {
  if (!slot) return;
  return {
    visible: visible.value,
  };
}
</script>

<template>
  <div
    ref="navbarRef"
    class="sticky inset-x-0 top-0 md:top-10 z-50 w-full"
    :class="props.className"
  >
    <div class="w-full grid place-items-center pt-10">
      <div class="max-w-4xl w-full">
        <slot v-bind="provide($slots?.default)" />
      </div>
    </div>
  </div>
</template>
