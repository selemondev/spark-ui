<script setup lang="ts">
const { page } = useContent()
const config = useConfig()

useSeoMeta({
  title: `${page.value?.title ?? '404'} - ${config.value.site.name}`,
  ogTitle: page.value?.title,
  description: page.value?.description,
})
</script>

<template>
  <div
    class="bg-transparent py-6 dark:bg-transparent"
    :class="[config.main.padded && '']"
  >
    <ContentRenderer
      :key="page._id"
      :value="page"
    />
  </div>
</template>
