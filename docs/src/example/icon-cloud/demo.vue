<script setup lang="ts">
import IconCloud from "./icon-cloud.vue";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "python",
  "react",
  "flutter",
  "android",
  "html5",
  "css",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "go",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "vuedotjs",
  "androidstudio",
  "sonarqubeserver",
  "figma",
];

const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}`);
</script>

<template>
  <div
    class="relative flex h-[400px] max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-[500px] items-center justify-center overflow-hidden rounded-lg"
  >
    <IconCloud :images="images" />
  </div>
</template>
