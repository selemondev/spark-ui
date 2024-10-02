<template>
  <div>
    <div class="flex space-x-10">
      <WBadge chip variant="default">
        <WButton label="Default" variant="default" />
      </WBadge>
      <WBadge value="primary" variant="primary">
        <WButton label="Primary" variant="primary" />
      </WBadge>
      <WBadge value="success" variant="success">
        <WButton label="Success" variant="success" />
      </WBadge>
      <WBadge value="150" :max-value="100" variant="warning">
        <WButton label="Warning" variant="warning" />
      </WBadge>
      <WBadge value="online" square variant="danger">
        <WButton label="Danger" variant="danger" />
      </WBadge>
    </div>
  </div>
</template>
