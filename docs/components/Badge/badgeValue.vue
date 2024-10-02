<template>
  <div>
    <div class="flex space-x-10">
      <WBadge :value="150" :max-value="100" variant="default">
        <WButton label="Default" variant="default" />
      </WBadge>
      <WBadge :value="150" :max-value="100" variant="primary">
        <WButton label="Primary" variant="primary" />
      </WBadge>
      <WBadge :value="150" :max-value="100" variant="success">
        <WButton label="Success" variant="success" />
      </WBadge>
      <WBadge value="warning" variant="warning">
        <WButton label="Warning" variant="warning" />
      </WBadge>
      <WBadge value="danger" variant="danger">
        <WButton label="Danger" variant="danger" />
      </WBadge>
    </div>
  </div>
</template>
