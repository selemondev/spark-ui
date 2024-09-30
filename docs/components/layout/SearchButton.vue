<script setup lang="ts">
const isOpen = ref(false)
const { enable, inAside, style, placeholder } = useConfig().value.search
</script>

<template>
  <template v-if="enable">
    <UiButton
      v-if="style === 'input'"
      variant="outline"
      class="h-8 w-full self-center rounded-md border pr-1.5 font-normal text-muted-foreground dark:border-[#1E2625] dark:bg-[#0C0E0F] dark:hover:border-[#232C2A] hover:dark:bg-[#101111]"
      :class="[inAside ? 'mb-4' : 'w-32 md:w-64']"
      @click="isOpen = true"
    >
      <span class="mr-auto hidden overflow-hidden md:block">
        {{ placeholder }}
      </span>
      <span class="mr-auto block overflow-hidden md:hidden">
        Search...
      </span>
      <Kbd class="ml-auto hidden md:block">
        <span class="text-xs">⌘</span>K
      </Kbd>
    </UiButton>
    <UiButton
      v-else
      variant="ghost"
      size="icon"
      @click="isOpen = true"
    >
      <Icon name="lucide:search" size="16" />
    </UiButton>
  </template>

  <LayoutSearchDialog v-model:open="isOpen" />
</template>
