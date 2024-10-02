<template>
  <div class="grid place-items-center w-full">
    <div class="flex space-x-3">
      <WButton icon="ph:music-notes" :trailing="true" variant="danger" />
      <WButton
        icon="basil:twitch-outline" :trailing="true" :variants="{
          'my-variant': {
            root: 'bg-purple-500 hover:bg-purple-600 transition-all duration-200 ease-in',
          },
        }" :variant="['my-variant']"
      />
      <WButton variant="primary">
        <template #trailing>
          <WIcon name="bxl:meta" class="text-white" size="xl" />
        </template>
      </WButton>
      <WButton variant="danger">
        <template #trailing>
          <WIcon name="ic:baseline-play-arrow" class="text-white" size="xl" />
        </template>
      </WButton>
      <WButton
        :variants="{
          'my-variant': {
            root: 'bg-black hover:bg-gray-800 transition-all duration-200 ease-in',
          },
        }" :variant="['my-variant']"
      >
        <template #trailing>
          <WIcon name="mdi:triangle" size="lg" />
        </template>
      </WButton>
    </div>
  </div>
</template>
