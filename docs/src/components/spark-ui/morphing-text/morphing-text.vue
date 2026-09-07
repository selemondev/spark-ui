<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { cn } from "../../../lib/utils";

interface MorphingTextProps {
  texts: string[];
  className?: string;
}
const props = defineProps<MorphingTextProps>();
const filterId = `morphing-threshold-${useId()}`;
const first = ref<HTMLSpanElement | null>(null);
const second = ref<HTMLSpanElement | null>(null);
const morphTime = 1.5;
const cooldownTime = 0.5;
let frame = 0;
let mounted = false;

function restart() {
  cancelAnimationFrame(frame);
  if (!first.value || !second.value) return;
  let index = 0;
  let morph = 0;
  let cooldown = 0;
  let previous = performance.now();
  const left = first.value;
  const right = second.value;
  left.textContent = props.texts[0] ?? "";
  right.textContent = "";
  left.style.filter = "none";
  left.style.opacity = "1";
  right.style.opacity = "0";
  if (props.texts.length < 2) return;

  function animate(now: number) {
    const elapsed = (now - previous) / 1000;
    previous = now;
    cooldown -= elapsed;
    if (cooldown <= 0) {
      morph -= cooldown;
      cooldown = 0;
      const fraction = Math.min(morph / morphTime, 1);
      const inverse = 1 - fraction;
      right.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      right.style.opacity = String(fraction ** 0.4);
      left.style.filter = `blur(${Math.min(8 / inverse - 8, 100)}px)`;
      left.style.opacity = String(inverse ** 0.4);
      left.textContent = props.texts[index % props.texts.length];
      right.textContent = props.texts[(index + 1) % props.texts.length];
      if (fraction === 1) {
        cooldown = cooldownTime;
        index++;
      }
    } else {
      morph = 0;
      right.style.filter = "none";
      right.style.opacity = "1";
      left.style.filter = "none";
      left.style.opacity = "0";
    }
    frame = requestAnimationFrame(animate);
  }
  frame = requestAnimationFrame(animate);
}

onMounted(() => {
  mounted = true;
  restart();
});
watch(
  () => props.texts,
  () => {
    if (mounted) restart();
  },
  { deep: true },
);
onBeforeUnmount(() => {
  mounted = false;
  cancelAnimationFrame(frame);
});
</script>

<template>
  <div
    :class="
      cn(
        'relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] font-bold leading-none md:h-24 lg:text-[6rem]',
        props.className,
      )
    "
  >
    <span class="sr-only">{{ props.texts.join(", ") }}</span>
    <div
      class="absolute inset-0"
      :style="{ filter: `url(#${filterId}) blur(0.6px)` }"
      aria-hidden="true"
    >
      <span ref="first" class="absolute inset-x-0 top-0 m-auto inline-block w-full">{{
        props.texts[0] ?? ""
      }}</span>
      <span ref="second" class="absolute inset-x-0 top-0 m-auto inline-block w-full" />
    </div>
    <svg class="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
      <defs>
        <filter :id="filterId">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>
