<script setup>
import { ref } from 'vue'

const isActive = ref(true)

function handleCloseTag() {
  return isActive.value = false
}
</script>

<template>
  <div class="grid place-items-center w-full">
    <div class="flex space-x-3">
      <WTag :is-active="isActive" value="Search" closable @close="handleCloseTag" />
      <WTag :is-active="isActive" value="Search" variant="primary" closable @close="handleCloseTag" />
      <WTag :is-active="isActive" value="Search" variant="success" closable @close="handleCloseTag" />
      <WTag :is-active="isActive" value="Search" variant="warning" closable @close="handleCloseTag" />
      <WTag :is-active="isActive" value="Search" variant="danger" closable @close="handleCloseTag" />
    </div>
  </div>
</template>
