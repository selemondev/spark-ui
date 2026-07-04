<script setup lang="ts">
import { computed, onMounted, provide, ref, toRef, useSlots } from "vue";
import { cn } from "../../../lib/utils";
import {
  isFolderElement,
  mergeExpandedItems,
  sortTreeElements,
  TreeContextKey,
  type TreeSortMode,
  type TreeViewElement,
} from "./context";
import RenderNode from "./render-node.vue";

interface TreeProps {
  class?: string;
  initialSelectedId?: string;
  indicator?: boolean;
  elements?: TreeViewElement[];
  initialExpandedItems?: string[];
  sort?: TreeSortMode;
  dir?: "rtl" | "ltr";
}

const props = withDefaults(defineProps<TreeProps>(), {
  indicator: true,
  sort: "default",
});

const slots = useSlots();

const selectedId = ref<string | undefined>(props.initialSelectedId);
const expandedItems = ref<string[] | undefined>(props.initialExpandedItems);

const direction = computed<"rtl" | "ltr">(() =>
  props.dir === "rtl" ? "rtl" : "ltr",
);

const selectItem = (id: string) => {
  selectedId.value = id;
};

const handleExpand = (id: string) => {
  const prev = expandedItems.value;
  if (prev?.includes(id)) {
    expandedItems.value = prev.filter((item) => item !== id);
  } else {
    expandedItems.value = [...(prev ?? []), id];
  }
};

const setExpandedItems = (items: string[] | undefined) => {
  expandedItems.value = items;
};

const expandSpecificTargetedElements = (
  elements?: TreeViewElement[],
  selectId?: string,
) => {
  if (!elements || !selectId) return;

  const findParent = (
    currentElement: TreeViewElement,
    currentPath: string[] = [],
  ) => {
    const isSelectable = currentElement.isSelectable ?? true;
    const newPath = [...currentPath, currentElement.id];
    if (currentElement.id === selectId) {
      if (isSelectable) {
        expandedItems.value = mergeExpandedItems(expandedItems.value, newPath);
      } else {
        if (newPath.includes(currentElement.id)) {
          newPath.pop();
          expandedItems.value = mergeExpandedItems(
            expandedItems.value,
            newPath,
          );
        }
      }
      return;
    }
    if (
      Array.isArray(currentElement.children) &&
      currentElement.children.length > 0
    ) {
      currentElement.children.forEach((child) => {
        findParent(child, newPath);
      });
    }
  };

  elements.forEach((element) => {
    findParent(element);
  });
};

onMounted(() => {
  if (props.initialSelectedId) {
    expandSpecificTargetedElements(props.elements, props.initialSelectedId);
  }
});

provide(TreeContextKey, {
  selectedId,
  expandedItems,
  indicator: toRef(props, "indicator"),
  direction,
  handleExpand,
  selectItem,
  setExpandedItems,
  openIcon: slots.openIcon,
  closeIcon: slots.closeIcon,
});

const sortedElements = computed<TreeViewElement[]>(() =>
  props.elements ? sortTreeElements(props.elements, props.sort) : [],
);

const useElements = computed(() => !slots.default && props.elements != null);
</script>

<template>
  <div :class="cn('size-full', props.class)">
    <div
      role="tree"
      :dir="props.dir"
      class="relative h-full overflow-auto px-2"
    >
      <div class="flex flex-col gap-1" :dir="props.dir">
        <template v-if="useElements">
          <RenderNode
            v-for="element in sortedElements"
            :key="element.id"
            :element="element"
            :sort="props.sort"
            :is-folder="isFolderElement(element)"
          />
        </template>
        <slot v-else />
      </div>
    </div>
  </div>
</template>
