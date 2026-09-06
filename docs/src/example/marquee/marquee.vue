<!-- eslint-disable vue/valid-attribute-name -->
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../lib/utils";

interface MarqueeProps {
  class?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
});

const className = computed(() =>
  cn("flex shrink-0 justify-around [gap:var(--gap)]", {
    "animate-marquee-vertical flex-col": props.vertical,
    "animate-marquee flex-row": !props.vertical,
    "[animation-direction:reverse]": props.reverse,
    "group-hover:[animation-play-state:paused]": props.pauseOnHover,
  }),
);
</script>

<template>
  <div
    v-bind="props"
    :class="
      cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !props.vertical,
          'flex-col': props.vertical,
        },
        props.class,
      )
    "
  >
    <div
      v-for="i in props.repeat"
      :key="i"
      :class="className"
      :aria-hidden="i > 1 ? true : undefined"
      :inert="i > 1"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation-name: Marquee;
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.animate-marquee-vertical {
  animation-name: MarqueeVertical;
  animation-duration: var(--duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes Marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes MarqueeVertical {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(calc(-100% - var(--gap)));
  }
}
</style>
