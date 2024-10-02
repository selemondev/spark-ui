<script setup lang='ts'>
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="grid place-items-center w-full">
    <div class="flex space-x-3">
      <WCheckbox v-model="checked" icon="ri:check-double-fill" label="Agree" variant="primary" />
      <WCheckbox v-model="checked" icon="heroicons:x-mark-20-solid" label="Cancel" variant="danger" />
    </div>
  </div>
</template>
