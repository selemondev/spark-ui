// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import GlareHover from "../../docs/src/components/spark-ui/glare-hover/glare-hover.vue";

it("renders slot content", () => {
  const wrapper = mount(GlareHover, { slots: { default: "Hello" } });
  expect(wrapper.text()).toBe("Hello");
});

it("applies base classes and default css variables", () => {
  const wrapper = mount(GlareHover);
  const el = wrapper.get("div");
  expect(el.classes()).toContain("relative");
  expect(el.classes()).toContain("overflow-hidden");
  const style = el.attributes("style") ?? "";
  expect(style).toContain("--gh-angle: -45deg");
  expect(style).toContain("--gh-duration: 650ms");
  expect(style).toContain("--gh-size: 250%");
  expect(style).toContain("background: rgb(0, 0, 0)");
});

it("parses a 6-digit hex color into rgba with opacity", () => {
  const wrapper = mount(GlareHover, {
    props: { color: "#a78bfa", opacity: 0.35 },
  });
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("--gh-rgba: rgba(167,139,250,0.35)");
});

it("parses a 3-digit hex color into rgba", () => {
  const wrapper = mount(GlareHover, { props: { color: "#fff", opacity: 0.5 } });
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("--gh-rgba: rgba(255,255,255,0.5)");
});

it("passes non-hex colors through untouched", () => {
  const wrapper = mount(GlareHover, { props: { color: "red" } });
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("--gh-rgba: red");
});

it("reflects custom angle, size and duration", () => {
  const wrapper = mount(GlareHover, {
    props: { angle: -30, size: 280, duration: 500 },
  });
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("--gh-angle: -30deg");
  expect(style).toContain("--gh-size: 280%");
  expect(style).toContain("--gh-duration: 500ms");
});

it("applies width and height when provided", () => {
  const wrapper = mount(GlareHover, {
    props: { width: "100%", height: "200px" },
  });
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("width: 100%");
  expect(style).toContain("height: 200px");
});

it("uses transition classes by default and hover-only when playOnce", () => {
  const normal = mount(GlareHover);
  expect(normal.get("div").classes()).toContain(
    "before:transition-[background-position]",
  );

  const once = mount(GlareHover, { props: { playOnce: true } });
  const cls = once.get("div").classes();
  expect(cls).toContain("before:transition-none");
  expect(cls).toContain("hover:before:transition-[background-position]");
});

it("merges a custom class", () => {
  const wrapper = mount(GlareHover, { props: { class: "rounded-xl" } });
  expect(wrapper.get("div").classes()).toContain("rounded-xl");
});
