# Rainbow Button

A button with an animated rainbow border and a glow below it.

<demo src="../../src/example/rainbow-button/demo.vue" srcCode="../../src/spark-ui-demos/rainbow-button/demo.vue" />

## Installation

Copy the component below into `src/components/spark-ui/rainbow-button/rainbow-button.vue`.
The component includes the animation and color defaults. No global CSS is needed.

::: code-group

```vue [rainbow-button.vue]
<script setup lang="ts">
import { cn } from "@/lib/utils";

interface RainbowButtonProps {
  class?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  variant: "default",
  size: "default",
});

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-xl px-3 text-xs",
  lg: "h-11 rounded-xl px-8",
  icon: "h-9 w-9",
};
</script>

<template>
  <button
    type="button"
    data-slot="button"
    :data-variant="props.variant"
    :class="
      cn(
        'rainbow-button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring aria-invalid:border-destructive disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:h-4 [&_svg:not([class*=size-])]:w-4',
        sizes[props.size],
        props.variant === 'default' ? 'text-white dark:text-black' : 'text-accent-foreground',
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>

<style scoped>
.rainbow-button {
  --rainbow-surface: #121213;
  --rainbow-fade: rgba(18, 18, 19, 0.6);
  --rainbow-clear: rgba(18, 18, 19, 0);
  --rainbow-gradient: linear-gradient(
    90deg,
    var(--color-1, oklch(66.2% 0.225 25.9)),
    var(--color-5, oklch(90.7% 0.231 133)),
    var(--color-3, oklch(69.6% 0.165 251)),
    var(--color-4, oklch(80.2% 0.134 225)),
    var(--color-2, oklch(60.4% 0.26 302))
  );
  border: 0.125rem solid transparent;
  background-image:
    linear-gradient(var(--rainbow-surface), var(--rainbow-surface)),
    linear-gradient(var(--rainbow-surface) 50%, var(--rainbow-fade) 80%, var(--rainbow-clear)),
    var(--rainbow-gradient);
  background-size: 200%;
  background-clip: padding-box, border-box, border-box;
  background-origin: border-box;
  animation: rainbow var(--speed, 2s) infinite linear;
}
.rainbow-button[data-variant="outline"] {
  --rainbow-surface: #fff;
  border: 1px solid hsl(var(--input));
  border-bottom-color: transparent;
}
.dark .rainbow-button {
  --rainbow-surface: #fff;
  --rainbow-fade: rgba(255, 255, 255, 0.6);
  --rainbow-clear: rgba(0, 0, 0, 0);
}
.dark .rainbow-button[data-variant="outline"] {
  --rainbow-surface: #0a0a0a;
}
.rainbow-button::before {
  content: "";
  pointer-events: none;
  position: absolute;
  bottom: -20%;
  left: 50%;
  z-index: 0;
  width: 60%;
  height: 20%;
  transform: translateX(-50%);
  background-image: var(--rainbow-gradient);
  background-size: 200%;
  filter: blur(0.75rem);
  animation: rainbow var(--speed, 2s) infinite linear;
}
@keyframes rainbow {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .rainbow-button,
  .rainbow-button::before {
    animation: none;
  }
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import RainbowButton from "@/components/spark-ui/rainbow-button/rainbow-button.vue";
</script>

<template>
  <RainbowButton>Get Unlimited Access</RainbowButton>
  <RainbowButton variant="outline" size="lg" style="--speed: 4s"> Learn more </RainbowButton>
</template>
```

## Behavior

The default slot holds the button content. The default variant uses a dark surface in light mode and a light surface in dark mode.
The outline variant reverses these surfaces. Both variants animate their border and glow.

Native attributes and listeners reach the button, including `disabled`, `type`, `name`, `aria-label`, and `@click`.
The default type is `button`. Set `type="submit"` to submit a form.
Enter and Space activate the focused button. A disabled button does not activate.
This Vue component always renders a native button. It does not use the upstream React `asChild` option.

Set the CSS property `--speed` to change the cycle duration. Set `--color-1` through `--color-5` to complete CSS colors to change the rainbow.
The animation stops when the user requests reduced motion.

## Props

| Prop      | Type                                  | Default     | Description           |
| --------- | ------------------------------------- | ----------- | --------------------- |
| `class`   | `string`                              | None        | Extra button classes. |
| `variant` | `"default" \| "outline"`              | `"default"` | Button appearance.    |
| `size`    | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size.          |

For `size="icon"`, provide an accessible name with `aria-label` or text for screen readers.

## Source

Ported from [Magic UI Rainbow Button](https://magicui.design/docs/components/rainbow-button).
The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/rainbow-button.tsx) defines the variants and sizes.
