<script setup lang="ts">
const { prev, next } = useContent()
</script>

<template>
  <div class="mt-10 border-t pt-8 lg:flex lg:flex-row">
    <LayoutPrevNextButton :prev-next="prev" side="left" />
    <span class="flex-1" />
    <LayoutPrevNextButton :prev-next="next" side="right" />
  </div>
</template>
