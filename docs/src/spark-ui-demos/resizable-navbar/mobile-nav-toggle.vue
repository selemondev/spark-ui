<script setup lang="ts">
import { Menu, X } from "@lucide/vue";

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>

<template>
  <div class="cursor-pointer" @click="handleClick">
    <X v-if="isOpen" class="text-black dark:text-white" />
    <Menu v-else class="text-black dark:text-white" />
  </div>
</template>
