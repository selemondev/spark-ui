<script setup lang="ts">
import { computed } from "vue";
import {
  isFolderElement,
  type TreeSortMode,
  type TreeViewElement,
} from "./context";
import File from "./file.vue";
import Folder from "./folder.vue";

interface RenderNodeProps {
  element: TreeViewElement;
  sort: TreeSortMode;
}

const props = defineProps<RenderNodeProps>();

const isFolder = computed(() => isFolderElement(props.element));
</script>

<template>
  <Folder
    v-if="isFolder"
    :value="element.id"
    :element="element.name"
    :is-selectable="element.isSelectable"
  >
    <RenderNode
      v-for="child in element.children ?? []"
      :key="child.id"
      :element="child"
      :sort="sort"
    />
  </Folder>
  <File v-else :value="element.id" :is-selectable="element.isSelectable">
    <span>{{ element.name }}</span>
  </File>
</template>
