<script setup lang="ts">
import { computed, onMounted, onUpdated, provide, ref, toRef, useSlots, watch } from "vue";
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

const direction = computed<"rtl" | "ltr">(() => (props.dir === "rtl" ? "rtl" : "ltr"));

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

const expandSpecificTargetedElements = (elements?: TreeViewElement[], selectId?: string) => {
  if (!elements || !selectId) return;

  const findParent = (currentElement: TreeViewElement, currentPath: string[] = []) => {
    const isSelectable = currentElement.isSelectable ?? true;
    const newPath = [...currentPath, currentElement.id];
    if (currentElement.id === selectId) {
      if (isSelectable) {
        expandedItems.value = mergeExpandedItems(expandedItems.value, newPath);
      } else {
        if (newPath.includes(currentElement.id)) {
          newPath.pop();
          expandedItems.value = mergeExpandedItems(expandedItems.value, newPath);
        }
      }
      return;
    }
    if (Array.isArray(currentElement.children) && currentElement.children.length > 0) {
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

const treeRoot = ref<HTMLElement | null>(null);
let focusedId: string | undefined = props.initialSelectedId;

function treeItems() {
  return Array.from(treeRoot.value?.querySelectorAll<HTMLElement>("[data-tree-node]") ?? []).filter(
    (node) => node.closest('[role="tree"]') === treeRoot.value,
  );
}

function visibleItems() {
  return treeItems().filter(
    (node) =>
      node.getAttribute("aria-disabled") !== "true" &&
      !node.parentElement?.closest('[role="treeitem"][aria-expanded="false"]'),
  );
}

function syncTabStops() {
  const nodes = treeItems();
  const visible = visibleItems();
  const previous = nodes.find((node) => node.dataset.treeNode === focusedId);
  let target = visible.find((node) => node.dataset.treeNode === focusedId);
  let parent = previous?.parentElement?.closest<HTMLElement>("[data-tree-node]");
  while (!target && parent) {
    if (visible.includes(parent)) target = parent;
    parent = parent.parentElement?.closest<HTMLElement>("[data-tree-node]");
  }
  target ??= visible.find((node) => node.dataset.treeNode === selectedId.value) ?? visible[0];
  focusedId = target?.dataset.treeNode;
  for (const node of nodes) node.tabIndex = node === target ? 0 : -1;
  if (previous && !visible.includes(previous) && previous.contains(document.activeElement)) {
    target?.focus();
  }
}

function onTreeFocus(event: FocusEvent) {
  const node = (event.target as HTMLElement).closest<HTMLElement>("[data-tree-node]");
  if (!node || !visibleItems().includes(node)) return;
  focusedId = node.dataset.treeNode;
  syncTabStops();
  if (event.target !== node) node.focus();
}

function onTreeKeydown(event: KeyboardEvent) {
  const nodes = visibleItems();
  const current = (event.target as HTMLElement).closest<HTMLElement>("[data-tree-node]");
  const index = current ? nodes.indexOf(current) : -1;
  if (!current || index < 0) return;
  const expandKey = direction.value === "rtl" ? "ArrowLeft" : "ArrowRight";
  const collapseKey = direction.value === "rtl" ? "ArrowRight" : "ArrowLeft";
  let target: HTMLElement | undefined;
  if (event.key === "ArrowDown") target = nodes[Math.min(index + 1, nodes.length - 1)];
  else if (event.key === "ArrowUp") target = nodes[Math.max(index - 1, 0)];
  else if (event.key === "Home") target = nodes[0];
  else if (event.key === "End") target = nodes[nodes.length - 1];
  else if (event.key === expandKey) {
    if (current.getAttribute("aria-expanded") === "false") handleExpand(current.dataset.treeNode!);
    else if (nodes[index + 1] && current.contains(nodes[index + 1])) target = nodes[index + 1];
  } else if (event.key === collapseKey) {
    if (current.getAttribute("aria-expanded") === "true") handleExpand(current.dataset.treeNode!);
    else target = current.parentElement?.closest<HTMLElement>("[data-tree-node]") ?? undefined;
  } else if (event.key === "Enter" || event.key === " ") {
    if (current instanceof HTMLButtonElement) current.click();
    else current.querySelector<HTMLButtonElement>("button")?.click();
  } else return;
  event.preventDefault();
  event.stopPropagation();
  if (target && nodes.includes(target)) target.focus();
}

onMounted(syncTabStops);
onUpdated(syncTabStops);
watch([expandedItems, selectedId], syncTabStops, { flush: "post" });
</script>

<template>
  <div :class="cn('size-full', props.class)">
    <div
      ref="treeRoot"
      role="tree"
      @focusin="onTreeFocus"
      @keydown="onTreeKeydown"
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
