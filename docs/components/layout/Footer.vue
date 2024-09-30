<script setup lang="ts">
const { footer } = useConfig().value
</script>

<template>
  <footer class="py-6 text-muted-foreground md:px-8 md:py-0">
    <div class="container flex flex-col items-center justify-between gap-2 md:h-24 md:flex-row">
      <NuxtLink :to="footer.to" :target="footer.target" class="flex gap-2">
        <p v-if="footer?.title" class="text-black dark:text-white">
          {{ footer.title }} <span class="underline transition-all duration-200 ease-in hover:text-[#54D899]">{{ footer.author }}</span>
        </p>
      </NuxtLink>
    </div>
  </footer>
</template>
