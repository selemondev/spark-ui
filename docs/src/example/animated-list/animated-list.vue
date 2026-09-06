<script lang="ts" setup>
import { Comment, Fragment, Text, nextTick, onBeforeUnmount, ref, useSlots, type VNode } from "vue";
import { cn } from "../../lib/utils";

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
  <div :class="cn('w-[250px] h-[370px] md:w-[600px] overflow-auto rounded-lg', $props.class)">
    <transition-group
      name="animated-beam"
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
        :class="cn('mx-auto w-full mb-4')"
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
