<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../lib/utils";

interface AvatarCirclesProps {
  class?: string;
  numPeople?: number;
  avatarUrls: string[];
}

const props = defineProps<AvatarCirclesProps>();

const className = computed(() => cn("z-10 flex -space-x-4 rtl:space-x-reverse", props.class));
</script>

<template>
  <div :class="className">
    <div v-for="(imageUrl, idx) in props.avatarUrls" :key="idx">
      <img
        :key="idx"
        class="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
        :src="imageUrl"
        :height="40"
        :width="40"
        :alt="`Avatar ${idx + 1}`"
      />
    </div>
    <span
      v-if="props.numPeople !== undefined"
      class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white dark:border-gray-800 dark:bg-white dark:text-black"
    >
      +{{ props.numPeople }}
    </span>
  </div>
</template>
