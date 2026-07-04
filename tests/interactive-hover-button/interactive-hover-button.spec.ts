// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import InteractiveHoverButton from "../../docs/src/components/spark-ui/interactive-hover-button/interactive-hover-button.vue";

it("renders slot content in both text layers", () => {
  const wrapper = mount(InteractiveHoverButton, { slots: { default: "Hover Me" } });
  const spans = wrapper.findAll("span");
  expect(spans).toHaveLength(2);
  spans.forEach((span) => expect(span.text()).toBe("Hover Me"));
});

it("renders as a button with base styling and group class", () => {
  const wrapper = mount(InteractiveHoverButton, { slots: { default: "Go" } });
  const btn = wrapper.get("button");
  expect(btn.classes()).toContain("group");
  expect(btn.classes()).toContain("rounded-full");
  expect(btn.classes()).toContain("overflow-hidden");
});

it("uses paired light/dark colors (no unresolved theme tokens)", () => {
  const wrapper = mount(InteractiveHoverButton, { slots: { default: "Go" } });
  const html = wrapper.html();
  expect(html).toContain("bg-white");
  expect(html).toContain("dark:bg-black");
  expect(html).not.toContain("bg-primary");
  expect(html).not.toContain("bg-background");
  expect(html).not.toContain("text-primary-foreground");
});

it("renders the expanding dot with hover scale transition", () => {
  const wrapper = mount(InteractiveHoverButton, { slots: { default: "Go" } });
  const dot = wrapper.get("button > div > div");
  expect(dot.classes()).toContain("group-hover:scale-[100.8]");
  expect(dot.classes()).toContain("rounded-full");
});

it("renders an inline arrow svg", () => {
  const wrapper = mount(InteractiveHoverButton, { slots: { default: "Go" } });
  expect(wrapper.find("svg").exists()).toBe(true);
});

it("merges a custom class", () => {
  const wrapper = mount(InteractiveHoverButton, {
    props: { class: "my-custom" },
    slots: { default: "Go" },
  });
  expect(wrapper.get("button").classes()).toContain("my-custom");
});

it("falls through native button attributes", () => {
  const wrapper = mount(InteractiveHoverButton, {
    attrs: { disabled: "", type: "submit" },
    slots: { default: "Go" },
  });
  const btn = wrapper.get("button");
  expect(btn.attributes("disabled")).toBeDefined();
  expect(btn.attributes("type")).toBe("submit");
});

it("emits click events", async () => {
  const wrapper = mount(InteractiveHoverButton, { slots: { default: "Go" } });
  await wrapper.get("button").trigger("click");
  expect(wrapper.emitted("click")).toBeTruthy();
});
