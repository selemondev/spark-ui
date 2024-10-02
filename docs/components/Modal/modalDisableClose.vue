<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

function openModal() {
  return isOpen.value = true
}

function closeModal() {
  return isOpen.value = false
}
</script>

<template>
  <div class="grid place-items-center w-full">
    <WButton
      :variants="{
        'my-variant': {
          root: 'bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-300 transition-all duration-200 ease-in',
        },
      }" :variant="['my-variant']" label="Open Modal" @click="openModal"
    />
    <WModal v-model="isOpen" disable-close>
      <div class="absolute right-0 px-4 py-1">
        <WIcon name="heroicons:x-mark-20-solid" size="2xl" class="dark:text-white cursor-pointer" @click="closeModal" />
      </div>
    </WModal>
  </div>
</template>
