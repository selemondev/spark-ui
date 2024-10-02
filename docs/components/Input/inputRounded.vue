<script setup lang='ts'>
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <div class="grid place-items-center w-full">
    <div class="space-y-6">
      <WInput v-model="email" label="Email" placeholder="Email Address" rounded="sm" />
      <WInput v-model="email" label="Email" placeholder="Email Address" rounded="md" />
      <WInput v-model="email" label="Email" placeholder="Email Address" rounded="lg" />
      <WInput v-model="email" label="Email" placeholder="Email Address" rounded="xl" />
    </div>
  </div>
</template>
