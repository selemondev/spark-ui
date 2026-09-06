<script setup lang="ts">
import { AnimatePresence, motion, useMotionValue } from "motion-v";
import { onBeforeUnmount, onMounted, ref, useAttrs } from "vue";
import { cn } from "../../../lib/utils";

defineOptions({ inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const anchor = ref<HTMLElement | null>(null);
const active = ref(false);
const x = useMotionValue(0);
const y = useMotionValue(0);
let parent: HTMLElement | null = null;
let media: MediaQueryList | undefined;
let cursor = "";
let cursorPriority = "";
let hidden = false;

function deactivate() {
  active.value = false;
  if (parent && hidden) {
    if (cursor) parent.style.setProperty("cursor", cursor, cursorPriority);
    else parent.style.removeProperty("cursor");
    hidden = false;
  }
}
function move(event: PointerEvent) {
  if (event.pointerType !== "mouse" || !media?.matches) {
    deactivate();
    return;
  }
  x.set(event.clientX);
  y.set(event.clientY);
  active.value = true;
  if (parent && !hidden) {
    cursor = parent.style.getPropertyValue("cursor");
    cursorPriority = parent.style.getPropertyPriority("cursor");
    parent.style.setProperty("cursor", "none");
    hidden = true;
  }
}
function visibilityChange() {
  if (document.visibilityState !== "visible") deactivate();
}
onMounted(() => {
  parent = anchor.value?.parentElement ?? null;
  media = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
  parent?.addEventListener("pointermove", move);
  parent?.addEventListener("pointerenter", move);
  parent?.addEventListener("pointerleave", deactivate);
  parent?.addEventListener("pointercancel", deactivate);
  media.addEventListener("change", deactivate);
  window.addEventListener("blur", deactivate);
  window.addEventListener("scroll", deactivate, true);
  document.addEventListener("visibilitychange", visibilityChange);
});
onBeforeUnmount(() => {
  deactivate();
  parent?.removeEventListener("pointermove", move);
  parent?.removeEventListener("pointerenter", move);
  parent?.removeEventListener("pointerleave", deactivate);
  parent?.removeEventListener("pointercancel", deactivate);
  media?.removeEventListener("change", deactivate);
  window.removeEventListener("blur", deactivate);
  window.removeEventListener("scroll", deactivate, true);
  document.removeEventListener("visibilitychange", visibilityChange);
});
</script>

<template>
  <span ref="anchor" hidden aria-hidden="true" />
  <Teleport to="body">
    <AnimatePresence>
      <motion.div
        v-if="active"
        aria-hidden="true"
        class="pointer-events-none fixed z-50"
        :initial="{ scale: 0, opacity: 0 }"
        :animate="{ scale: 1, opacity: 1 }"
        :exit="{ scale: 0, opacity: 0 }"
        v-bind="attrs"
        :style="[{ top: y, left: x, translateX: '-50%', translateY: '-50%' }, attrs.style] as any"
      >
        <slot>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="1"
            viewBox="0 0 16 16"
            height="24"
            width="24"
            :class="cn('rotate-[-70deg] stroke-white text-black', props.class)"
          >
            <path
              d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"
            />
          </svg>
        </slot>
      </motion.div>
    </AnimatePresence>
  </Teleport>
</template>
