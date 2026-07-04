<script setup lang="ts">
import Tree from "../../components/spark-ui/file-tree/tree.vue";
import Folder from "../../components/spark-ui/file-tree/folder.vue";
import File from "../../components/spark-ui/file-tree/file.vue";
import CollapseButton from "../../components/spark-ui/file-tree/collapse-button.vue";
import type { TreeViewElement } from "../../components/spark-ui/file-tree/context";

const ELEMENTS: TreeViewElement[] = [
  {
    id: "1",
    name: "app",
    children: [
      { id: "2", name: "layout.tsx" },
      { id: "3", name: "page.tsx" },
    ],
  },
  {
    id: "4",
    name: "components",
    children: [{ id: "5", name: "button.tsx" }],
  },
];
</script>

<template>
  <div
    class="bg-background relative flex h-[300px] w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg border"
  >
    <Tree
      class="bg-background overflow-hidden rounded-md p-2"
      :initial-expanded-items="['1']"
    >
      <Folder value="1" element="app">
        <File value="2"><span>layout.tsx</span></File>
        <File value="3"><span>page.tsx</span></File>
      </Folder>
      <Folder value="4" element="components">
        <File value="5"><span>button.tsx</span></File>
      </Folder>
      <CollapseButton :elements="ELEMENTS">
        <span class="text-xs">Toggle all</span>
      </CollapseButton>
    </Tree>
  </div>
</template>
