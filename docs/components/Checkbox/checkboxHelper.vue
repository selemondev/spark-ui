<script setup lang='ts'>
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="grid place-items-center w-full">
    <div class="flex space-x-3">
      <WCheckbox v-model="checked" label="Agree" help="Please mark the checkbox." required />
      <WCheckbox v-model="checked" label="Agree" help="Please mark the checkbox." variant="primary" required />
    </div>
  </div>
</template>
