<script setup lang='ts'>
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="grid place-items-center w-full">
    <div class="flex space-x-3">
      <WCheckbox v-model="checked" disabled label="Agree" />
      <WCheckbox v-model="checked" disabled label="Agree" variant="primary" />
    </div>
  </div>
</template>
