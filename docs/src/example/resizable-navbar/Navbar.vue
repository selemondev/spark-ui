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
  <div ref="navbarRef" class="sticky inset-x-0 top-0 md:top-10 z-50 w-full" :class="props.className">
    <div class="w-full grid place-items-center pt-10">
      <div class="max-w-4xl w-full">
        <slot v-bind="provide($slots?.default)"></slot>
      </div>
    </div>
  </div>
</template>