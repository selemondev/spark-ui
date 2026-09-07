<script setup lang="ts">
import { AnimatePresence, motion, useReducedMotion } from "motion-v";
import { computed, ref, watch } from "vue";
import { cn } from "../../lib/utils";

interface AnimatedSubscribeButtonProps {
  class?: string;
  subscribeStatus?: boolean;
}

const props = withDefaults(defineProps<AnimatedSubscribeButtonProps>(), {
  subscribeStatus: undefined,
});
const emit = defineEmits<{
  "update:subscribeStatus": [value: boolean];
  click: [event: MouseEvent];
}>();
const localStatus = ref(false);
const isSubscribed = computed(() => props.subscribeStatus ?? localStatus.value);
const reducedMotion = useReducedMotion();

watch(
  () => props.subscribeStatus,
  (value) => {
    if (value !== undefined) localStatus.value = value;
  },
  { immediate: true },
);

function handleClick(event: MouseEvent) {
  if ((event.currentTarget as HTMLButtonElement).disabled) return;
  const nextStatus = !isSubscribed.value;
  if (props.subscribeStatus === undefined) localStatus.value = nextStatus;
  emit("update:subscribeStatus", nextStatus);
  emit("click", event);
}
</script>

<template>
  <button
    type="button"
    :aria-pressed="isSubscribed"
    :class="
      cn(
        'relative flex h-10 w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg border-none bg-primary px-6 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )
    "
    @click="handleClick"
  >
    <AnimatePresence mode="wait" :initial="false">
      <motion.span
        :key="isSubscribed ? 'subscribed' : 'unsubscribed'"
        class="relative flex items-center justify-center font-semibold"
        :initial="{
          opacity: reducedMotion ? 1 : 0,
          x: 0,
          y: isSubscribed && !reducedMotion ? -50 : 0,
        }"
        :animate="{ opacity: 1, x: 0, y: 0 }"
        :exit="{ opacity: 0, x: !isSubscribed && !reducedMotion ? 50 : 0 }"
        :transition="{ duration: reducedMotion ? 0 : 0.15 }"
      >
        <slot v-if="isSubscribed" name="subscribed">Subscribed</slot>
        <slot v-else name="unsubscribed">Subscribe</slot>
      </motion.span>
    </AnimatePresence>
  </button>
</template>
