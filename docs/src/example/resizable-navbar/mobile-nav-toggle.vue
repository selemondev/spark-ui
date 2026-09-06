<script setup lang="ts">
import { Menu, X } from "@lucide/vue";
import { inject } from "vue";

const menuId = inject<string | undefined>("spark-mobile-nav-id", undefined);

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>

<template>
  <button
    type="button"
    class="cursor-pointer"
    :id="menuId ? `${menuId}-toggle` : undefined"
    :aria-controls="isOpen ? menuId : undefined"
    :aria-expanded="isOpen"
    :aria-label="isOpen ? 'Close navigation menu' : 'Open navigation menu'"
    @click="handleClick"
    @keydown.escape.stop.prevent="isOpen && handleClick()"
  >
    <X v-if="isOpen" class="text-black dark:text-white" />
    <Menu v-else class="text-black dark:text-white" />
  </button>
</template>
