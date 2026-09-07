<script setup lang="ts">
import { motion, useSpring } from "motion-v";
import { computed, onBeforeUnmount, onMounted, ref, useId } from "vue";

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}
const props = withDefaults(
  defineProps<{
    springConfig?: SpringConfig;
    scope?: "global" | "parent";
  }>(),
  {
    springConfig: () => ({ damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }),
    scope: "global",
  },
);
const anchor = ref<HTMLElement | null>(null);
const visible = ref(false);
const filterId = `smooth-cursor-${useId().replace(/:/g, "")}`;
const cursorX = useSpring(
  0,
  computed(() => props.springConfig),
);
const cursorY = useSpring(
  0,
  computed(() => props.springConfig),
);
const rotation = useSpring(
  0,
  computed(() => ({ ...props.springConfig, damping: 60, stiffness: 300 })),
);
const scale = useSpring(
  1,
  computed(() => ({ ...props.springConfig, stiffness: 500, damping: 35 })),
);
let target: HTMLElement | Window | null = null;
let cursorOwner: HTMLElement | null = null;
let media: MediaQueryList | undefined;
let oldCursor = "";
let oldPriority = "";
let cursorHidden = false;
let lastX = 0;
let lastY = 0;
let lastTime = 0;
let previousAngle = 0;
let accumulatedRotation = 0;
let frame = 0;
let timeout: ReturnType<typeof setTimeout> | undefined;
let pending: PointerEvent | null = null;

function hide() {
  visible.value = false;
  lastTime = 0;
  pending = null;
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  if (timeout !== undefined) clearTimeout(timeout);
  timeout = undefined;
  scale.set(1);
  if (cursorOwner && cursorHidden) {
    if (oldCursor) cursorOwner.style.setProperty("cursor", oldCursor, oldPriority);
    else cursorOwner.style.removeProperty("cursor");
    cursorHidden = false;
  }
}
function update() {
  frame = 0;
  const event = pending;
  pending = null;
  if (!event) return;
  const now = performance.now();
  const delta = now - lastTime;
  const dx = event.clientX - lastX;
  const dy = event.clientY - lastY;
  const speed = lastTime && delta > 0 ? Math.hypot(dx, dy) / delta : 0;
  if (!visible.value) {
    cursorX.jump(event.clientX);
    cursorY.jump(event.clientY);
  } else {
    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
  }
  visible.value = true;
  if (cursorOwner && !cursorHidden && event.pointerType === "mouse") {
    oldCursor = cursorOwner.style.getPropertyValue("cursor");
    oldPriority = cursorOwner.style.getPropertyPriority("cursor");
    cursorOwner.style.setProperty("cursor", "none");
    cursorHidden = true;
  }
  if (speed > 0.1) {
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    let difference = angle - previousAngle;
    if (difference > 180) difference -= 360;
    if (difference < -180) difference += 360;
    accumulatedRotation += difference;
    previousAngle = angle;
    rotation.set(accumulatedRotation);
    scale.set(0.95);
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = setTimeout(() => {
      scale.set(1);
      timeout = undefined;
    }, 150);
  }
  lastX = event.clientX;
  lastY = event.clientY;
  lastTime = now;
}
function move(event: Event) {
  const pointer = event as PointerEvent;
  if (!media?.matches || pointer.pointerType === "touch") {
    hide();
    return;
  }
  pending = pointer;
  if (!frame) frame = requestAnimationFrame(update);
}
function pointerOut(event: PointerEvent) {
  if (!event.relatedTarget) hide();
}
function visibilityChange() {
  if (document.visibilityState !== "visible") hide();
}
onMounted(() => {
  cursorOwner = props.scope === "parent" ? (anchor.value?.parentElement ?? null) : document.body;
  target = props.scope === "parent" ? cursorOwner : window;
  media = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
  target?.addEventListener("pointermove", move, { passive: true });
  target?.addEventListener("pointerleave", hide);
  target?.addEventListener("pointercancel", hide);
  media.addEventListener("change", hide);
  window.addEventListener("pointerout", pointerOut);
  window.addEventListener("blur", hide);
  window.addEventListener("scroll", hide, true);
  document.addEventListener("visibilitychange", visibilityChange);
});
onBeforeUnmount(() => {
  hide();
  target?.removeEventListener("pointermove", move);
  target?.removeEventListener("pointerleave", hide);
  target?.removeEventListener("pointercancel", hide);
  media?.removeEventListener("change", hide);
  window.removeEventListener("pointerout", pointerOut);
  window.removeEventListener("blur", hide);
  window.removeEventListener("scroll", hide, true);
  document.removeEventListener("visibilitychange", visibilityChange);
});
</script>

<template>
  <span ref="anchor" hidden aria-hidden="true" />
  <Teleport to="body">
    <motion.div
      v-if="visible"
      aria-hidden="true"
      :style="{
        position: 'fixed',
        left: cursorX,
        top: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        rotate: rotation,
        scale,
        zIndex: 100,
        pointerEvents: 'none',
        willChange: 'transform',
      }"
      :initial="false"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.15 }"
    >
      <slot name="cursor">
        <slot>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="54"
            viewBox="0 0 50 54"
            fill="none"
            style="transform: scale(0.5)"
          >
            <g :filter="`url(#${filterId})`">
              <path
                d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
                fill="black"
              />
              <path
                d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
                stroke="white"
                :stroke-width="2.25825"
              />
            </g>
            <defs>
              <filter
                :id="filterId"
                x="0.602397"
                y="0.952444"
                width="49.0584"
                height="52.428"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2.25825" />
                <feGaussianBlur stdDeviation="2.25825" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="dropShadow" result="shape" />
              </filter>
            </defs>
          </svg>
        </slot>
      </slot>
    </motion.div>
  </Teleport>
</template>
