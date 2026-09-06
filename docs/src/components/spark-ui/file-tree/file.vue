<script setup lang="ts">
import { computed, inject } from "vue";
import { cn } from "../../../lib/utils";
import { TreeContextKey } from "./context";

interface FileProps {
  class?: string;
  value: string;
  isSelectable?: boolean;
  isSelect?: boolean;
}

const props = withDefaults(defineProps<FileProps>(), {
  isSelectable: true,
  isSelect: undefined,
});

const emit = defineEmits<{
  select: [id: string];
}>();

const tree = inject(TreeContextKey);
if (!tree) {
  throw new Error("File must be used within a Tree");
}

const isSelected = computed(() =>
  props.isSelect !== undefined ? props.isSelect : tree.selectedId.value === props.value,
);

const onClick = () => {
  if (!props.isSelectable) return;
  tree.selectItem(props.value);
  emit("select", props.value);
};
</script>

<template>
  <button
    type="button"
    role="treeitem"
    :data-tree-node="props.value"
    :aria-disabled="!props.isSelectable"
    tabindex="-1"
    :aria-selected="isSelected"
    :disabled="!props.isSelectable"
    :dir="tree.direction.value"
    :class="
      cn(
        'flex w-fit items-center gap-1 rounded-md pr-1 text-sm duration-200 ease-in-out rtl:pr-0 rtl:pl-1',
        {
          'bg-muted': isSelected && props.isSelectable,
        },
        props.isSelectable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
        tree.direction.value === 'rtl' ? 'rtl' : 'ltr',
        props.class,
      )
    "
    @click="onClick"
  >
    <slot name="fileIcon">
      <svg
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
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </svg>
    </slot>
    <slot />
  </button>
</template>
