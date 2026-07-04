// @vitest-environment jsdom
/// <reference lib="dom" />
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import { nextTick } from "vue";
import Highlighter from "../../docs/src/components/spark-ui/highlighter/highlighter.vue";

// jsdom lacks SVG geometry APIs that rough-notation relies on.
const svgProto = SVGElement.prototype as unknown as Record<string, unknown>;
svgProto.getTotalLength = () => 100;
svgProto.getPointAtLength = () => ({ x: 0, y: 0 });
svgProto.getBBox = () => ({ x: 0, y: 0, width: 100, height: 20 });

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
let intersectCallback: ((entries: unknown[]) => void) | null = null;
class IntersectionObserverStub {
  constructor(cb: (entries: unknown[]) => void) {
    intersectCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver =
  ResizeObserverStub as unknown as typeof ResizeObserver;
globalThis.IntersectionObserver =
  IntersectionObserverStub as unknown as typeof IntersectionObserver;

it("renders slot content inside a styled span", () => {
  const wrapper = mount(Highlighter, { slots: { default: "hello" } });
  const span = wrapper.get("span");
  expect(span.text()).toBe("hello");
  expect(span.classes()).toContain("relative");
  expect(span.classes()).toContain("inline-block");
  expect(span.classes()).toContain("bg-transparent");
});

it("draws a rough-notation svg annotation on mount by default", async () => {
  const wrapper = mount(Highlighter, {
    attachTo: document.body,
    slots: { default: "text" },
  });
  await nextTick();
  await nextTick();
  const svg = wrapper.get("span").element.parentElement!.querySelector("svg.rough-annotation");
  expect(svg).not.toBeNull();
  wrapper.unmount();
});

it("does not draw immediately when isView is true until it enters the viewport", async () => {
  intersectCallback = null;
  const wrapper = mount(Highlighter, {
    attachTo: document.body,
    props: { isView: true },
    slots: { default: "text" },
  });
  await nextTick();
  await nextTick();
  const parent = wrapper.get("span").element.parentElement!;
  expect(parent.querySelector("svg.rough-annotation")).toBeNull();

  const trigger = intersectCallback as
    | ((entries: unknown[]) => void)
    | null;
  trigger?.([{ isIntersecting: true }]);
  await nextTick();
  await nextTick();
  expect(parent.querySelector("svg.rough-annotation")).not.toBeNull();
  wrapper.unmount();
});

it("draws the annotation for a non-highlight action", async () => {
  const wrapper = mount(Highlighter, {
    attachTo: document.body,
    props: { action: "underline", color: "#FF9800" },
    slots: { default: "text" },
  });
  await nextTick();
  await nextTick();
  // Non-highlight annotations are inserted directly after the target element.
  const span = wrapper.get("span").element;
  expect(
    span.nextElementSibling?.classList.contains("rough-annotation"),
  ).toBe(true);
  wrapper.unmount();
});

it("removes the annotation svg on unmount", async () => {
  const wrapper = mount(Highlighter, {
    attachTo: document.body,
    slots: { default: "x" },
  });
  await nextTick();
  await nextTick();
  const parent = wrapper.get("span").element.parentElement!;
  expect(parent.querySelector("svg.rough-annotation")).not.toBeNull();
  wrapper.unmount();
  expect(parent.querySelector("svg.rough-annotation")).toBeNull();
});

it("merges a custom class onto the wrapper", () => {
  const wrapper = mount(Highlighter, {
    props: { class: "my-custom" },
    slots: { default: "x" },
  });
  expect(wrapper.get("span").classes()).toContain("my-custom");
});
