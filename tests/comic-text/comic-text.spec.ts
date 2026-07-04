// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import ComicText from "../../docs/src/components/spark-ui/comic-text/comic-text.vue";

it("renders slot content", () => {
  const wrapper = mount(ComicText, { slots: { default: "BOOM!" } });
  expect(wrapper.text()).toBe("BOOM!");
});

it("applies base comic styling and animation class", () => {
  const wrapper = mount(ComicText, { slots: { default: "POW" } });
  const el = wrapper.get("div");
  expect(el.classes()).toContain("animate-comic-text");
  expect(el.classes()).toContain("text-center");
  expect(el.classes()).toContain("select-none");
  const style = el.attributes("style") ?? "";
  expect(style).toContain("skewX(-10deg)");
  expect(style).toContain("text-transform: uppercase");
});

it("defaults fontSize to 5rem with proportional text stroke", () => {
  const wrapper = mount(ComicText, { slots: { default: "BAM" } });
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("font-size: 5rem");
  expect(style).toContain("1.75px #000000");
});

it("respects a custom fontSize", () => {
  const wrapper = mount(ComicText, {
    props: { fontSize: 10 },
    slots: { default: "ZAP" },
  });
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("font-size: 10rem");
  expect(style).toContain("3.5px #000000");
});

it("merges a custom class", () => {
  const wrapper = mount(ComicText, {
    props: { class: "my-custom" },
    slots: { default: "WOW" },
  });
  expect(wrapper.get("div").classes()).toContain("my-custom");
});

it("merges custom inline styles", () => {
  const wrapper = mount(ComicText, {
    props: { style: { color: "rgb(0, 128, 0)" } },
    slots: { default: "HEY" },
  });
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("color: rgb(0, 128, 0)");
});
