# Pointer

Replace the pointer inside an element with an animated shape.

<demo src="../../src/example/pointer/demo.vue" srcCode="../../src/spark-ui-demos/pointer/demo.vue" />

## Installation

Install `motion-v` before you copy the component.

Copy the file below into `src/components/spark-ui/pointer/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [pointer.vue]
<script setup lang="ts">
import { AnimatePresence, motion, useMotionValue } from "motion-v";
import { onBeforeUnmount, onMounted, ref, useAttrs } from "vue";
import { cn } from "@/lib/utils";

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
        :style="[{ top: y, left: x, translateX: '-50%', translateY: '-50%' }, attrs.style]"
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
```

:::

## Usage

```vue
<script setup lang="ts">
import Pointer from "@/components/spark-ui/pointer/pointer.vue";
</script>

<template>
  <div class="h-64 rounded-xl border p-8">
    Hover inside this area.
    <Pointer class="text-violet-500" />
  </div>
</template>
```

## Behavior

Place Pointer directly inside the element that owns the hover area. It does not wrap the area. The default slot replaces the arrow.

`class` replaces the upstream `className` prop and styles the default arrow. Other attributes and motion props pass to the floating container. `style` merges with its position.

The pointer enters and leaves with scale and opacity animations. It renders in the document body so a transformed ancestor cannot offset its position.

Only a mouse on a device with fine pointer support hides the native cursor. Touch and pen input keep the native cursor. The component restores the previous cursor style on leave and unmount.

Scrolling, lost focus, and a hidden page dismiss the pointer. Move the mouse again inside the area to show it. All listeners detach on unmount.

## Props

| Prop         | Type                   | Default                    | Description                        |
| ------------ | ---------------------- | -------------------------- | ---------------------------------- |
| `class`      | `string`               | —                          | Classes for the default arrow.     |
| `style`      | `object`               | —                          | Styles for the floating container. |
| `initial`    | Motion animation value | `{ scale: 0, opacity: 0 }` | The entry state.                   |
| `animate`    | Motion animation value | `{ scale: 1, opacity: 1 }` | The visible state.                 |
| `exit`       | Motion animation value | `{ scale: 0, opacity: 0 }` | The exit state.                    |
| `transition` | Motion transition      | Motion default             | The animation timing.              |

The component also accepts motion-v attributes on the floating `motion.div`.

## Source

Ported from [Magic UI Pointer](https://magicui.design/docs/components/pointer). The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/pointer.tsx) uses the MIT license.
