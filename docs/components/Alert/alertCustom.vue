<script setup lang='ts'>
import { ref } from 'vue'

const isActive = ref(true)
function handleCloseAlert() {
  return isActive.value = false
}
</script>

<template>
  <div class="w-full">
    <WAlert
      icon="noto:alembic"
      :variants="{
        'my-variant': {
          root: 'bg-white dark:bg-transparent border border-neutral-300 dark:text-white dark:border-neutral-800',
          alertCloseButtonClass: 'hover:bg-gray-500 dark:hover:bg-gray-800',
        },
      }" transition="fade" :variant="['my-variant']" closable :is-visible="isActive" title="Custom Alert" @close="handleCloseAlert"
    >
      <WAlertDescription>
        <p>This is a custom alert description.</p>
      </WAlertDescription>
    </WAlert>
  </div>
</template>
