<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { cn } from "../../lib/utils";

interface DiaTextRevealProps {
  /** Text to reveal. Pass multiple strings to rotate when `repeat` is `true`. */
  text: string | string[];
  /** Colors sampled across the moving gradient band. */
  colors?: string[];
  /** CSS color for revealed text after the sweep and for leading/trailing regions. */
  textColor?: string;
  /** Duration of one sweep pass, in seconds. */
  duration?: number;
  /** Delay before the sweep starts, in seconds. */
  delay?: number;
  /** When `text` is an array, replay the sweep and advance to the next string after each completion. */
  repeat?: boolean;
  /** Pause between cycles when `repeat` is `true`, in seconds. */
  repeatDelay?: number;
  /** If `true`, the animation starts only after the element enters the viewport. */
  startOnView?: boolean;
  /** If `true`, in-view detection fires at most once (no replay on scroll-back). */
  once?: boolean;
  /** Additional class names for the animated `span`. */
  class?: string;
  /** Use the widest string's width for layout instead of animating width per line. */
  fixedWidth?: boolean;
}

const BAND_HALF = 17;
const SWEEP_START = -BAND_HALF;
const SWEEP_END = 100 + BAND_HALF;

const sweepEase = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF;
  const bandEnd = pos + BAND_HALF;

  if (bandStart >= 100) {
    return `linear-gradient(90deg, ${textColor}, ${textColor})`;
  }
  const n = colors.length;
  const parts: string[] = [];

  if (bandStart > 0) parts.push(`${textColor} 0%`, `${textColor} ${bandStart.toFixed(2)}%`);

  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2;
    parts.push(`${c} ${pct.toFixed(2)}%`);
  });

  if (bandEnd < 100) parts.push(`transparent ${bandEnd.toFixed(2)}%`, `transparent 100%`);

  return `linear-gradient(90deg, ${parts.join(", ")})`;
}

function measureWidths(el: HTMLElement, values: string[]) {
  const ghost = el.cloneNode() as HTMLElement;
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "auto",
    whiteSpace: "nowrap",
  });
  el.parentElement!.append(ghost);
  const widths = values.map((t) => {
    ghost.textContent = t;
    return ghost.getBoundingClientRect().width;
  });
  ghost.remove();
  return widths;
}

const props = withDefaults(defineProps<DiaTextRevealProps>(), {
  colors: () => ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"],
  textColor: "hsl(var(--foreground, 222.2 84% 4.9%))",
  duration: 1.5,
  delay: 0,
  repeat: false,
  repeatDelay: 0.5,
  startOnView: true,
  once: true,
  fixedWidth: false,
});

const texts = computed(() => (Array.isArray(props.text) ? props.text : [props.text]));
const isMulti = computed(() => texts.value.length > 1);

const spanRef = ref<HTMLSpanElement | null>(null);
const activeIndex = ref(0);
const measuredWidths = ref<number[]>([]);
const sweepPos = ref(SWEEP_START);

const backgroundImage = computed(() =>
  buildGradient(sweepPos.value, props.colors, props.textColor),
);

let hasPlayed = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let rafId: number | undefined;
let observer: IntersectionObserver | undefined;
let prefersReducedMotion = false;
let cycle = 0;

function stopAnimation() {
  cycle++;
  clearTimeout(timer);
  timer = undefined;
  if (rafId !== undefined) {
    cancelAnimationFrame(rafId);
    rafId = undefined;
  }
}

function play() {
  const { duration, delay } = props;

  sweepPos.value = SWEEP_START;
  stopAnimation();
  const currentCycle = cycle;
  if (!texts.value.length) {
    sweepPos.value = SWEEP_END;
    return;
  }

  const durationMs = duration * 1000;
  const delayMs = delay * 1000;
  let startTime: number | undefined;

  const step = (now: number) => {
    if (currentCycle !== cycle) return;
    if (startTime === undefined) startTime = now;
    const elapsed = now - startTime - delayMs;

    if (elapsed < 0) {
      rafId = requestAnimationFrame(step);
      return;
    }

    const t = durationMs === 0 ? 1 : Math.min(elapsed / durationMs, 1);
    sweepPos.value = SWEEP_START + (SWEEP_END - SWEEP_START) * sweepEase(t);

    if (t < 1) {
      rafId = requestAnimationFrame(step);
      return;
    }

    rafId = undefined;
    if (!props.repeat) return;
    timer = setTimeout(() => {
      if (currentCycle !== cycle || !props.repeat || !texts.value.length) return;
      timer = undefined;
      activeIndex.value = (activeIndex.value + 1) % texts.value.length;
      play();
    }, props.repeatDelay * 1000);
  };

  rafId = requestAnimationFrame(step);
}

function start() {
  if (prefersReducedMotion) {
    sweepPos.value = SWEEP_END;
    return;
  }
  if (props.once && hasPlayed) return;
  hasPlayed = true;
  play();
}

function remeasure() {
  const el = spanRef.value;
  if (!el || !isMulti.value) return;
  measuredWidths.value = measureWidths(el, texts.value);
}

watch(
  () => [...texts.value],
  () => {
    activeIndex.value = Math.min(activeIndex.value, Math.max(0, texts.value.length - 1));
    remeasure();
    if (hasPlayed && !prefersReducedMotion) play();
  },
  { flush: "post" },
);

watch(
  () => props.repeat,
  (repeat) => {
    stopAnimation();
    if (repeat && hasPlayed && !prefersReducedMotion) play();
    else if (hasPlayed || prefersReducedMotion) sweepPos.value = SWEEP_END;
  },
);

onMounted(() => {
  prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  remeasure();

  if (prefersReducedMotion) {
    sweepPos.value = SWEEP_END;
    return;
  }

  if (!props.startOnView) {
    start();
    return;
  }

  const el = spanRef.value;
  if (!el) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          start();
          if (props.once) observer?.disconnect();
        }
      }
    },
    { threshold: 0.1 },
  );
  observer.observe(el);
});

onBeforeUnmount(() => {
  stopAnimation();
  observer?.disconnect();
});

const fixedW = computed(() =>
  isMulti.value && props.fixedWidth && measuredWidths.value.length > 0
    ? Math.max(...measuredWidths.value)
    : undefined,
);

const animatedW = computed(() =>
  isMulti.value && !props.fixedWidth && measuredWidths.value[activeIndex.value] != null
    ? measuredWidths.value[activeIndex.value]
    : undefined,
);

const spanStyle = computed(() => {
  const style: Record<string, string> = {
    transform: "translateY(-2px)",
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    backgroundSize: "100% 100%",
    backgroundImage: backgroundImage.value,
  };
  if (isMulti.value) {
    style.display = "inline-block";
    style.overflow = "hidden";
    style.whiteSpace = "nowrap";
    style.verticalAlign = "text-center";
    style.transition = "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    if (fixedW.value != null) {
      style.width = `${fixedW.value}px`;
    } else if (animatedW.value != null) {
      style.width = `${animatedW.value}px`;
    }
  }
  return style;
});
</script>

<template>
  <span
    ref="spanRef"
    :class="cn('align-bottom leading-[100%] text-inherit', props.class)"
    :style="spanStyle"
  >
    {{ texts[activeIndex] }}
  </span>
</template>
