# Resizable Navbar

A navbar that changes width on scroll, responsive and animated.

<demo src="../../src/example/resizable-navbar/demo.vue" srcCode="../../src/spark-ui-demos/resizable-navbar/demo.vue" />

## Installation

Install the following dependencies

```bash
pnpm add @lucide/vue
```

Copy the component files below into `src/components/spark-ui/resizable-navbar/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [navbar.vue]
<script setup lang="ts">
import type { Slot } from "vue";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  className?: string;
}>();

const navbarRef = ref(null);
const visible = ref(false);

function handleScroll() {
  if (window.scrollY > 100) {
    visible.value = true;
  } else {
    visible.value = false;
  }
}

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function provide(slot?: Slot) {
  if (!slot) return;
  return {
    visible: visible.value,
  };
}
</script>

<template>
  <div ref="navbarRef" class="sticky inset-x-0 top-10 z-40 w-full" :class="props.className">
    <slot v-bind="provide($slots?.default)" />
  </div>
</template>
```

```vue [navbar-button.vue]
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  href?: string;
  to?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  className?: string;
}>();

const baseStyles =
  "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

const variantStyles: Record<string, string> = {
  primary:
    "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
  secondary: "bg-transparent shadow-none dark:text-white",
  dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
  gradient:
    "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
};

const classes = computed(() => {
  return [baseStyles, props.variant && variantStyles[props.variant], props.className]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <a :href="to ?? (href || '#')" :class="classes">
    <slot />
  </a>
</template>
```

```vue [navbar-logo.vue]
<script setup lang="ts"></script>

<template>
  <a
    href="/"
    class="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white"
  >
    <img src="https://ui.selemon.dev/icon.png" alt="logo" width="30" height="30" />
    <span class="font-medium text-black dark:text-white">Spark UI</span>
  </a>
</template>
```

```vue [nav-body.vue]
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  visible?: boolean;
  className?: string;
}>();

const navBodyStyles = computed(() => {
  return {
    backdropFilter: props.visible ? "blur(10px)" : "none",
    boxShadow: props.visible
      ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
      : "none",
    width: props.visible ? "min(800px, 90%)" : "100%",
    transform: props.visible ? "translateY(20px)" : "translateY(0)",
    transition: "all 0.3s",
  };
});

const navBodyClasses = computed(() => {
  return [
    "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
    props.visible && "bg-white/80 dark:bg-neutral-950/80",
    props.className,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <div :class="navBodyClasses" :style="navBodyStyles">
    <slot />
  </div>
</template>
```

```vue [nav-items.vue]
<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  items: Array<{ name: string; link: string }>;
  className?: string;
}>();

const emits = defineEmits(["itemClick"]);
const hovered = ref<number | null>(null);
function handleItemHover(idx: number) {
  hovered.value = idx;
}

function clearHover() {
  hovered.value = null;
}

function handleClick() {
  emits("itemClick");
}
</script>

<template>
  <div
    class="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2"
    :class="className"
    @mouseleave="clearHover"
  >
    <a
      v-for="(item, idx) in items"
      :key="`link-${idx}`"
      :href="item?.link"
      class="relative px-4 py-2 text-neutral-600"
      @mouseenter="handleItemHover(idx)"
      @click="handleClick"
    >
      <transition name="fade">
        <div
          v-if="hovered === idx"
          class="absolute inset-0 h-full w-full rounded-full bg-gray-100"
        />
      </transition>
      <span class="relative z-20 dark:text-white">{{ item?.name }}</span>
    </a>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

```vue [mobile-nav.vue]
<script setup lang="ts">
import { computed, provide, useId } from "vue";

provide("spark-mobile-nav-id", useId());

const props = defineProps({
  className: String,
  visible: Boolean,
});

const mobileNavStyles = computed(() => {
  return {
    backdropFilter: props.visible ? "blur(10px)" : "none",
    boxShadow: props.visible
      ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
      : "none",
    width: props.visible ? "90%" : "100%",
    paddingRight: props.visible ? "12px" : "0px",
    paddingLeft: props.visible ? "12px" : "0px",
    borderRadius: props.visible ? "4px" : "2rem",
    transform: props.visible ? "translateY(20px)" : "translateY(0)",
    transition: "all 0.3s",
  };
});

const mobileNavClasses = computed(() => {
  return [
    "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
    props.visible && "bg-white/80 dark:bg-neutral-950/80",
    props.className,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>

<template>
  <div :class="mobileNavClasses" :style="mobileNavStyles">
    <slot />
  </div>
</template>
```

```vue [mobile-nav-header.vue]
<script setup lang="ts">
const props = defineProps<{
  className?: string;
}>();
</script>

<template>
  <div class="flex w-full flex-row items-center justify-between" :class="[props.className]">
    <slot />
  </div>
</template>
```

```vue [mobile-nav-menu.vue]
<script setup lang="ts">
import { inject } from "vue";

const menuId = inject<string | undefined>("spark-mobile-nav-id", undefined);
const emit = defineEmits<{ close: [] }>();

function closeMenu() {
  emit("close");
  if (menuId) document.getElementById(`${menuId}-toggle`)?.focus();
}

defineProps({
  className: String,
  isOpen: Boolean,
});
</script>

<template>
  <Transition name="menu">
    <div
      v-if="isOpen"
      :id="menuId"
      @keydown.escape.stop.prevent="closeMenu"
      class="absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950"
      :class="className"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```

```vue [mobile-nav-toggle.vue]
<script setup lang="ts">
import { Menu, X } from "@lucide/vue";
import { inject } from "vue";

const menuId = inject<string | undefined>("spark-mobile-nav-id", undefined);

defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>

<template>
  <button
    type="button"
    class="cursor-pointer"
    :id="menuId ? `${menuId}-toggle` : undefined"
    :aria-controls="isOpen ? menuId : undefined"
    :aria-expanded="isOpen"
    :aria-label="isOpen ? 'Close navigation menu' : 'Open navigation menu'"
    @click="handleClick"
    @keydown.escape.stop.prevent="isOpen && handleClick()"
  >
    <X v-if="isOpen" class="text-black dark:text-white" />
    <Menu v-else class="text-black dark:text-white" />
  </button>
</template>
```

:::

## Behavior

Keep `MobileNavToggle` and `MobileNavMenu` inside the same `MobileNav` so their generated accessible IDs are associated. Bind both `isOpen` props to the same state; handle the toggle’s `click` event and the menu’s `close` event to update it. Escape closes the open menu and returns focus to its toggle. The navbar measures the initial scroll position on mount. `NavbarButton` uses native anchors for both `href` and `to`; `to` takes precedence and does not require Vue Router.

## Props

## Navbar

| Prop        | Type   | Default | Description                                   |
| ----------- | ------ | ------- | --------------------------------------------- |
| `className` | string | -       | Additional CSS classes to apply to the navbar |

## NavBody

| Prop        | Type    | Default | Description                                     |
| ----------- | ------- | ------- | ----------------------------------------------- |
| `className` | string  | -       | Additional CSS classes to apply to the nav body |
| `visible`   | boolean | false   | Controls the visibility state of the nav body   |

## NavItems

| Prop        | Type                                  | Default | Description                                      |
| ----------- | ------------------------------------- | ------- | ------------------------------------------------ |
| `items`     | Array<{ name: string, link: string }> | -       | Array of navigation items with name and link     |
| `className` | string                                | -       | Additional CSS classes to apply to the nav items |

## MobileNav

| Prop        | Type    | Default | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
| `className` | string  | -       | Additional CSS classes to apply to the mobile nav |
| `visible`   | boolean | false   | Controls the visibility state of the mobile nav   |

## MobileNavHeader

| Prop        | Type   | Default | Description                                              |
| ----------- | ------ | ------- | -------------------------------------------------------- |
| `className` | string | -       | Additional CSS classes to apply to the mobile nav header |

## MobileNavMenu

| Prop        | Type    | Default | Description                                            |
| ----------- | ------- | ------- | ------------------------------------------------------ |
| `className` | string  | -       | Additional CSS classes to apply to the mobile nav menu |
| `isOpen`    | boolean | -       | Controls whether the mobile menu is open               |

`MobileNavMenu` emits `close` on Escape. Handle it with `@close="isOpen = false"`.

## MobileNavToggle

| Prop     | Type    | Default | Description                              |
| -------- | ------- | ------- | ---------------------------------------- |
| `isOpen` | boolean | -       | Controls whether the mobile menu is open |
| `click`  | event   | -       | Emitted when the toggle is activated     |

## NavbarButton

| Prop        | Type                                             | Default   | Description                                   |
| ----------- | ------------------------------------------------ | --------- | --------------------------------------------- |
| `href`      | string                                           | -         | URL for the button link                       |
| `className` | string                                           | -         | Additional CSS classes to apply to the button |
| `variant`   | "primary" \| "secondary" \| "dark" \| "gradient" | "primary" | Visual style variant of the button            |
