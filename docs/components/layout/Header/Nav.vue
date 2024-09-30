<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const { nav } = useConfig().value.header
</script>

<template>
  <UiNavigationMenu>
    <UiNavigationMenuList>
      <UiNavigationMenuItem v-for="(item, i) in nav" :key="i" class="relative">
        <NuxtLink :to="item.to" :target="item.target">
          <!-- <Icon name="lucide:arrow-up-right" class="absolute right-2 top-2 text-muted-foreground" size="13" /> -->
          <div class="bg-transparent pr-4 font-semibold transition-colors duration-200 ease-in hover:bg-none hover:text-[#54D899]" :class="navigationMenuTriggerStyle()">
            {{ item.title }}
          </div>
        </NuxtLink>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>
