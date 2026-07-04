<script setup lang="ts">
import { useId } from "vue";
import { cn } from "../../../lib/utils";

interface BacklightProps {
  class?: string;
  blur?: number;
}

const props = withDefaults(defineProps<BacklightProps>(), {
  blur: 20,
});

const id = useId();
</script>

<template>
  <div :class="cn(props.class)">
    <svg width="0" height="0" aria-hidden="true">
      <filter :id="id" y="-50%" x="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" :stdDeviation="props.blur" result="blurred" />
        <feColorMatrix type="saturate" in="blurred" values="4" />
        <feComposite in="SourceGraphic" operator="over" />
      </filter>
    </svg>

    <div :style="{ filter: `url(#${id})` }">
      <slot />
    </div>
  </div>
</template>
