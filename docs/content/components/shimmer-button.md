# Shimmer Button

A button with a light that travels around its border.

<demo src="../../src/example/shimmer-button/demo.vue" srcCode="../../src/spark-ui-demos/shimmer-button/demo.vue" />

## Installation

Copy the component files below into `src/components/spark-ui/shimmer-button/`. Utility imports use `@/lib/utils`.

::: code-group

```vue [shimmer-button.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
}

const props = withDefaults(defineProps<ShimmerButtonProps>(), {
  shimmerColor: "#ffffff",
  shimmerSize: "0.05em",
  borderRadius: "100px",
  shimmerDuration: "3s",
  background: "rgba(0, 0, 0, 1)",
});

const shimmerStyle = computed(() => ({
  "--spread": "90deg",
  "--shimmer-color": props.shimmerColor,
  "--radius": props.borderRadius,
  "--speed": props.shimmerDuration,
  "--cut": props.shimmerSize,
  "--bg": props.background,
}));
</script>

<template>
  <button
    :class="
      cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden rounded-[var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]',
        'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px',
        props.className,
      )
    "
    :style="shimmerStyle"
  >
    <span
      aria-hidden="true"
      class="shimmer-container pointer-events-none absolute inset-0 -z-30 overflow-visible blur-[2px]"
    >
      <span
        class="shimmer-slide absolute inset-0 aspect-square h-[100cqh] rounded-none [mask:none]"
      >
        <span class="shimmer-spin absolute -inset-full w-auto" />
      </span>
    </span>
    <slot />
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transform-gpu transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]"
    />
    <span
      aria-hidden="true"
      class="pointer-events-none absolute inset-[var(--cut)] -z-20 rounded-[var(--radius)] [background:var(--bg)]"
    />
  </button>
</template>

<style scoped>
.shimmer-container {
  container-type: size;
}

.shimmer-slide {
  animation: shimmer-slide var(--speed) ease-in-out infinite alternate;
}

.shimmer-spin {
  background: conic-gradient(
    from calc(270deg - (var(--spread) * 0.5)),
    transparent 0,
    var(--shimmer-color) var(--spread),
    transparent var(--spread)
  );
  animation: spin-around calc(var(--speed) * 2) infinite linear;
}

@keyframes shimmer-slide {
  to {
    transform: translate(calc(100cqw - 100%), 0);
  }
}

@keyframes spin-around {
  0% {
    transform: translateZ(0) rotate(0);
  }
  15%,
  35% {
    transform: translateZ(0) rotate(90deg);
  }
  65%,
  85% {
    transform: translateZ(0) rotate(270deg);
  }
  100% {
    transform: translateZ(0) rotate(360deg);
  }
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import ShimmerButton from "@/components/spark-ui/shimmer-button/shimmer-button.vue";
</script>

<template>
  <ShimmerButton type="button" shimmer-color="#a5b4fc" shimmer-duration="2s">
    Get started
  </ShimmerButton>
</template>
```

## Props

| Prop              | Type     | Default              | Description                         |
| ----------------- | -------- | -------------------- | ----------------------------------- |
| `shimmerColor`    | `string` | `"#ffffff"`          | The color of the moving light.      |
| `shimmerSize`     | `string` | `"0.05em"`           | The width of the visible border.    |
| `borderRadius`    | `string` | `"100px"`            | The corner radius of the button.    |
| `shimmerDuration` | `string` | `"3s"`               | The travel duration, as a CSS time. |
| `background`      | `string` | `"rgba(0, 0, 0, 1)"` | The background of the button.       |
| `className`       | `string` | None                 | Extra classes for the button.       |
| Default slot      | Content  | None                 | The button label and icons.         |

## Behavior

All visual props update while the component is mounted.
The light travels along the border while the inner highlight responds to hover and press.
The decorative layers do not receive pointer events.

Native button attributes and listeners pass to the button, including `disabled`, `type`, `name`, and `@click`.
Set `type="button"` when the button must not submit a form.
Use `type="submit"` to submit its form. You can also pass the standard Vue `class` and `style` attributes.

## Source

This component is a Vue port of [Magic UI Shimmer Button](https://magicui.design/docs/components/shimmer-button).
The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/shimmer-button.tsx) defines the original behavior.
