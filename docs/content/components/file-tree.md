# File Tree

A component used to showcase the folder and file structure of a directory.

<demo src="../../src/example/file-tree/demo.vue" srcCode="../../src/spark-ui-demos/file-tree/file-tree.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [tree.vue]
<script setup lang="ts">
import { computed, onMounted, provide, ref, toRef, useSlots } from "vue";
import { cn } from "@/lib/utils";
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
```

```vue [folder.vue]
<script setup lang="ts">
import { computed, inject } from "vue";
import { cn } from "@/lib/utils";
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
});

const tree = inject(TreeContextKey);
if (!tree) {
  throw new Error("Folder must be used within a Tree");
}

const isExpanded = computed(
  () => tree.expandedItems.value?.includes(props.value) ?? false,
);
const isSelected = computed(() => props.isSelect ?? tree.selectedId.value === props.value);

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
```

```vue [file.vue]
<script setup lang="ts">
import { computed, inject } from "vue";
import { cn } from "@/lib/utils";
import { TreeContextKey } from "./context";

interface FileProps {
  class?: string;
  value: string;
  isSelectable?: boolean;
  isSelect?: boolean;
}

const props = withDefaults(defineProps<FileProps>(), {
  isSelectable: true,
});

const emit = defineEmits<{
  select: [id: string];
}>();

const tree = inject(TreeContextKey);
if (!tree) {
  throw new Error("File must be used within a Tree");
}

const isSelected = computed(() => props.isSelect ?? tree.selectedId.value === props.value);

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
    :aria-selected="isSelected"
    :disabled="!props.isSelectable"
    :dir="tree.direction.value"
    :class="
      cn(
        'flex w-fit items-center gap-1 rounded-md pr-1 text-sm duration-200 ease-in-out rtl:pr-0 rtl:pl-1',
        {
          'bg-muted': isSelected && props.isSelectable,
        },
        props.isSelectable
          ? 'cursor-pointer'
          : 'cursor-not-allowed opacity-50',
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
        <path
          d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
        />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      </svg>
    </slot>
    <slot />
  </button>
</template>
```

```vue [render-node.vue]
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
```

```vue [collapse-button.vue]
<script setup lang="ts">
import { computed, inject, onMounted } from "vue";
import { cn } from "@/lib/utils";
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
```

```ts [context.ts]
import { defineComponent, type InjectionKey, type Ref } from "vue";

export interface TreeViewElement {
  id: string;
  name: string;
  type?: "file" | "folder";
  isSelectable?: boolean;
  children?: TreeViewElement[];
}

export type TreeSortMode =
  | "default"
  | "none"
  | ((a: TreeViewElement, b: TreeViewElement) => number);

export interface TreeContext {
  selectedId: Ref<string | undefined>;
  expandedItems: Ref<string[] | undefined>;
  indicator: Ref<boolean>;
  direction: Ref<"rtl" | "ltr">;
  handleExpand: (id: string) => void;
  selectItem: (id: string) => void;
  setExpandedItems: (items: string[] | undefined) => void;
  openIcon?: () => unknown;
  closeIcon?: () => unknown;
}

export const TreeContextKey: InjectionKey<TreeContext> = Symbol("SparkUITree");

/**
 * Renders a captured slot function, used to forward the Tree-level
 * `openIcon` / `closeIcon` slots down to deeply nested Folder nodes.
 */
export const RenderSlot = defineComponent({
  name: "RenderSlot",
  props: {
    render: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    return () => (props.render as () => unknown)();
  },
});

export const isFolderElement = (element: TreeViewElement): boolean => {
  if (element.type) {
    return element.type === "folder";
  }
  return Array.isArray(element.children);
};

export const mergeExpandedItems = (
  currentItems: string[] | undefined,
  nextItems: string[],
): string[] => [...new Set([...(currentItems ?? []), ...nextItems])];

const treeCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

const defaultTreeComparator = (a: TreeViewElement, b: TreeViewElement) => {
  const aIsFolder = isFolderElement(a);
  const bIsFolder = isFolderElement(b);

  if (aIsFolder !== bIsFolder) {
    return aIsFolder ? -1 : 1;
  }

  return treeCollator.compare(a.name, b.name);
};

const getTreeComparator = (sort: TreeSortMode) => {
  if (sort === "none") {
    return undefined;
  }
  if (sort === "default") {
    return defaultTreeComparator;
  }
  return sort;
};

export const sortTreeElements = (
  elements: TreeViewElement[],
  sort: TreeSortMode,
): TreeViewElement[] => {
  const comparator = getTreeComparator(sort);

  const nextElements = elements.map((element) => {
    if (!Array.isArray(element.children)) {
      return element;
    }
    return {
      ...element,
      children: sortTreeElements(element.children, sort),
    };
  });

  if (!comparator) {
    return nextElements;
  }

  return [...nextElements].sort(comparator);
};
```

:::

Add the following animations to your `tailwind.config.js` file, so folder expand/collapse works smoothly:

```js {4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19} [tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
```

## Usage

Pass a data-driven tree via the `elements` prop. When you pass `elements` and omit the default slot, the tree is rendered from data and siblings are sorted automatically using a folders-first alphabetical order. Use `sort="none"` to preserve the input order, or pass a custom comparator.

```vue
<script setup lang="ts">
import Tree from "@/components/spark-ui/file-tree/tree.vue";
import type { TreeViewElement } from "@/components/spark-ui/file-tree/context";

const elements: TreeViewElement[] = [
  {
    id: "src",
    type: "folder",
    name: "src",
    children: [
      { id: "components", type: "folder", name: "components" },
      { id: "app", type: "folder", name: "app" },
      { id: "page", name: "page.tsx" },
      { id: "layout", name: "layout.tsx" },
    ],
  },
];
</script>

<template>
  <Tree :elements="elements" />
</template>
```

You can also compose the tree manually with the `Folder`, `File` and `CollapseButton` components.

## Examples

#### Manual composition with a toggle button

<demo src="../../src/example/file-tree/composition-demo.vue" srcCode="../../src/spark-ui-demos/file-tree/composition.vue" />

## Props

### Tree

| Prop                 | Type                                        | Default     | Description                                                           |
| -------------------- | ------------------------------------------- | ----------- | --------------------------------------------------------------------- |
| class                | string                                      | `-`         | The class to apply to the component.                                  |
| initialSelectedId    | string                                      | `-`         | The ID of the initially selected item.                               |
| indicator            | boolean                                     | `true`      | Whether to show the tree indicator line.                             |
| elements             | TreeViewElement[]                           | `-`         | An array of tree view elements to render when the default slot is omitted. |
| initialExpandedItems | string[]                                    | `-`         | An array of IDs for items that should be initially expanded.         |
| sort                 | `"default" \| "none" \| ((a, b) => number)` | `"default"` | Sorting mode used for data-driven trees rendered from `elements`.    |
| dir                  | `"rtl" \| "ltr"`                            | `"ltr"`     | The text direction of the tree.                                      |

### Tree Slots

| Slot      | Description                                                     |
| --------- | --------------------------------------------------------------- |
| default   | Manually composed `Folder` / `File` nodes (overrides `elements`). |
| openIcon  | Custom icon rendered for open folders.                          |
| closeIcon | Custom icon rendered for closed folders.                        |

### TreeViewElement

| Prop         | Type                 | Default | Description                                           |
| ------------ | -------------------- | ------- | ----------------------------------------------------- |
| id           | string               | `-`     | A unique identifier for the node.                     |
| name         | string               | `-`     | The label rendered for the node in data-driven mode.  |
| type         | `"file" \| "folder"` | `-`     | Explicit node type. Use `"folder"` for empty folders. |
| isSelectable | boolean              | `true`  | Whether the node can be selected.                     |
| children     | TreeViewElement[]    | `-`     | Child nodes for folders.                              |

### Folder

| Prop         | Type    | Default | Description                               |
| ------------ | ------- | ------- | ----------------------------------------- |
| class        | string  | `-`     | The class to apply to the trigger.        |
| element      | string  | `-`     | The name of the folder.                   |
| value        | string  | `-`     | The unique identifier for the folder.     |
| isSelectable | boolean | `true`  | Whether the folder can be selected.       |
| isSelect     | boolean | `-`     | Whether the folder is currently selected. |

### File

| Prop         | Type    | Default | Description                             |
| ------------ | ------- | ------- | --------------------------------------- |
| class        | string  | `-`     | The class to apply to the file.         |
| value        | string  | `-`     | The unique identifier for the file.     |
| isSelectable | boolean | `true`  | Whether the file can be selected.       |
| isSelect     | boolean | `-`     | Whether the file is currently selected. |

### File Slots

| Slot     | Description                        |
| -------- | ---------------------------------- |
| default  | The file label content.            |
| fileIcon | Custom icon rendered for the file. |

### File Events

| Event  | Payload  | Description                            |
| ------ | -------- | -------------------------------------- |
| select | `string` | Emitted with the file id when clicked. |

### CollapseButton

| Prop      | Type              | Default | Description                                |
| --------- | ----------------- | ------- | ------------------------------------------ |
| class     | string            | `-`     | The class to apply to the button.          |
| elements  | TreeViewElement[] | `-`     | An array of tree view elements to control. |
| expandAll | boolean           | `false` | Whether to expand all elements initially.  |
