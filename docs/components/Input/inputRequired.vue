<script setup lang='ts'>
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <div class="grid place-items-center w-full">
    <WInput v-model="email" label="Email" placeholder="Email Address" required />
  </div>
</template>
