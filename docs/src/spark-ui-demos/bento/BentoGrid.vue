<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import BentoCard from '../../components/spark-ui/bento/BentoCard.vue'
import BentoGrid from '../../components/spark-ui/bento/BentoGrid.vue'

const features = [
  {
    icon: 'radix-icons:file-text',
    name: 'Save your files',
    description: 'We automatically save your files as you type.',
    href: '/',
    cta: 'Learn more',
    background: 'absolute -right-20 -top-20 opacity-60',
    class: 'col-span-3 lg:col-span-1',
  },
  {
    icon: 'radix-icons:input',
    name: 'Full text search',
    description: 'Search through all your files in one place.',
    href: '/',
    cta: 'Learn more',
    background: 'absolute -right-20 -top-20 opacity-60',
    class: 'col-span-3 lg:col-span-2',
  },
  {
    icon: 'radix-icons:globe',
    name: 'Multilingual',
    description: 'Supports 100+ languages and counting.',
    href: '/',
    cta: 'Learn more',
    background: 'absolute -right-20 -top-20 opacity-60',
    class: 'col-span-3 lg:col-span-2',
  },
]
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <BentoGrid>
      <div v-for="feat in features" :key="feat.name" :class="feat.class">
        <BentoCard :name="feat.name">
          <div>
            <img :class="feat.background">
          </div>
          <div
            class="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10"
          >
            <Icon
              :icon="feat.icon"
              class="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"
            />
            <h3 class="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              {{ feat.name }}
            </h3>
            <p class="max-w-lg text-neutral-400">
              {{ feat.description }}
            </p>
          </div>

          <div
            class="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <button class="pointer-events-auto">
              <a :href="feat.href">
                {{ feat.cta }}
                <Icon :icon="feat.icon" class="ml-2 text-white h-4 w-4" />
              </a>
            </button>
          </div>
          <div
            class="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"
          />
        </BentoCard>
      </div>
    </BentoGrid>
  </div>
</template>
