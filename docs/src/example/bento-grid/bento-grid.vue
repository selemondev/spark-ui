<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../lib/utils";

const props = defineProps<{
  class?: string;
}>();
const classStyle = computed(() => cn("grid w-full grid-cols-1 lg:grid-cols-2 gap-4", props.class));
</script>

<template>
  <div :class="classStyle">
    <slot />
  </div>
</template>
