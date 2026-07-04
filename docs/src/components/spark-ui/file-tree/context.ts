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
