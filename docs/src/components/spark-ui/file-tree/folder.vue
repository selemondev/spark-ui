<script setup lang="ts">
import { computed, inject } from "vue";
import { cn } from "../../../lib/utils";
import { RenderSlot, TreeContextKey } from "./context";

interface FolderProps {
  class?: string;
  element: string;
  value: string;
  isSelectable?: boolean;
  isSelect?: boolean;
}

const props = withDefaults(defineProps<FolderProps>(), {
  isSelectable: true,
  isSelect: undefined,
});

const tree = inject(TreeContextKey);
if (!tree) {
  throw new Error("Folder must be used within a Tree");
}

const isExpanded = computed(
  () => tree.expandedItems.value?.includes(props.value) ?? false,
);
const isSelected = computed(() =>
  props.isSelect !== undefined
    ? props.isSelect
    : tree.selectedId.value === props.value,
);

const onTrigger = () => {
  if (!props.isSelectable) return;
  tree.selectItem(props.value);
  tree.handleExpand(props.value);
};

const onEnter = (el: Element) => {
  const node = el as HTMLElement;
  node.style.height = "0px";
  node.style.overflow = "hidden";
  requestAnimationFrame(() => {
    node.style.height = `${node.scrollHeight}px`;
  });
};

const onAfterEnter = (el: Element) => {
  const node = el as HTMLElement;
  node.style.height = "";
  node.style.overflow = "";
};

const onLeave = (el: Element) => {
  const node = el as HTMLElement;
  node.style.height = `${node.scrollHeight}px`;
  node.style.overflow = "hidden";
  requestAnimationFrame(() => {
    node.style.height = "0px";
  });
};
</script>

<template>
  <div
    role="treeitem"
    :aria-expanded="isExpanded"
    :aria-selected="isSelected"
    class="relative h-full overflow-hidden"
  >
    <button
      type="button"
      :disabled="!props.isSelectable"
      :aria-expanded="isExpanded"
      :class="
        cn(
          'flex items-center gap-1 rounded-md text-sm',
          props.class,
          {
            'bg-muted rounded-md': isSelected && props.isSelectable,
            'cursor-pointer': props.isSelectable,
            'cursor-not-allowed opacity-50': !props.isSelectable,
          },
        )
      "
      @click="onTrigger"
    >
      <template v-if="isExpanded">
        <RenderSlot v-if="tree.openIcon" :render="tree.openIcon" />
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
          class="size-4"
        >
          <path
            d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
          />
        </svg>
      </template>
      <template v-else>
        <RenderSlot v-if="tree.closeIcon" :render="tree.closeIcon" />
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
          class="size-4"
        >
          <path
            d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
          />
        </svg>
      </template>
      <span>{{ props.element }}</span>
    </button>
    <Transition
      name="spark-tree-collapse"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
    >
      <div
        v-show="isExpanded"
        class="relative h-full overflow-hidden text-sm"
      >
        <div
          v-if="props.element && tree.indicator.value"
          aria-hidden="true"
          :dir="tree.direction.value"
          class="bg-muted absolute left-1.5 h-full w-px rounded-md py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5"
        />
        <div
          role="group"
          :dir="tree.direction.value"
          class="ml-5 flex flex-col gap-1 py-1 rtl:mr-5"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.spark-tree-collapse-enter-active,
.spark-tree-collapse-leave-active {
  transition: height 0.2s ease-out;
}
</style>
