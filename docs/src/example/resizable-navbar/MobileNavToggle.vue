<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <div @click="handleClick" class="cursor-pointer">
    <X v-if="isOpen" class="text-black dark:text-white" />
    <Menu v-else class="text-black dark:text-white" />
  </div>
</template>