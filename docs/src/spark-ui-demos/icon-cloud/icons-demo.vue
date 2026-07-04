<script setup lang="ts">
import IconCloud from "../../components/spark-ui/icon-cloud/icon-cloud.vue";
import { svgIcons } from "./icons";
</script>

<template>
  <div
    class="bg-background relative flex h-[400px] w-[300px] md:w-[500px] items-center justify-center overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
  >
    <IconCloud :icons="svgIcons" />
  </div>
</template>
