<script setup lang="ts">
import Tree from "../../components/spark-ui/file-tree/tree.vue";
import type { TreeViewElement } from "../../components/spark-ui/file-tree/context";

const ELEMENTS: TreeViewElement[] = [
  {
    id: "src",
    type: "folder",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "lib",
        type: "folder",
        isSelectable: true,
        name: "lib",
        children: [{ id: "utils", isSelectable: true, name: "utils.ts" }],
      },
      {
        id: "app",
        type: "folder",
        isSelectable: true,
        name: "app",
        children: [
          { id: "page", isSelectable: true, name: "page.tsx" },
          { id: "layout", isSelectable: true, name: "layout.tsx" },
        ],
      },
      {
        id: "components",
        type: "folder",
        isSelectable: true,
        name: "components",
        children: [
          { id: "header", isSelectable: true, name: "header.tsx" },
          {
            id: "ui",
            type: "folder",
            isSelectable: true,
            name: "ui",
            children: [{ id: "button", isSelectable: true, name: "button.tsx" }],
          },
          { id: "footer", isSelectable: true, name: "footer.tsx" },
        ],
      },
    ],
  },
];
</script>

<template>
  <div
    class="bg-background relative flex h-[300px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border"
  >
    <Tree
      class="bg-background overflow-hidden rounded-md p-2"
      initial-selected-id="button"
      :initial-expanded-items="['src', 'app', 'components', 'ui', 'lib']"
      :elements="ELEMENTS"
    />
  </div>
</template>
