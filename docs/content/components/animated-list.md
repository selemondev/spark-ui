# Animated List

A list that animates each item in sequence with a delay. Used to showcase notifications or events on your landing page.

<demo src="../../src/example/animated-list/demo.vue" srcCode="../../src/spark-ui-demos/animated-list/animated-list.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [animated-list.vue]
<script lang="ts" setup>
import { Comment, Fragment, Text, nextTick, onBeforeUnmount, ref, useSlots, type VNode } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: string;
    delay?: number;
  }>(),
  {
    delay: 1000,
  },
);

const slots = useSlots();
const index = ref(1);
let itemCount = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
let disposed = false;

function flattenItems(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Fragment) return flattenItems((node.children ?? []) as VNode[]);
    if (node.type === Comment || (node.type === Text && !String(node.children ?? "").trim()))
      return [];
    return [node];
  });
}

// Invoke the slot during render so parent slot changes remain reactive.
function itemsToShow() {
  const items = flattenItems(slots.default?.() ?? []);
  itemCount = items.length;
  void nextTick(scheduleReveal);
  return items.slice(0, index.value);
}

function scheduleReveal() {
  if (disposed) return;
  if (index.value > itemCount) index.value = itemCount;
  if (index.value >= itemCount) {
    clearTimeout(timer);
    timer = undefined;
  } else if (timer === undefined) {
    timer = setTimeout(() => {
      timer = undefined;
      if (index.value < itemCount) index.value++;
    }, props.delay);
  }
}

function getInitial(idx: number) {
  return idx === index.value - 1
    ? {
        scale: 0,
        opacity: 0,
      }
    : undefined;
}
function getEnter(idx: number) {
  return idx === index.value - 1
    ? {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 250,
          damping: 40,
        },
      }
    : undefined;
}

function getLeave() {
  return {
    scale: 0,
    opacity: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 40,
    },
  };
}

onBeforeUnmount(() => {
  disposed = true;
  clearTimeout(timer);
});
</script>

<template>
  <div :class="cn('border w-[600px] h-[370px] shadow-lg overflow-auto rounded-lg', $props.class)">
    <transition-group
      name="list"
      tag="div"
      class="flex flex-col-reverse items-center p-2"
      move-class="move"
    >
      <div
        v-for="(item, idx) in itemsToShow()"
        :key="item.key ?? idx"
        v-motion
        :initial="getInitial(idx)"
        :enter="getEnter(idx)"
        :leave="getLeave()"
        :class="cn('mx-auto w-full')"
      >
        <component :is="item" />
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.move {
  transition: transform 0.4s ease-out;
}
</style>
```

```vue [notification.vue]
<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  name: string;
  class?: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}>();

const className = computed(() =>
  cn(
    "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-3",
    // animation styles
    "transition-all duration-200 ease-in-out hover:scale-[103%]",
    // light styles
    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
    // dark styles
    "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    props.class,
  ),
);
</script>

<template>
  <figure :class="className">
    <div class="flex flex-row bg-white border rounded-xl shadow-md py-2 items-center px-2 gap-4">
      <div
        class="flex size-10 items-center justify-center rounded-2xl"
        :style="{ backgroundColor: props.color }"
      >
        <span class="text-lg">{{ props.icon }}</span>
      </div>
      <div class="flex flex-col overflow-hidden">
        <figcaption class="flex flex-row items-center whitespace-pre text-lg font-medium">
          <span class="text-sm text-black dark:text-white sm:text-lg">{{ props.name }}</span>
          <span class="mx-1">·</span>
          <span class="text-xs text-gray-500">{{ props.time }}</span>
        </figcaption>
        <p class="text-sm font-normal">
          {{ props.description }}
        </p>
      </div>
    </div>
  </figure>
</template>
```

:::

The default slot accepts direct siblings, a `v-for`, nested fragments, or no items. Slot additions and removals stay reactive; new items reveal at the configured interval. Give repeated items stable keys to preserve their identity when reordering. Pending reveals stop on unmount.

## Props

| Prop  | Type   | Description                        | Default |
| ----- | ------ | ---------------------------------- | ------- |
| class | string | The class to be applied.           | ""      |
| delay | number | The delay between each item in ms. | 1000    |
