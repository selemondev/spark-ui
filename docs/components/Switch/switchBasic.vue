<script setup lang='ts'>
import { ref } from 'vue'

const toggleSwitch = ref(false)
</script>

<template>
  <div>
    <WSwitch v-model="toggleSwitch" />
  </div>
</template>
