<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  items: Array<{ name: string; link: string }>;
  className?: string;
}>();

const emits = defineEmits(["itemClick"]);
const hovered = ref<number | null>(null);
function handleItemHover(idx: number) {
  hovered.value = idx;
}

function clearHover() {
  hovered.value = null;
}

function handleClick() {
  emits("itemClick");
}
</script>

<template>
  <div
    class="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2"
    :class="className"
    @mouseleave="clearHover"
  >
    <a
      v-for="(item, idx) in items"
      :key="`link-${idx}`"
      :href="item?.link"
      class="relative px-4 py-2 text-neutral-600"
      @mouseenter="handleItemHover(idx)"
      @click="handleClick"
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
