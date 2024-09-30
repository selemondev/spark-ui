<script setup lang="ts">
const config = useConfig()
const route = useRoute()
</script>

<template>
  <header
    class="sticky top-0 z-40 bg-transparent backdrop-blur-lg"
    :class="[config.header.border && route.path === '/' ? 'lg:border-b lg:border-[#E0F9F7] lg:dark:border-b lg:dark:border-[#11231E]' : config.header.border && route.path !== '/' ? 'dark:border-[#27272A] lg:dark:border-b' : '']"
  >
    <div
      class="flex h-16 items-center justify-between gap-2 px-2 md:px-6 xl:px-12" :class="{
        'border-b border-[#E0F9F7] dark:border-[#11231E] lg:border-none': config.header.border && route.path === '/',
        'border-b dark:border-[#27272A] lg:border-none': config.header.border && route.path !== '/',
        '2xl:container': config.main.padded,
      }"
    >
      <div class="flex items-center lg:space-x-10">
        <LayoutHeaderLogo class="hidden flex-1 md:flex" />
        <LayoutMobileNav />
        <LayoutHeaderLogo v-if="config.header.showTitleInMobile" class="flex md:hidden" />
        <LayoutHeaderNav class="hidden flex-1 lg:flex" />
      </div>
      <div class="flex flex-1 justify-end gap-2">
        <LayoutSearchButton v-if="!config.search.inAside && config.search.style === 'input'" />
        <div class="flex">
          <LayoutSearchButton v-if="!config.search.inAside && config.search.style === 'button'" />
          <DarkModeToggle v-if="config.header.darkModeToggle" />
          <NuxtLink v-for="(link, i) in config.header.links" :key="i" :to="link?.to" :target="link?.target">
            <UiButton variant="ghost" size="icon" class="flex gap-2 hover:bg-transparent">
              <Icon
                v-if="link?.icon" :name="link.icon" size="18"
                class="text-gray-500 transition-colors duration-200 ease-in hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-300"
              />
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="config.toc.enable && config.toc.enableInMobile" class="lg:hidden">
      <LayoutToc is-small />
    </div>
  </header>
</template>
