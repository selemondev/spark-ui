<template>
  <div>
    <div class="flex space-x-10">
      <WBadge chip position="top-left" variant="default">
        <WButton label="Default" variant="default" />
      </WBadge>
      <WBadge chip position="bottom-left" variant="success">
        <WButton label="Success" variant="success" />
      </WBadge>
      <WBadge chip position="bottom-right" variant="warning">
        <WButton label="Warning" variant="warning" />
      </WBadge>
      <WBadge chip position="top-right" variant="danger">
        <WButton label="Danger" variant="danger" />
      </WBadge>
      <WBadge :value="150" :max-value="100" position="top-right" variant="success">
        <WIcon name="mdi:bell" size="3xl" class="dark:text-white" />
      </WBadge>
      <WBadge :value="10" position="top-right" variant="primary">
        <WIcon name="ph:envelope" size="3xl" class="dark:text-white" />
      </WBadge>
    </div>
  </div>
</template>
