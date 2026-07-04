// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import LineShadowText from "../../docs/src/components/spark-ui/line-shadow-text/line-shadow-text.vue";

it("renders the text content", () => {
  const wrapper = mount(LineShadowText, { props: { text: "Fast" } });
  expect(wrapper.text()).toBe("Fast");
});

it("mirrors the text into the data-text attribute for the shadow", () => {
  const wrapper = mount(LineShadowText, { props: { text: "Fast" } });
  expect(wrapper.get("span").attributes("data-text")).toBe("Fast");
});

it("applies the base line-shadow-text classes", () => {
  const wrapper = mount(LineShadowText, { props: { text: "Fast" } });
  const el = wrapper.get("span");
  expect(el.classes()).toContain("line-shadow-text");
  expect(el.classes()).toContain("relative");
  expect(el.classes()).toContain("inline-flex");
});

it("defaults shadowColor to black via the --shadow-color CSS var", () => {
  const wrapper = mount(LineShadowText, { props: { text: "Fast" } });
  const style = wrapper.get("span").attributes("style") ?? "";
  expect(style).toContain("--shadow-color: black");
});

it("respects a custom shadowColor", () => {
  const wrapper = mount(LineShadowText, {
    props: { text: "Fast", shadowColor: "white" },
  });
  const style = wrapper.get("span").attributes("style") ?? "";
  expect(style).toContain("--shadow-color: white");
});

it("renders as a custom element via the as prop", () => {
  const wrapper = mount(LineShadowText, {
    props: { text: "Fast", as: "h1" },
  });
  expect(wrapper.find("h1").exists()).toBe(true);
});

it("merges a custom class", () => {
  const wrapper = mount(LineShadowText, {
    props: { text: "Fast", class: "italic" },
  });
  expect(wrapper.get("span").classes()).toContain("italic");
});
