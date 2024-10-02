<script setup lang='ts'>
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <div class="grid place-items-center w-full">
    <div class="space-y-3">
      <WInput v-model="email" icon="ph:sun" label="Email" placeholder="Email Address" />
      <WInput v-model="email" label="Email" placeholder="Email Address">
        <template #leading>
          <WIcon name="ph:sun" size="xl" class="text-gray-500" />
        </template>
      </WInput>
    </div>
  </div>
</template>
