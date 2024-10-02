<script setup lang='ts'>
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="grid place-items-center w-full">
    <div class="flex space-x-3">
      <WCheckbox v-model="checked" label="Agree" required />
      <WCheckbox v-model="checked" label="Agree" variant="primary" required />
      <WCheckbox v-model="checked" label="Agree" variant="success" required />
      <WCheckbox v-model="checked" label="Agree" variant="warning" required />
      <WCheckbox v-model="checked" label="Agree" variant="danger" required />
    </div>
  </div>
</template>
