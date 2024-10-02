<script setup lang='ts'>
import { ref } from 'vue'

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
    <WAlert icon="material-symbols:info" :trailing="true" :is-visible="isPrimaryActive" transition="slideLeft" closable title="Info" variant="primary" @close="handlePrimaryAlertClose">
      <WAlertDescription>
        Nuxt 3.7 is around the corner.
      </WAlertDescription>
    </WAlert>

    <WAlert icon="material-symbols:check-circle-outline" :trailing="true" :is-visible="isSuccessActive" transition="fade" closable title="Success" variant="success" @close="handleSuccessAlertClose">
      <WAlertDescription>
        Success! Your changes have been saved.
      </WAlertDescription>
    </WAlert>

    <WAlert icon="ic:round-warning" :trailing="true" :is-visible="isWarningActive" transition="scale" closable title="Warning" variant="warning" @close="handleWarningAlertClose">
      <WAlertDescription>
        Warning! You are about to delete this item.
      </WAlertDescription>
    </WAlert>

    <WAlert icon="ph:warning-octagon-fill" :trailing="true" :is-visible="isDangerActive" transition="scale" closable title="Danger" variant="danger" @close="handleDangerAlertClose">
      <WAlertDescription>
        Danger! An error occurred while processing your request.
      </WAlertDescription>
    </WAlert>
  </div>
</template>
