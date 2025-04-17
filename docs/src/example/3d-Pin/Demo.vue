<script setup lang='ts'>
import PinContainer from './PinContainer.vue'
</script>

<template>
  <div class="h-[40rem] w-full flex items-center justify-center ">
    <PinContainer
      title="/spark-ui.dev"
      href="https://twitter.com/selemondev"
    >
      <div class="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
        <h3 class="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
          Spark UI
        </h3>
        <div class="text-base !m-0 !p-0 font-normal">
          <span class="text-slate-500 ">
            Customizable Tailwind CSS and Motion Vue Components.
          </span>
        </div>
        <div class="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
      </div>
    </PinContainer>
  </div>
</template>
