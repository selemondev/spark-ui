<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { cn } from "../../../lib/utils";

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star";

interface AnimatedThemeTogglerProps {
  class?: string;
  duration?: number;
  variant?: TransitionVariant;
  /** When true, the transition expands from the viewport center instead of the button center. */
  fromCenter?: boolean;
  /**
   * Controlled theme value. When provided, the parent owns persistence
   * and this component will not write to localStorage.
   */
  theme?: "light" | "dark";
}

const props = withDefaults(defineProps<AnimatedThemeTogglerProps>(), {
  duration: 400,
  variant: "circle",
  fromCenter: false,
  theme: undefined,
});

const emit = defineEmits<{
  /** Called on toggle. Pair with `theme` for controlled usage. */
  themeChange: [theme: "light" | "dark"];
}>();

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

const buttonRef = ref<HTMLButtonElement | null>(null);
const internalIsDark = ref(false);
const isControlled = computed(() => props.theme !== undefined);
const isDark = computed(() => (isControlled.value ? props.theme === "dark" : internalIsDark.value));
let observer: MutationObserver | null = null;

onMounted(() => {
  const updateTheme = () => {
    internalIsDark.value = document.documentElement.classList.contains("dark");
  };

  updateTheme();

  observer = new MutationObserver(updateTheme);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onUnmounted(() => {
  observer?.disconnect();
  observer = null;
});

function polygonCollapsed(cx: number, cy: number, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => `${cx}px ${cy}px`).join(", ");
  return `polygon(${pairs})`;
}

function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number,
): [string, string] {
  switch (variant) {
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        `${cx - halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy + halfSide}px`,
        `${cx - halfSide}px ${cy + halfSide}px`,
      ].join(", ");
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case "triangle": {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [
        `${cx}px ${cy - scale}px`,
        `${cx + dx}px ${cy + 0.5 * scale}px`,
        `${cx - dx}px ${cy + 0.5 * scale}px`,
      ].join(", ");
      return [polygonCollapsed(cx, cy, 3), `polygon(${verts})`];
    }
    case "diamond": {
      // Slightly larger than the view-transition circle radius so axis-aligned coverage matches the circle reveal.
      const R = maxRadius * Math.SQRT2;
      const end = [
        `${cx}px ${cy - R}px`,
        `${cx + R}px ${cy}px`,
        `${cx}px ${cy + R}px`,
        `${cx - R}px ${cy}px`,
      ].join(", ");
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2;
      const verts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        verts.push(`${cx + R * Math.cos(a)}px ${cy + R * Math.sin(a)}px`);
      }
      return [polygonCollapsed(cx, cy, 6), `polygon(${verts.join(", ")})`];
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        `${cx - halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy + halfH}px`,
        `${cx - halfW}px ${cy + halfH}px`,
      ].join(", ");
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case "star": {
      // Small overscan so the last frames never leave a 1px seam before the transition group ends.
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius: number) => {
        const verts: string[] = [];
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          verts.push(`${cx + radius * Math.cos(outerA)}px ${cy + radius * Math.sin(outerA)}px`);
          const innerA = outerA + Math.PI / 5;
          verts.push(
            `${cx + radius * innerRatio * Math.cos(innerA)}px ${cy + radius * innerRatio * Math.sin(innerA)}px`,
          );
        }
        return `polygon(${verts.join(", ")})`;
      };
      const startR = Math.max(2, R * 0.025);
      return [starPolygon(startR), starPolygon(R)];
    }
    default:
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`];
  }
}

const applyTheme = () => {
  const newIsDark = !isDark.value;

  if (isControlled.value) {
    emit("themeChange", newIsDark ? "dark" : "light");
    return;
  }

  // Keep DOM class in sync before view-transition snapshots in uncontrolled mode.
  document.documentElement.classList.toggle("dark", newIsDark);
  internalIsDark.value = newIsDark;
  localStorage.setItem("theme", newIsDark ? "dark" : "light");
};

const toggleTheme = () => {
  const button = buttonRef.value;
  if (!button) return;

  const doc = document as ViewTransitionDocument;

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || typeof doc.startViewTransition !== "function") {
    applyTheme();
    return;
  }

  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

  let x: number;
  let y: number;
  if (props.fromCenter) {
    x = viewportWidth / 2;
    y = viewportHeight / 2;
  } else {
    const { top, left, width, height } = button.getBoundingClientRect();
    x = left + width / 2;
    y = top + height / 2;
  }

  const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));

  const clipPath = getThemeTransitionClipPaths(
    props.variant,
    x,
    y,
    maxRadius,
    viewportWidth,
    viewportHeight,
  );

  const root = document.documentElement;
  root.dataset.sparkThemeVt = "active";
  root.style.setProperty("--spark-theme-toggle-vt-duration", `${props.duration}ms`);
  // Pin the collapsed clip-path via CSS so Firefox does not paint the new
  // theme unclipped between snapshot and the ready.then() JS animation.
  root.style.setProperty("--spark-theme-vt-clip-from", clipPath[0]);
  const cleanup = () => {
    delete root.dataset.sparkThemeVt;
    root.style.removeProperty("--spark-theme-toggle-vt-duration");
    root.style.removeProperty("--spark-theme-vt-clip-from");
  };

  const transition = doc.startViewTransition(async () => {
    applyTheme();
    await nextTick();
  });
  transition.finished.finally(cleanup);

  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath },
      {
        duration: props.duration,
        // Star: linear avoids easing overshoot that fights polygon interpolation at t→1.
        easing: props.variant === "star" ? "linear" : "ease-in-out",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
};

defineExpose({ toggleTheme });
</script>

<template>
  <button ref="buttonRef" type="button" :class="cn(props.class)" @click="toggleTheme">
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
    <span class="sr-only">Toggle theme</span>
  </button>
</template>
