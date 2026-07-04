<script setup lang="ts">
import { computed, inject, onMounted } from "vue";
import { cn } from "../../../lib/utils";
import { TreeContextKey, type TreeViewElement } from "./context";

interface CollapseButtonProps {
  class?: string;
  elements: TreeViewElement[];
  expandAll?: boolean;
}

const props = withDefaults(defineProps<CollapseButtonProps>(), {
  expandAll: false,
});

const tree = inject(TreeContextKey);
if (!tree) {
  throw new Error("CollapseButton must be used within a Tree");
}

const expandAllTree = (elements: TreeViewElement[]): string[] => {
  const expandedElementIds: string[] = [];

  const expandTree = (element: TreeViewElement) => {
    const isSelectable = element.isSelectable ?? true;
    if (isSelectable && element.children && element.children.length > 0) {
      expandedElementIds.push(element.id);
      for (const child of element.children) {
        expandTree(child);
      }
    }
  };

  for (const element of elements) {
    expandTree(element);
  }

  return [...new Set(expandedElementIds)];
};

const isOpen = computed(
  () => (tree.expandedItems.value?.length ?? 0) > 0,
);

const onClick = () => {
  if (isOpen.value) {
    tree.setExpandedItems([]);
  } else {
    tree.setExpandedItems(expandAllTree(props.elements));
  }
};

onMounted(() => {
  if (props.expandAll) {
    tree.setExpandedItems(expandAllTree(props.elements));
  }
});
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'ring-offset-background focus-visible:ring-ring inline-flex h-8 w-fit items-center justify-center gap-1 rounded-md p-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 absolute right-2 bottom-1',
        props.class,
      )
    "
    @click="onClick"
  >
    <slot />
    <span class="sr-only">Toggle</span>
  </button>
</template>
