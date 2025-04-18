<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Slot } from 'vue';
const props = defineProps<{
  className?: string
}>();

const navbarRef = ref(null);
const visible = ref(false);

const handleScroll = () => {
  if (window.scrollY > 100) {
    visible.value = true;
  } else {
    visible.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const provide = (slot: Slot) => {
  if (!slot) return;
  return {
    visible: visible.value
  };
};
</script>

<template>
  <div 
    ref="navbarRef" 
    class="sticky inset-x-0 top-10 z-40 w-full" 
    :class="props.className"
  >
    <slot v-bind="provide($slots?.default)"></slot>
  </div>
</template>