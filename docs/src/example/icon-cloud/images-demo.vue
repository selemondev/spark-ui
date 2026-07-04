<script setup lang="ts">
import IconCloud from "./icon-cloud.vue";

const images = [
  "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675553988173-a5249b5815fe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675297844586-534b030564e0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675555581018-7f1a352ff9a6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1719937050517-68d4e2a1702e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675553988173-a5249b5815fe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675297844586-534b030564e0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675555581018-7f1a352ff9a6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1719937050517-68d4e2a1702e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675553988173-a5249b5815fe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675297844586-534b030564e0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://plus.unsplash.com/premium_photo-1675555581018-7f1a352ff9a6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1719937050517-68d4e2a1702e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
];
</script>

<template>
  <div
    class="bg-background relative flex h-[400px] w-[300px] md:w-[500px] items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <IconCloud :images="images" />
  </div>
</template>
