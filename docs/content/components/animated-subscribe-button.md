# Animated Subscribe Button

A button that animates between subscribed and unsubscribed content.

<demo src="../../src/example/animated-subscribe-button/demo.vue" srcCode="../../src/spark-ui-demos/animated-subscribe-button/demo.vue" />

## Installation

Install the animation dependency:

```sh
pnpm add motion-v
```

Copy the component below into `src/components/spark-ui/animated-subscribe-button/animated-subscribe-button.vue`.
No global CSS is needed.

::: code-group

```vue [animated-subscribe-button.vue]
<script setup lang="ts">
import { AnimatePresence, motion, useReducedMotion } from "motion-v";
import { computed, ref, watch } from "vue";
import { cn } from "@/lib/utils";

interface AnimatedSubscribeButtonProps {
  class?: string;
  subscribeStatus?: boolean;
}

const props = withDefaults(defineProps<AnimatedSubscribeButtonProps>(), {
  subscribeStatus: undefined,
});
const emit = defineEmits<{
  "update:subscribeStatus": [value: boolean];
  click: [event: MouseEvent];
}>();
const localStatus = ref(false);
const isSubscribed = computed(() => props.subscribeStatus ?? localStatus.value);
const reducedMotion = useReducedMotion();

watch(
  () => props.subscribeStatus,
  (value) => {
    if (value !== undefined) localStatus.value = value;
  },
  { immediate: true },
);

function handleClick(event: MouseEvent) {
  if ((event.currentTarget as HTMLButtonElement).disabled) return;
  const nextStatus = !isSubscribed.value;
  if (props.subscribeStatus === undefined) localStatus.value = nextStatus;
  emit("update:subscribeStatus", nextStatus);
  emit("click", event);
}
</script>

<template>
  <button
    type="button"
    :aria-pressed="isSubscribed"
    :class="
      cn(
        'relative flex h-10 w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg border-none bg-primary px-6 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )
    "
    @click="handleClick"
  >
    <AnimatePresence mode="wait" :initial="false">
      <motion.span
        :key="isSubscribed ? 'subscribed' : 'unsubscribed'"
        class="relative flex items-center justify-center font-semibold"
        :initial="{
          opacity: reducedMotion ? 1 : 0,
          x: 0,
          y: isSubscribed && !reducedMotion ? -50 : 0,
        }"
        :animate="{ opacity: 1, x: 0, y: 0 }"
        :exit="{ opacity: 0, x: !isSubscribed && !reducedMotion ? 50 : 0 }"
        :transition="{ duration: reducedMotion ? 0 : 0.15 }"
      >
        <slot v-if="isSubscribed" name="subscribed">Subscribed</slot>
        <slot v-else name="unsubscribed">Subscribe</slot>
      </motion.span>
    </AnimatePresence>
  </button>
</template>
```

:::

## Usage

Use named slots for the two states:

```vue
<script setup lang="ts">
import AnimatedSubscribeButton from "@/components/spark-ui/animated-subscribe-button/animated-subscribe-button.vue";
</script>

<template>
  <AnimatedSubscribeButton>
    <template #unsubscribed>Subscribe</template>
    <template #subscribed>Subscribed</template>
  </AnimatedSubscribeButton>
</template>
```

To control the state from the parent, use `v-model:subscribe-status`:

```vue
<script setup lang="ts">
import { ref } from "vue";
import AnimatedSubscribeButton from "@/components/spark-ui/animated-subscribe-button/animated-subscribe-button.vue";

const subscribed = ref(false);
</script>

<template>
  <AnimatedSubscribeButton v-model:subscribe-status="subscribed" />
  <button type="button" @click="subscribed = false">Reset</button>
</template>
```

## Behavior

Without `subscribeStatus`, the button owns its state and starts unsubscribed. Each activation toggles that state.
With `subscribeStatus`, the parent owns the state. Each activation emits the requested next value through `update:subscribeStatus`.
The button waits for the parent to update the prop. This also works when the prop is `false`.
If the parent removes the prop, the button keeps the last controlled value and resumes local changes.

The same native button remains mounted during the transition, so keyboard focus stays on it.
The unsubscribed content moves right when it leaves. The subscribed content enters from above.
When the user requests reduced motion, the content changes without animation.

Native attributes reach the button, including `disabled`, `type`, `name`, and `aria-label`.
Enter and Space activate the focused button. A disabled button does not change state or emit events.
The default type is `button`. Set `type="submit"` to submit a form.
The button sets `aria-pressed` to the current state.

## Props

| Prop              | Type      | Default     | Description                                       |
| ----------------- | --------- | ----------- | ------------------------------------------------- |
| `class`           | `string`  | None        | Extra button classes.                             |
| `subscribeStatus` | `boolean` | `undefined` | Parent-controlled state. Omit it for local state. |

## Slots

| Slot           | Default      | Description                         |
| -------------- | ------------ | ----------------------------------- |
| `unsubscribed` | `Subscribe`  | Content for the unsubscribed state. |
| `subscribed`   | `Subscribed` | Content for the subscribed state.   |

The named slots replace the two React children. Each slot accepts text, icons, or other non-interactive content.

## Events

| Event                    | Payload      | Description                                                     |
| ------------------------ | ------------ | --------------------------------------------------------------- |
| `update:subscribeStatus` | `boolean`    | Requested next state after activation.                          |
| `click`                  | `MouseEvent` | The original click event, emitted once after the state request. |

## Source

Ported from the [Magic UI Animated Subscribe Button source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-subscribe-button.tsx).
This Vue port uses `motion-v` and named slots instead of React children.
