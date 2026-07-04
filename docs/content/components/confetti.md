# Confetti

Confetti animations are best used to delight your users when something special happens.

<demo src="../../src/example/confetti/demo.vue" srcCode="../../src/spark-ui-demos/confetti/confetti.vue" />

## Installation

Install the following dependency:

```bash
pnpm add canvas-confetti
```

Copy and paste the following code into your project:

::: code-group

```ts [context.ts]
import type { Options as ConfettiOptions } from "canvas-confetti";
import type { InjectionKey } from "vue";

export interface ConfettiApi {
  fire: (options?: ConfettiOptions) => Promise<void>;
}

export const confettiApiKey: InjectionKey<ConfettiApi> = Symbol("confetti-api");
```

```vue [confetti.vue]
<script setup lang="ts">
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";
import { onBeforeUnmount, onMounted, provide, ref } from "vue";
import { cn } from "@/lib/utils";
import { confettiApiKey } from "./context";

interface ConfettiProps {
  class?: string;
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
}

const props = withDefaults(defineProps<ConfettiProps>(), {
  globalOptions: () => ({ resize: true, useWorker: true }),
  manualstart: false,
});

defineOptions({ inheritAttrs: false });

const canvasRef = ref<HTMLCanvasElement | null>(null);
const instance = ref<ConfettiInstance | null>(null);

async function fire(opts: ConfettiOptions = {}) {
  try {
    await instance.value?.({ ...props.options, ...opts });
  } catch (error) {
    console.error("Confetti error:", error);
  }
}

const api = { fire };

provide(confettiApiKey, api);
defineExpose(api);

onMounted(async () => {
  if (!canvasRef.value) return;
  const confetti = (await import("canvas-confetti")).default;
  if (!canvasRef.value) return;
  instance.value = confetti.create(canvasRef.value, {
    ...props.globalOptions,
    resize: true,
  });

  if (!props.manualstart) {
    await fire();
  }
});

onBeforeUnmount(() => {
  if (instance.value) {
    instance.value.reset();
    instance.value = null;
  }
});
</script>

<template>
  <canvas ref="canvasRef" :class="cn(props.class)" v-bind="$attrs" />
  <slot />
</template>
```

```vue [confetti-button.vue]
<script setup lang="ts">
import type {
  GlobalOptions as ConfettiGlobalOptions,
  Options as ConfettiOptions,
} from "canvas-confetti";
import { cn } from "@/lib/utils";

type ConfettiButtonOptions = ConfettiOptions &
  ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };

interface ConfettiButtonProps {
  class?: string;
  options?: ConfettiButtonOptions;
}

const props = defineProps<ConfettiButtonProps>();

async function handleClick(event: MouseEvent) {
  try {
    const target = event.currentTarget as HTMLButtonElement;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const confetti = (await import("canvas-confetti")).default;
    await confetti({
      ...props.options,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  } catch (error) {
    console.error("Confetti button error:", error);
  }
}
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90',
        props.class,
      )
    "
    type="button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import Confetti from "@/components/spark-ui/confetti/confetti.vue";

const confettiRef = ref<InstanceType<typeof Confetti> | null>(null);
</script>

<template>
  <Confetti ref="confettiRef" @mouseenter="confettiRef?.fire({})" />
</template>
```

## Examples

### Basic

<demo src="../../src/example/confetti/basic-cannon-demo.vue" srcCode="../../src/spark-ui-demos/confetti/basic-cannon.vue" />

### Random Direction

<demo src="../../src/example/confetti/random-direction-demo.vue" srcCode="../../src/spark-ui-demos/confetti/random-direction.vue" />

### Fireworks

<demo src="../../src/example/confetti/fireworks-demo.vue" srcCode="../../src/spark-ui-demos/confetti/fireworks.vue" />

### Side Cannons

<demo src="../../src/example/confetti/side-cannons-demo.vue" srcCode="../../src/spark-ui-demos/confetti/side-cannons.vue" />

### Stars

<demo src="../../src/example/confetti/stars-demo.vue" srcCode="../../src/spark-ui-demos/confetti/stars.vue" />

### Custom Shapes

<demo src="../../src/example/confetti/custom-shapes-demo.vue" srcCode="../../src/spark-ui-demos/confetti/custom-shapes.vue" />

### Emoji

<demo src="../../src/example/confetti/emoji-demo.vue" srcCode="../../src/spark-ui-demos/confetti/emoji.vue" />

## Props

### Confetti

| Prop            | Type                    | Default                             | Description                                                 |
| --------------- | ----------------------- | ----------------------------------- | ----------------------------------------------------------- |
| `class`         | `string`                | `undefined`                         | Additional classes applied to the canvas element.           |
| `options`       | `ConfettiOptions`       | `undefined`                         | Default confetti options merged into every `fire` call.     |
| `globalOptions` | `ConfettiGlobalOptions` | `{ resize: true, useWorker: true }` | Global options passed to `confetti.create` for the canvas.  |
| `manualstart`   | `boolean`               | `false`                             | When `true`, confetti does not fire automatically on mount. |

The component also forwards any extra attributes (e.g. `style`, event listeners) to the underlying `<canvas>` element.

### Confetti Options

| Prop                      | Type                        | Default                                                                         | Description                                      |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------ |
| `particleCount`           | `Integer`                   | `50`                                                                            | The number of confetti particles to launch       |
| `angle`                   | `Number`                    | `90`                                                                            | The angle in degrees at which to launch confetti |
| `spread`                  | `Number`                    | `45`                                                                            | The spread in degrees of the confetti            |
| `startVelocity`           | `Number`                    | `45`                                                                            | The initial velocity of the confetti             |
| `decay`                   | `Number`                    | `0.9`                                                                           | The rate at which confetti slows down            |
| `gravity`                 | `Number`                    | `1`                                                                             | The gravity applied to confetti particles        |
| `drift`                   | `Number`                    | `0`                                                                             | The horizontal drift applied to particles        |
| `flat`                    | `Boolean`                   | `false`                                                                         | Whether confetti particles are flat              |
| `ticks`                   | `Number`                    | `200`                                                                           | The number of frames confetti lasts              |
| `origin`                  | `Object`                    | `{ x: 0.5, y: 0.5 }`                                                            | The origin point of the confetti                 |
| `colors`                  | `Array of Strings`          | `['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']` | Array of color strings in HEX format             |
| `shapes`                  | `Array of Strings`          | `['square', 'circle', 'star']`                                                  | Array of shapes for the confetti                 |
| `zIndex`                  | `Integer`                   | `100`                                                                           | The z-index of the confetti                      |
| `disableForReducedMotion` | `Boolean`                   | `false`                                                                         | Disables confetti for users who prefer no motion |
| `useWorker`               | `Boolean`                   | `true`                                                                          | Use Web Worker for better performance            |
| `resize`                  | `Boolean`                   | `true`                                                                          | Whether to resize the canvas                     |
| `canvas`                  | `HTMLCanvasElement or null` | `null`                                                                          | Custom canvas element to draw confetti           |
| `scalar`                  | `Number`                    | `1`                                                                             | Scaling factor for confetti size                 |

### Confetti Exposed Methods

| Method | Signature                                      | Description                                 |
| ------ | ---------------------------------------------- | ------------------------------------------- |
| `fire` | `(options?: ConfettiOptions) => Promise<void>` | Fires the confetti with optional overrides. |

### ConfettiButton

| Prop      | Type                    | Default     | Description                        |
| --------- | ----------------------- | ----------- | ---------------------------------- |
| `class`   | `string`                | `undefined` | Additional classes for the button. |
| `options` | `ConfettiButtonOptions` | `undefined` | Options for the confetti burst.    |

### ConfettiButton Slots

| Slot      | Description                          |
| --------- | ------------------------------------ |
| `default` | Content to render inside the button. |

## Credits

- Credit to [Bankk](https://www.x.com/bankkroll_eth)
- Inspired by [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
