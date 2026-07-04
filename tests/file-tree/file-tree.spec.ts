// @vitest-environment jsdom
import { h, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import Tree from "../../docs/src/components/spark-ui/file-tree/tree.vue";
import Folder from "../../docs/src/components/spark-ui/file-tree/folder.vue";
import File from "../../docs/src/components/spark-ui/file-tree/file.vue";
import CollapseButton from "../../docs/src/components/spark-ui/file-tree/collapse-button.vue";
import {
  sortTreeElements,
  isFolderElement,
  type TreeViewElement,
} from "../../docs/src/components/spark-ui/file-tree/context";

const CHILDREN: TreeViewElement[] = [
  { id: "b", name: "b.ts" },
  {
    id: "app",
    type: "folder",
    name: "app",
    children: [{ id: "page", name: "page.tsx" }],
  },
];

const ELEMENTS: TreeViewElement[] = [
  {
    id: "src",
    type: "folder",
    name: "src",
    children: [
      { id: "b", name: "b.ts" },
      {
        id: "app",
        type: "folder",
        name: "app",
        children: [{ id: "page", name: "page.tsx" }],
      },
    ],
  },
];

it("renders a data-driven tree with tree/treeitem roles", () => {
  const wrapper = mount(Tree, {
    props: { elements: ELEMENTS, initialExpandedItems: ["src"] },
  });
  expect(wrapper.get('[role="tree"]')).toBeTruthy();
  expect(wrapper.findAll('[role="treeitem"]').length).toBeGreaterThan(0);
  expect(wrapper.text()).toContain("src");
  expect(wrapper.text()).toContain("app");
});

it("sorts folders first then alphabetically by default", () => {
  const sorted = sortTreeElements(CHILDREN, "default");
  expect(sorted.map((e) => e.id)).toEqual(["app", "b"]);
});

it("preserves input order when sort is none", () => {
  const sorted = sortTreeElements(CHILDREN, "none");
  expect(sorted.map((e) => e.id)).toEqual(["b", "app"]);
});

it("detects folders via type or children", () => {
  expect(isFolderElement({ id: "a", name: "a", type: "folder" })).toBe(true);
  expect(isFolderElement({ id: "a", name: "a", children: [] })).toBe(true);
  expect(isFolderElement({ id: "a", name: "a.ts" })).toBe(false);
});

it("toggles folder expansion on trigger click", async () => {
  const wrapper = mount(Tree, {
    slots: {
      default: () => [
        h(Folder, { value: "1", element: "app" }, () => [
          h(File, { value: "2" }, () => "page.tsx"),
        ]),
      ],
    },
  });
  const trigger = wrapper.get("button");
  expect(trigger.attributes("aria-expanded")).toBe("false");
  await trigger.trigger("click");
  expect(trigger.attributes("aria-expanded")).toBe("true");
});

it("selects a file and marks it aria-selected", async () => {
  const wrapper = mount(Tree, {
    slots: {
      default: () => [h(File, { value: "f1" }, () => "readme.md")],
    },
  });
  const file = wrapper.get('[role="treeitem"]');
  expect(file.attributes("aria-selected")).toBe("false");
  await file.trigger("click");
  expect(file.attributes("aria-selected")).toBe("true");
});

it("expand-all button expands all selectable folders", async () => {
  const wrapper = mount(
    {
      components: { Tree, Folder, File, CollapseButton },
      setup: () => ({ ELEMENTS }),
      template: `
        <Tree>
          <Folder value="src" element="src">
            <Folder value="app" element="app">
              <File value="page"><span>page.tsx</span></File>
            </Folder>
          </Folder>
          <CollapseButton :elements="ELEMENTS" expandAll />
        </Tree>
      `,
    },
    {},
  );
  await nextTick();
  const triggers = wrapper.findAll('[role="treeitem"][aria-expanded]');
  expect(triggers.every((t) => t.attributes("aria-expanded") === "true")).toBe(
    true,
  );
});
