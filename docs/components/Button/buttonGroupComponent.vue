<template>
  <div class="grid place-items-center w-full">
    <WButtonGroup>
      <WButton icon="ph:music-notes" label="Music" variant="danger" />
      <WButton
        icon="basil:twitch-outline" :variants="{
          'my-variant': {
            root: 'bg-purple-500 hover:bg-purple-600 transition-all duration-200 ease-in',
          },
        }" label="Twitch" :variant="['my-variant']"
      />
      <WButton label="Meta" variant="primary">
        <template #leading>
          <WIcon name="bxl:meta" class="text-white" size="xl" />
        </template>
      </WButton>
      <WButton label="Youtube" variant="danger">
        <template #leading>
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
        <template #leading>
          <WIcon name="mdi:triangle" size="lg" />
        </template>
      </WButton>
    </WButtonGroup>
  </div>
</template>
