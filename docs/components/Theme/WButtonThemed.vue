<template>
  <div class="flex space-x-6">
    <div>
      <WButton
        :variants="{
          'my-variant': {
            buttonPill: '!rounded-none',
          },
        }" :variant="['my-variant', 'primary']" pill label="Button"
      />
    </div>
    <div>
      <WButton label="Button" variant="primary" />
    </div>
  </div>
</template>
