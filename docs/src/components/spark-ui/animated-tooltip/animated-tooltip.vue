<script setup lang="ts">
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion-v";
import { computed, ref, useId } from "vue";

export interface Items {
  id: number;
  name: string;
  designation: string;
  image: string;
}
const props = defineProps<{
  items: Items[];
}>();

const tooltipId = useId();
const hoveredIndex = ref<number | null>(null);
const focusedIndex = ref<number | null>(null);
const pinnedIndex = ref<number | null>(null);
const dismissedIndex = ref<number | null>(null);
const activeIndex = computed(() => {
  const id = pinnedIndex.value ?? hoveredIndex.value ?? focusedIndex.value;
  return id === dismissedIndex.value ? null : id;
});
function activate(id: number) {
  dismissedIndex.value = pinnedIndex.value === id ? id : null;
  pinnedIndex.value = pinnedIndex.value === id ? null : id;
}
function blurItem(id: number) {
  focusedIndex.value = null;
  if (pinnedIndex.value === id) pinnedIndex.value = null;
}
const springConfig = { stiffness: 100, damping: 5 };
const x = useMotionValue(0);
const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
// translate the tooltip
const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);
function handleMouseMove(event: any) {
  const halfWidth = event.target.offsetWidth / 2;
  x.set(event.offsetX - halfWidth);
}
</script>

<template>
  <div v-for="item in props.items" :key="item.id">
    <div
      class="group relative -mr-4"
      @mouseenter="
        hoveredIndex = item.id;
        dismissedIndex = null;
      "
      @mouseleave="hoveredIndex = null"
      @keydown.escape.stop.prevent="
        dismissedIndex = item.id;
        pinnedIndex = null;
      "
    >
      <AnimatePresence mode="popLayout">
        <div v-if="activeIndex === item.id">
          <motion.div
            :id="`${tooltipId}-${item.id}`"
            role="tooltip"
            :initial="{
              opacity: 0,
              y: 20,
              scale: 0.6,
            }"
            :animate="{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 10,
              },
            }"
            :exit="{
              opacity: 0,
              y: 20,
              scale: 0.6,
            }"
            :style="{
              translateX,
              rotate,
              whiteSpace: 'nowrap',
            }"
            class="absolute -top-16 -left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
          >
            <div
              class="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            />
            <div
              class="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent"
            />
            <div class="relative z-30 text-base font-bold text-white">
              {{ item.name }}
            </div>
            <div class="text-xs text-white">
              {{ item.designation }}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
      <button
        type="button"
        class="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        :aria-label="item.name"
        :aria-describedby="activeIndex === item.id ? `${tooltipId}-${item.id}` : undefined"
        @focus="
          focusedIndex = item.id;
          dismissedIndex = null;
        "
        @blur="blurItem(item.id)"
        @click="activate(item.id)"
      >
        <img
          :src="item.image"
          alt=""
          height="100"
          width="100"
          class="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          @mousemove="handleMouseMove"
        />
      </button>
    </div>
  </div>
</template>
