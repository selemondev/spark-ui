# Avatar Circles

Overlapping circles of avatars.

<demo src="../../src/example/avatar-circles/demo.vue" srcCode="../../src/spark-ui-demos/avatar-circles/avatar-circles.vue" />

## Installation

Copy the following files into `src/components/spark-ui/avatar-circles/`:

```vue [avatar-circles.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

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
```

## Props

| Prop       | Type     | Description                                                                                       | Default   |
| ---------- | -------- | ------------------------------------------------------------------------------------------------- | --------- |
| class      | string   | The class to be applied.                                                                          | ""        |
| numPeople  | number   | Optional additional-person count, rendered as noninteractive text. Omit to hide the count circle. | undefined |
| avatarUrls | string[] | Required avatar image URLs.                                                                       | —         |
