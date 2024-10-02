<script setup lang='ts'>
import { ref } from 'vue'

const isActive = ref(true)
</script>

<template>
  <div class="w-full space-y-3">
    <WAlert :is-visible="isActive" title="Hello world" variant="default-light">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isActive" title="Hello world" variant="primary-light">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isActive" title="Hello world" variant="success-light">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isActive" title="Hello world" variant="warning-light">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isActive" title="Hello world" variant="danger-light">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>
  </div>
</template>
