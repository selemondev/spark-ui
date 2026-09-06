# Confetti

Confetti animations are best used to delight your users when something special happens.

<demo src="../../src/example/confetti/demo.vue" srcCode="../../src/spark-ui-demos/confetti/confetti.vue" />

## Installation

Install the following dependency:

```bash
pnpm add canvas-confetti
pnpm add -D @types/canvas-confetti
```

Copy the following files into `src/components/spark-ui/confetti/`:

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
import { nextTick, onBeforeUnmount, onMounted, provide, ref } from "vue";
import { cn } from "@/lib/utils";
import { confettiApiKey } from "./context";

interface ConfettiProps {
  class?: string;
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  manualstart?: boolean;
}

const props = withDefaults(defineProps<ConfettiProps>(), {
  globalOptions: () => ({ resize: true, useWorker: false }),
  manualstart: false,
});

defineOptions({ inheritAttrs: false });

const canvasRef = ref<HTMLCanvasElement | null>(null);
let instance: ConfettiInstance | null = null;
let initialization: Promise<ConfettiInstance | null> | null = null;
let disposed = false;

function initialize() {
  initialization ??= (async () => {
    await nextTick();
    if (disposed || !canvasRef.value) return null;
    const confetti = (await import("canvas-confetti")).default;
    if (disposed || !canvasRef.value) return null;
    instance = confetti.create(canvasRef.value, {
      resize: true,
      useWorker: false,
      ...props.globalOptions,
    });
    return instance;
  })();
  return initialization;
}

async function fire(opts: ConfettiOptions = {}) {
  try {
    const options = { ...props.options, ...opts };
    const confetti = await initialize();
    if (!disposed) await confetti?.(options);
  } catch (error) {
    console.error("Confetti error:", error);
  }
}

const api = { fire };

provide(confettiApiKey, api);
defineExpose(api);

onMounted(() => {
  if (!props.manualstart) {
    void fire();
  } else {
    void initialize().catch((error) => console.error("Confetti error:", error));
  }
});

onBeforeUnmount(() => {
  disposed = true;
  instance?.reset();
  instance = null;
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
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";
import { onBeforeUnmount, watch } from "vue";
import { cn } from "@/lib/utils";

type ConfettiButtonOptions = ConfettiOptions &
  ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };

interface ConfettiButtonProps {
  class?: string;
  options?: ConfettiButtonOptions;
}

const props = defineProps<ConfettiButtonProps>();
let instance: ConfettiInstance | null = null;
let disposed = false;

function reset() {
  instance?.reset();
  instance = null;
}

watch(
  [
    () => props.options?.canvas,
    () => props.options?.resize,
    () => props.options?.useWorker,
    () => props.options?.disableForReducedMotion,
  ],
  reset,
  { flush: "sync" },
);

onBeforeUnmount(() => {
  disposed = true;
  reset();
});

async function handleClick(event: MouseEvent) {
  try {
    const target = event.currentTarget as HTMLButtonElement;
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const confetti = (await import("canvas-confetti")).default;
    if (disposed) return;
    const {
      canvas,
      resize = true,
      useWorker = false,
      disableForReducedMotion = false,
      ...options
    } = props.options ?? {};
    instance ??= confetti.create(canvas, { resize, useWorker, disableForReducedMotion });
    const canvasRect = canvas?.getBoundingClientRect();
    await instance({
      ...options,
      origin: {
        x: canvasRect ? (x - canvasRect.left) / canvasRect.width : x / window.innerWidth,
        y: canvasRect ? (y - canvasRect.top) / canvasRect.height : y / window.innerHeight,
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

| Prop            | Type                    | Default                              | Description                                                 |
| --------------- | ----------------------- | ------------------------------------ | ----------------------------------------------------------- |
| `class`         | `string`                | `undefined`                          | Additional classes applied to the canvas element.           |
| `options`       | `ConfettiOptions`       | `undefined`                          | Default confetti options merged into every `fire` call.     |
| `globalOptions` | `ConfettiGlobalOptions` | `{ resize: true, useWorker: false }` | Global options passed to `confetti.create` for the canvas.  |
| `manualstart`   | `boolean`               | `false`                              | When `true`, confetti does not fire automatically on mount. |

The component also forwards any extra attributes (e.g. `style`, event listeners) to the underlying `<canvas>` element.

Creation options are read when the canvas initializes; remount `Confetti` to change them. Explicit `resize: false` is preserved. Calls to `fire()` made while the lazy dependency is loading wait for the same initialization and each requested burst is fired; unmounting cancels pending work and resets the instance.

### Confetti Options

| Prop                      | Type                        | Default                                                                         | Description                                                                   |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `particleCount`           | `Integer`                   | `50`                                                                            | The number of confetti particles to launch                                    |
| `angle`                   | `Number`                    | `90`                                                                            | The angle in degrees at which to launch confetti                              |
| `spread`                  | `Number`                    | `45`                                                                            | The spread in degrees of the confetti                                         |
| `startVelocity`           | `Number`                    | `45`                                                                            | The initial velocity of the confetti                                          |
| `decay`                   | `Number`                    | `0.9`                                                                           | The rate at which confetti slows down                                         |
| `gravity`                 | `Number`                    | `1`                                                                             | The gravity applied to confetti particles                                     |
| `drift`                   | `Number`                    | `0`                                                                             | The horizontal drift applied to particles                                     |
| `flat`                    | `Boolean`                   | `false`                                                                         | Whether confetti particles are flat                                           |
| `ticks`                   | `Number`                    | `200`                                                                           | The number of frames confetti lasts                                           |
| `origin`                  | `Object`                    | `{ x: 0.5, y: 0.5 }`                                                            | The origin point of the confetti                                              |
| `colors`                  | `Array of Strings`          | `['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']` | Array of color strings in HEX format                                          |
| `shapes`                  | `Array of Strings`          | `['square', 'circle', 'star']`                                                  | Array of shapes for the confetti                                              |
| `zIndex`                  | `Integer`                   | `100`                                                                           | The z-index of the confetti                                                   |
| `disableForReducedMotion` | `Boolean`                   | `false`                                                                         | Disables confetti for users who prefer no motion                              |
| `useWorker`               | `Boolean`                   | `false`                                                                         | Use the library's shared Web Worker; see the multi-instance limitation below. |
| `resize`                  | `Boolean`                   | `true`                                                                          | Whether to resize the canvas                                                  |
| `canvas`                  | `HTMLCanvasElement or null` | `null`                                                                          | Custom canvas element to draw confetti                                        |
| `scalar`                  | `Number`                    | `1`                                                                             | Scaling factor for confetti size                                              |

### Confetti Exposed Methods

| Method | Signature                                      | Description                                                 |
| ------ | ---------------------------------------------- | ----------------------------------------------------------- |
| `fire` | `(options?: ConfettiOptions) => Promise<void>` | Waits for initialization and fires with optional overrides. |

### ConfettiButton

| Prop      | Type                    | Default     | Description                                                                                         |
| --------- | ----------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `class`   | `string`                | `undefined` | Additional classes for the button.                                                                  |
| `options` | `ConfettiButtonOptions` | `undefined` | Burst options plus `canvas`, `resize`, `useWorker`, and `disableForReducedMotion` creation options. |

Each button owns its confetti instance and resets it on unmount. Creation options default to `resize: true`, `useWorker: false`, and `disableForReducedMotion: false`; explicit values are respected. Changing a creation option resets the instance and the next click initializes it with the new options. A canvas transferred to a worker cannot later be used on the main thread; supply a fresh canvas when changing `useWorker` for a custom canvas.

The burst origin is always the clicked button's center (overriding `options.origin`), normalized to the viewport for an automatic canvas or to the supplied canvas's rectangle. Keep a custom canvas visible with nonzero dimensions and do not share it between owners.

`canvas-confetti` shares one worker between worker-backed instances. Multiple canvases using `useWorker: true` can redirect one another's rendering, and resetting one can stop the others. Both components therefore default to `useWorker: false` for independent ownership. This intentionally changes the previous `Confetti` default; explicit `useWorker: true` remains supported but has this upstream multi-instance limitation.

### ConfettiButton Slots

| Slot      | Description                          |
| --------- | ------------------------------------ |
| `default` | Content to render inside the button. |

## Credits

- Credit to [Bankk](https://www.x.com/bankkroll_eth)
- Inspired by [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
