<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import BentoCard from './BentoCard.vue'
import BentoGrid from './BentoGrid.vue'

const features = [
  {
    icon: 'radix-icons:file-text',
    name: 'Save your files',
    description: 'We automatically save your files as you type.',
    href: '/',
    cta: 'Learn more',
    background: 'absolute -right-20 opacity-60',
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    icon: 'radix-icons:input',
    name: 'Full text search',
    description: 'Search through all your files in one place.',
    href: '/',
    cta: 'Learn more',
    background: 'absolute -right-20 opacity-60',
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
]
</script>

<template>
  <div class="relative h-full w-full">
    <BentoGrid class-name="relative">
      <div v-for="feat in features" :key="feat.name">
        <BentoCard :name="feat.name" class="h-48">
          <div>
            <img :class="feat.background">
          </div>
          <div
            group-hover:-translate-y-10
            class="pointer-events-none flex transform-gpu flex-col p-6 transition-all duration-300"
          >
            <Icon
              :icon="feat.icon" group-hover:scale-75
              class="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out"
            />
            <h3 class="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              {{ feat.name }}
            </h3>
            <p class="max-w-lg text-neutral-400">
              {{ feat.description }}
            </p>
          </div>

          <div
            group-hover:translate-y-0 group-hover:opacity-100
            class="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300"
          >
            <button class="pointer-events-auto">
              <a :href="feat.href" class="dark:text-white">
                {{ feat.cta }}
              </a>
            </button>
          </div>
          <div
            group-hover:dark:bg-neutral-800
            class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300"
          />
        </BentoCard>
      </div>
    </BentoGrid>
  </div>
</template>
