<script setup lang="ts">
import IconCloud from "./icon-cloud.vue";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
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
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);
</script>

<template>
  <div
    class="relative flex h-[400px] w-[300px] md:w-[500px] items-center justify-center overflow-hidden rounded-lg"
  >
    <IconCloud :images="images" />
  </div>
</template>
