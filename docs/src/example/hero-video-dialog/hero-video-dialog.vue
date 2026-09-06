<script setup lang="ts">
import { Play, XIcon } from "@lucide/vue";
import { AnimatePresence, motion } from "motion-v";
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { cn } from "../../lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}
const props = withDefaults(defineProps<HeroVideoProps>(), {
  animationStyle: "from-center",
  thumbnailAlt: "Video thumbnail",
});
const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};
const isVideoOpen = ref(false);
const selectedAnimation = computed(() => animationVariants[props.animationStyle]);
const dialog = ref<HTMLDialogElement | null>(null);
let previousFocus: HTMLElement | null = null;
let restoreScroll: (() => void) | undefined;

async function openVideo() {
  if (dialog.value?.open) return;
  previousFocus = document.activeElement as HTMLElement | null;
  const style = document.documentElement.style;
  const overflow = style.getPropertyValue("overflow");
  const priority = style.getPropertyPriority("overflow");
  restoreScroll = () => {
    if (overflow) style.setProperty("overflow", overflow, priority);
    else style.removeProperty("overflow");
  };
  style.setProperty("overflow", "hidden");
  isVideoOpen.value = true;
  await nextTick();
  dialog.value?.showModal();
}

function closeVideo() {
  isVideoOpen.value = false;
}

function finishClose() {
  if (isVideoOpen.value) return;
  dialog.value?.close();
  restoreScroll?.();
  restoreScroll = undefined;
  if (previousFocus?.isConnected) previousFocus.focus();
  previousFocus = null;
}

onBeforeUnmount(() => {
  isVideoOpen.value = false;
  finishClose();
});
</script>

<template>
  <div :class="cn('relative', props.className)">
    <button
      type="button"
      class="group relative block w-full cursor-pointer"
      :aria-label="`Play video: ${thumbnailAlt}`"
      aria-haspopup="dialog"
      @click="openVideo"
    >
      <img
        :src="thumbnailSrc"
        :alt="thumbnailAlt"
        width="1920"
        height="1080"
        class="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
      />
      <div
        class="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100"
      >
        <div
          class="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md"
        >
          <div
            class="relative flex size-20 scale-100 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]"
          >
            <Play
              class="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
              :style="{
                filter:
                  'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
              }"
            />
          </div>
        </div>
      </div>
    </button>
    <dialog
      ref="dialog"
      aria-modal="true"
      :aria-label="thumbnailAlt"
      class="m-0 h-dvh max-h-none w-screen max-w-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-transparent"
      @cancel.prevent="closeVideo"
    >
      <AnimatePresence :on-exit-complete="finishClose">
        <motion.div
          v-if="isVideoOpen"
          key="video"
          :initial="{
            opacity: 0,
          }"
          :animate="{
            opacity: 1,
          }"
          :exit="{
            opacity: 0,
          }"
          class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 backdrop-blur-md"
          @click.self="closeVideo"
        >
          <motion.div
            v-bind="selectedAnimation"
            :transition="{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }"
            class="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
          >
            <motion.button
              type="button"
              aria-label="Close video"
              autofocus
              @click="closeVideo"
              class="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black"
            >
              <XIcon class="size-5" />
            </motion.button>
            <div
              class="relative isolate z-[1] size-full overflow-hidden rounded-2xl border-2 border-white"
            >
              <iframe
                :title="thumbnailAlt"
                :src="videoSrc"
                class="size-full rounded-2xl"
                allowFullScreen
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share;
                "
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </dialog>
  </div>
</template>
