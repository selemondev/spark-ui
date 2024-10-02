<template>
  <div class="flex space-x-3">
    <WButton label="Music" variant="danger">
      <template #leading>
        <WIcon name="ph:music-notes" class="text-white" size="xl" />
      </template>
      <template #trailing>
        <WIcon name="ph:music-notes" class="text-white" size="xl" />
      </template>
    </WButton>
    <WButton
      :variants="{
        'my-variant': {
          root: 'bg-purple-500 hover:bg-purple-600 transition-all duration-200 ease-in',
        },
      }" label="Twitch" :variant="['my-variant']"
    >
      <template #leading>
        <WIcon name="basil:twitch-outline" class="text-white" size="xl" />
      </template>
      <template #trailing>
        <WIcon name="basil:twitch-outline" class="text-white" size="xl" />
      </template>
    </WButton>
    <WButton label="Meta" variant="primary">
      <template #leading>
        <WIcon name="bxl:meta" class="text-white" size="xl" />
      </template>
      <template #trailing>
        <WIcon name="bxl:meta" class="text-white" size="xl" />
      </template>
    </WButton>
    <WButton label="Youtube" variant="danger">
      <template #leading>
        <WIcon name="ic:baseline-play-arrow" class="text-white" size="xl" />
      </template>
      <template #trailing>
        <WIcon name="ic:baseline-play-arrow" class="text-white" size="xl" />
      </template>
    </WButton>
  </div>
</template>
