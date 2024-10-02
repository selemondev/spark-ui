<template>
  <div class="grid place-items-center w-full space-y-4">
    <div class="flex space-x-4">
      <WButton loading label="default" />
      <WButton loading label="primary" variant="primary" />
      <WButton loading label="success" variant="success" />
      <WButton loading label="warning" variant="warning" />
    </div>

    <div class="flex space-x-4">
      <WButton loading label="default" variant="default-light" />
      <WButton loading label="primary" variant="primary-light" />
      <WButton loading label="success" variant="success-light" />
      <WButton loading label="warning" variant="warning-light" />
    </div>

    <div class="flex space-x-4">
      <WButton loading label="default" variant="default-outline" />
      <WButton loading label="primary" variant="primary-outline" />
      <WButton loading label="success" variant="success-outline" />
      <WButton loading label="warning" variant="warning-outline" />
    </div>

    <div class="flex space-x-4">
      <WButton loading label="default" variant="default-dashed" />
      <WButton loading label="primary" variant="primary-dashed" />
      <WButton loading label="success" variant="success-dashed" />
      <WButton loading label="warning" variant="warning-dashed" />
    </div>
  </div>
</template>
