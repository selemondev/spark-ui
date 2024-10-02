<script setup lang='ts'>
import { ref } from 'vue'

const isActive = ref(true)
</script>

<template>
  <div class="w-full">
    <WAlert :is-visible="isActive" title="Hello world">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>
  </div>
</template>
