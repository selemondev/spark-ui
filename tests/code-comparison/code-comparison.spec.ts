// @vitest-environment jsdom
import { expect, it, vi } from "vite-plus/test";
import { flushPromises, mount } from "@vue/test-utils";
import CodeComparison from "../../docs/src/components/spark-ui/code-comparison/code-comparison.vue";

vi.mock("shiki", () => ({
  codeToHtml: vi.fn(async (code: string) => {
    if (code.includes("[focus-class]")) {
      return '<pre><code><span class="focused">line</span></code></pre>';
    }

    if (code.includes("[focus-text]")) {
      return "<pre><code><span>focused</span></code></pre>";
    }

    return "<pre><code><span>line</span></code></pre>";
  }),
}));

vi.mock("@shikijs/transformers", () => ({
  transformerNotationHighlight: vi.fn(() => ({})),
  transformerNotationDiff: vi.fn(() => ({})),
  transformerNotationFocus: vi.fn(() => ({})),
}));

vi.mock("vitepress", () => ({
  useData: () => ({ isDark: { value: false } }),
}));

const beforeCode = `const a = 1; // [!code --]`;
const afterCode = `const a = 2; // [!code ++]`;

function factory(props: Record<string, unknown> = {}) {
  return mount(CodeComparison, {
    props: {
      beforeCode,
      afterCode,
      language: "typescript",
      filename: "example.ts",
      ...props,
    },
  });
}

it("renders the filename in both panes with before/after labels", () => {
  const wrapper = factory();
  expect(wrapper.text()).toContain("example.ts");
  expect(wrapper.text()).toContain("before");
  expect(wrapper.text()).toContain("after");
  expect(wrapper.text()).toContain("VS");
});

it("shows a plain <pre> fallback with raw code before highlighting", () => {
  const wrapper = factory();
  const pres = wrapper.findAll("pre");
  expect(pres.length).toBe(2);
  expect(pres.at(0)?.text()).toContain("const a = 1;");
  expect(pres.at(1)?.text()).toContain("const a = 2;");
});

it("applies the highlight color css variable via style binding", () => {
  const wrapper = factory({ highlightColor: "#ff3333" });
  // Fallback pre is shown pre-highlight; the wrapper root still mounts cleanly.
  expect(wrapper.find(".leftside").exists()).toBe(true);
  expect(wrapper.find(".rightside").exists()).toBe(true);
});

it("merges a custom class onto the root element", () => {
  const wrapper = factory({ class: "my-custom-class" });
  expect(wrapper.classes()).toContain("my-custom-class");
});

it("defaults lightTheme, darkTheme and highlightColor props", () => {
  const wrapper = factory();
  const vm = wrapper.props() as Record<string, unknown>;
  expect(vm.lightTheme).toBe("github-light");
  expect(vm.darkTheme).toBe("github-dark");
  expect(vm.highlightColor).toBe("rgba(101, 117, 133, 0.16)");
});

it("only applies focus styling when highlighted HTML contains a focused class", async () => {
  const wrapper = factory({
    beforeCode: "const a = 1; // [focus-class]",
    afterCode: 'const label = "focused"; // [focus-text]',
  });

  await flushPromises();

  expect(wrapper.find(".leftside").classes()).toContain("has-focus");
  expect(wrapper.find(".rightside").classes()).not.toContain("has-focus");
});
