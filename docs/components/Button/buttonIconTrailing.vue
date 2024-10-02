<template>
  <div class="grid place-items-center w-full">
    <div class="flex space-x-3">
      <WButton icon="ph:music-notes" :trailing="true" label="Music" variant="danger" />
      <WButton
        icon="basil:twitch-outline" :trailing="true" :variants="{
          'my-variant': {
            root: 'bg-purple-500 hover:bg-purple-600 transition-all duration-200 ease-in',
          },
        }" label="Twitch" :variant="['my-variant']"
      />
      <WButton label="Meta" variant="primary">
        <template #trailing>
          <WIcon name="bxl:meta" class="text-white" size="xl" />
        </template>
      </WButton>
      <WButton label="Youtube" variant="danger">
        <template #trailing>
          <WIcon name="ic:baseline-play-arrow" class="text-white" size="xl" />
        </template>
      </WButton>
      <WButton
        :variants="{
          'my-variant': {
            root: 'bg-black hover:bg-gray-800 transition-all duration-200 ease-in',
          },
        }" label="Vercel" :variant="['my-variant']"
      >
        <template #trailing>
          <WIcon name="mdi:triangle" size="lg" />
        </template>
      </WButton>
    </div>
  </div>
</template>
