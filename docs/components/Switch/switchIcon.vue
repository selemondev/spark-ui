<script setup lang='ts'>
import { ref } from 'vue'

const toggleSwitch = ref(false)
</script>

<template>
  <div>
    <WSwitch v-model="toggleSwitch" on-icon="ph:moon" off-icon="ph:sun" />
  </div>
</template>
