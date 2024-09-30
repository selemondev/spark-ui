<!-- eslint-disable unused-imports/no-unused-vars -->
<script setup lang="ts">
import Background from './Background.vue'

defineProps<{
  announcement?: {
    to?: string
    target?: string
    icon?: string
    title: string
  }
  actions: [{
    name: string
    leftIcon?: string
    rightIcon?: string
    variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost'
    to: string
    target?: string
  }]
}>()
</script>

<template>
  <Background />
  <section class="absolute left-1/2 top-80 z-10 flex w-full max-w-[980px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-2 px-4 py-8 md:top-72 md:py-12 md:pb-8 lg:mx-auto lg:py-40 lg:pb-20">
    <NuxtLink
      v-if="announcement"
      :to="announcement.to"
      :target="announcement.target"
      class="inline-flex items-start rounded-lg bg-muted px-3 py-1 text-sm font-medium md:items-center"
    >
      <template v-if="announcement.icon">
        <Icon :name="announcement.icon" size="16" />
        <UiSeparator class="mx-2 h-4" orientation="vertical" />
      </template>
      <span class="sm:hidden">{{ announcement.title }}</span>
      <span class="hidden sm:inline">
        {{ announcement.title }}
      </span>
      <Icon name="lucide:arrow-right" class="ml-1 size-4" />
    </NuxtLink>

    <h1 v-motion-fade class="items-start font-sans text-[40px] font-bold leading-tight tracking-tighter md:text-center lg:text-6xl lg:leading-[1.1]">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h1>
    <span class="max-w-[650px] items-start font-Inter text-[15px] text-muted-foreground md:text-center md:text-[18px] md:leading-normal">
      <ContentSlot :use="$slots.description" unwrap="p" />
    </span>

    <section class="flex w-full flex-col items-start justify-center space-x-0 space-y-3 py-4 md:flex-row md:items-center md:space-x-4 md:space-y-0 md:pb-10">
      <NuxtLink
        v-for="(action, i) in actions"
        :key="i"
        :to="action.to"
        :target="action.target"
        class="w-full md:w-48"
      >
        <UiButton
          class="w-full cursor-pointer dark:text-white md:w-48" :variant="action.variant" :class="{
            'border border-[#148f5c] bg-[#006239] transition-colors duration-200 ease-in hover:border-[#3ECF8E] hover:bg-[#0f6b45]': !action.variant,
            'bg-white transition-colors duration-200 ease-in hover:border hover:bg-transparent dark:bg-background hover:dark:border-[#2c2c30]': action.variant === 'outline',
          }"
        >
          <Icon v-if="action.leftIcon" :name="action.leftIcon" class="mr-1 dark:text-white" />
          {{ action.name }}
          <Icon v-if="action.rightIcon" :name="action.rightIcon" class="ml-1 dark:text-white" />
        </UiButton>
      </NuxtLink>
    </section>
  </section>
</template>
