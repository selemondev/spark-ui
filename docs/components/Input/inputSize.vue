<script setup lang='ts'>
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <div class="w-full">
    <div class="space-y-3">
      <div class="flex space-x-3">
        <WInput v-model="email" label="Email" placeholder="Email Address" size="sm" />
        <WInput v-model="email" label="Email" placeholder="Email Address" size="md" />
        <WInput v-model="email" label="Email" placeholder="Email Address" size="lg" />
        <WInput v-model="email" label="Email" placeholder="Email Address" size="xl" />
      </div>
    </div>
  </div>
</template>
