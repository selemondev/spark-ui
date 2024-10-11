<!-- eslint-disable vue/valid-attribute-name -->
<script setup lang='ts'>
import { cn } from '../../lib/utils'

interface MarqueeProps {
  class?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  repeat?: number
  [key: string]: any
};

const props = withDefaults(defineProps<MarqueeProps>(), {
  pauseOnHover: false,
  vertical: false,
  repeat: 4,
})

const className = cn(
  'flex shrink-0 justify-around [gap:var(--gap)]',
  {
    'animate-marquee-vertical flex-col': props.vertical && !props.reverse,
    'animate-marquee-vertical-reverse flex-col': props.vertical && props.reverse,
    'animate-marquee flex-row': !props.vertical && !props.reverse,
    'animate-marquee-reverse': !props.vertical && props.reverse,
    'group-hover:[animation-play-state:paused]': props.pauseOnHover,
  },
)
</script>

<template>
  <div
    v-bind="props" group :class="cn('flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
                                    {
                                      'flex-row': !props.vertical,
                                      'flex-col': props.vertical,
                                    },
                                    props.className,
    )"
  >
    <div v-for="i in Array(props.repeat).fill(0)" :key="i">
      <div :key="i" class="flex shrink-0 justify-around [gap:var(--gap)]" :class="className">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: Marquee var(--duration) linear infinite;
}

.animate-marquee-reverse {
  animation: MarqueeReverse var(--duration) linear infinite;
}

.animate-marquee-vertical {
  animation: MarqueeVertical var(--duration) linear infinite;
}

.animate-marquee-vertical-reverse {
  animation: MarqueeVerticalReverse var(--duration) linear infinite;
}

@keyframes Marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes MarqueeReverse {
  0% {
    transform: translateX(calc(-100% - var(--gap)));
  }

  100% {
    transform: translateX(0);
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

@keyframes MarqueeVerticalReverse {
  0% {
    transform: translateY(calc(-100% - var(--gap)));
  }

  100% {
    transform: translateY(0);
  }
}
</style>
