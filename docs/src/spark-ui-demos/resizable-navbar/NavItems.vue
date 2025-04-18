<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  items: Array<{ name: string; link: string }>;
  className?: string;
}>()

const hovered = ref<number | null>(null);
const emits = defineEmits(['itemClick']);
const handleItemHover = (idx: number) => {
  hovered.value = idx;
};

const clearHover = () => {
  hovered.value = null;
};

const handleClick = () => {
  emits('itemClick');
};
</script>

<template>
  <div 
    @mouseleave="clearHover"
    class="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2"
    :class="className"
  >
    <a
      v-for="(item, idx) in items"
      :key="`link-${idx}`"
      :href="item?.link"
      @mouseenter="handleItemHover(idx)"
      @click="handleClick"
      class="relative px-4 py-2 text-neutral-600"
    >
      <transition name="fade">
        <div 
          v-if="hovered === idx" 
          class="absolute inset-0 h-full w-full rounded-full bg-gray-100"
        />
      </transition>
      <span class="relative z-20">{{ item?.name }}</span>
    </a>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>