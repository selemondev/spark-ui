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
    <WAlert :is-visible="isPrimaryActive" transition="slideLeft" closable title="Selemondev" variant="primary-light" @close="handlePrimaryAlertClose">
      <template #leading>
        <WAvatar src="https://github.com/selemondev.png" />
      </template>
      <WAlertDescription>
        Creator of Windi UI.
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isSuccessActive" transition="fade" closable title="Sebastian Chopin" variant="success-light" @close="handleSuccessAlertClose">
      <template #leading>
        <WAvatar src="https://github.com/atinux.png" />
      </template>
      <WAlertDescription>
        CEO at NuxtLabs.
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isWarningActive" closable title="Evan You" variant="warning-light" @close="handleWarningAlertClose">
      <template #leading>
        <WAvatar src="https://github.com/yyx990803.png" />
      </template>
      <WAlertDescription>
        Creator of Vue.
      </WAlertDescription>
    </WAlert>

    <WAlert :is-visible="isDangerActive" transition="scale" closable title="Anthony Fu" variant="danger-light" @close="handleDangerAlertClose">
      <template #leading>
        <WAvatar src="https://github.com/antfu.png" />
      </template>
      <WAlertDescription>
        Creator of UnoCss.
      </WAlertDescription>
    </WAlert>
  </div>
</template>
