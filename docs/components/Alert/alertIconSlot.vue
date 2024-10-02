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
    <WAlert :is-visible="isPrimaryActive" transition="slideLeft" closable title="Info" variant="primary" @close="handlePrimaryAlertClose">
      <template #leading>
        <WIcon name="material-symbols:info" size="2xl" />
      </template>
      <template #trailing>
        <WIcon name="fluent-emoji-flat:exploding-head" size="2xl" />
      </template>
      <WAlertDescription>
        Nuxt 3.7 is around the corner.
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isSuccessActive" transition="fade" closable title="Success" variant="success" @close="handleSuccessAlertClose">
      <template #leading>
        <WIcon name="material-symbols:check-circle-outline" size="2xl" />
      </template>
      <template #trailing>
        <WIcon name="fluent-emoji-flat:exploding-head" size="2xl" />
      </template>
      <WAlertDescription>
        Success! Your changes have been saved.
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isWarningActive" closable title="Warning" variant="warning" @close="handleWarningAlertClose">
      <template #leading>
        <WIcon name="ic:round-warning" size="2xl" />
      </template>
      <template #trailing>
        <WIcon name="fluent-emoji-flat:exploding-head" size="2xl" />
      </template>
      <WAlertDescription>
        Warning! You are about to delete this item.
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isDangerActive" transition="scale" closable title="Danger" variant="danger" @close="handleDangerAlertClose">
      <template #leading>
        <WIcon name="ph:warning-octagon-fill" size="2xl" />
      </template>
      <template #trailing>
        <WIcon name="fluent-emoji-flat:exploding-head" size="2xl" />
      </template>
      <WAlertDescription>
        Danger! An error occurred while processing your request.
      </WAlertDescription>
    </WAlert>
  </div>
</template>
