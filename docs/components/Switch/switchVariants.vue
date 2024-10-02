<script setup>
import { ref } from 'vue'

const toggleSwitch = ref(false)
</script>

<template>
  <div class="flex space-x-4">
    <WSwitch
      v-model="toggleSwitch" :variants="{
        'my-variant': {
          switchActive: 'bg-yellow-500 dark:bg-yellow-400',
          switchIconOn: 'text-yellow-500 dark:text-yellow-400',
        },
      }" :variant="['my-variant']" on-icon="ph:moon" off-icon="ph:sun"
    />
    <WSwitch
      v-model="toggleSwitch" :variants="{
        'my-variant': {
          switchActive: 'bg-blue-500 dark:bg-blue-400',
          switchIconOn: 'text-blue-500 dark:text-blue-400',
        },
      }" :variant="['my-variant']" on-icon="ph:moon" off-icon="ph:sun"
    />
    <WSwitch
      v-model="toggleSwitch" :variants="{
        'my-variant': {
          switchActive: 'bg-green-500 dark:bg-green-400',
          switchIconOn: 'text-green-500 dark:text-green-400',
        },
      }" :variant="['my-variant']" on-icon="ph:moon" off-icon="ph:sun"
    />
    <WSwitch
      v-model="toggleSwitch" :variants="{
        'my-variant': {
          switchActive: 'bg-orange-500 dark:bg-orange-400',
          switchIconOn: 'text-orange-500 dark:text-orange-400',
        },
      }" :variant="['my-variant']" on-icon="ph:moon" off-icon="ph:sun"
    />
    <WSwitch
      v-model="toggleSwitch" :variants="{
        'my-variant': {
          switchActive: 'bg-red-500 dark:bg-red-400',
          switchIconOn: 'text-red-500 dark:text-red-400',
        },
      }" :variant="['my-variant']" on-icon="ph:moon" off-icon="ph:sun"
    />
  </div>
</template>
