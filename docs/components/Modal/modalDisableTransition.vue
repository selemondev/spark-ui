<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

function openModal() {
  return isOpen.value = true
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
    <WModal v-model="isOpen" :transition="false" />
  </div>
</template>
