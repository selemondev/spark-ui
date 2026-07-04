<script setup lang="ts">
import BrandIcons from "./brand-icons.vue";
import Dock from "./dock.vue";
import DockIcon from "./dock-icon.vue";

const icons = ["github", "googleDrive", "notion", "whatsapp"] as const;
</script>

<template>
  <div class="relative flex items-center justify-center">
    <Dock :icon-magnification="60" :icon-distance="100">
      <DockIcon v-for="icon in icons" :key="icon" class="bg-black/10 dark:bg-white/10">
        <BrandIcons :name="icon" class="size-full" />
      </DockIcon>
    </Dock>
  </div>
</template>
