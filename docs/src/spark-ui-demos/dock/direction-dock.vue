<script setup lang="ts">
import { ref } from "vue";
import BrandIcons from "./brand-icons.vue";
import Dock from "../../components/spark-ui/dock/dock.vue";
import DockIcon from "../../components/spark-ui/dock/dock-icon.vue";

const directions = ["top", "middle", "bottom"] as const;
const direction = ref<(typeof directions)[number]>("middle");
const icons = ["github", "googleDrive", "notion", "whatsapp"] as const;
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="flex gap-2">
      <button
        v-for="d in directions"
        :key="d"
        type="button"
        class="rounded-md border px-3 py-1 text-sm capitalize transition-colors"
        :class="direction === d ? 'bg-black text-white dark:bg-white dark:text-black' : ''"
        @click="direction = d"
      >
        {{ d }}
      </button>
    </div>
    <div class="relative flex h-32 items-center">
      <Dock :direction="direction">
        <DockIcon v-for="icon in icons" :key="icon">
          <BrandIcons :name="icon" class="size-6" />
        </DockIcon>
      </Dock>
    </div>
  </div>
</template>
