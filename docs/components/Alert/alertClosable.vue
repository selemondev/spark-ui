<script setup lang='ts'>
import { ref } from 'vue'

const isDefaultActive = ref(true)

function handleDefaultAlertClose() {
  return isDefaultActive.value = false
}

const isPrimaryActive = ref(true)

function handlePrimaryAlertClose() {
  return isPrimaryActive.value = false
}

const isSuccessActive = ref(true)

function handleSuccessAlertClose() {
  return isSuccessActive.value = false
}

const isWarningActive = ref(true)

function handleWarningAlertClose() {
  return isWarningActive.value = false
}

const isDangerActive = ref(true)

function handleDangerAlertClose() {
  return isDangerActive.value = false
}
</script>

<template>
  <div class="w-full space-y-3">
    <WAlert :is-visible="isDefaultActive" closable title="Hello world" @close="handleDefaultAlertClose">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isPrimaryActive" closable title="Hello world" variant="primary" @close="handlePrimaryAlertClose">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isSuccessActive" closable title="Hello world" variant="success" @close="handleSuccessAlertClose">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isWarningActive" closable title="Hello world" variant="warning" @close="handleWarningAlertClose">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isDangerActive" closable title="Hello world" variant="danger" @close="handleDangerAlertClose">
      <WAlertDescription>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, excepturi!
      </WAlertDescription>
    </WAlert>
  </div>
</template>
