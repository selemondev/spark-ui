<script setup lang='ts'>
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="grid place-items-center w-full">
    <div class="flex space-x-3">
      <WCheckbox v-model="checked" label="Agree" />
      <WCheckbox v-model="checked" label="Agree" variant="primary" />
      <WCheckbox v-model="checked" label="Agree" variant="success" />
      <WCheckbox v-model="checked" label="Agree" variant="warning" />
      <WCheckbox v-model="checked" label="Agree" variant="danger" />
    </div>
  </div>
</template>
