// @vitest-environment jsdom
/// <reference lib="dom" />
import { mount } from "@vue/test-utils";
import { beforeAll, expect, it } from "vite-plus/test";
import DiaTextReveal from "../../docs/src/components/spark-ui/dia-text-reveal/dia-text-reveal.vue";

beforeAll(() => {
  if (!("IntersectionObserver" in globalThis)) {
    globalThis.IntersectionObserver = class {
      observe() {}
      disconnect() {}
      unobserve() {}
      takeRecords() {
        return [];
      }
    } as unknown as typeof IntersectionObserver;
  }
  if (!globalThis.matchMedia) {
    globalThis.matchMedia = ((query: string) => ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent() {
        return false;
      },
      onchange: null,
    })) as unknown as typeof globalThis.matchMedia;
  }
  globalThis.requestAnimationFrame ??= ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(0), 0) as unknown as number) as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame ??= ((id: number) =>
    clearTimeout(id)) as typeof cancelAnimationFrame;
});

it("renders single text content", () => {
  const wrapper = mount(DiaTextReveal, { props: { text: "Magic UI" } });
  expect(wrapper.text()).toBe("Magic UI");
  expect(wrapper.element.tagName).toBe("SPAN");
});

it("renders the first entry when text is an array", () => {
  const wrapper = mount(DiaTextReveal, {
    props: { text: ["one", "two", "three"] },
  });
  expect(wrapper.text()).toBe("one");
});

it("applies base classes and text-reveal styling", () => {
  const wrapper = mount(DiaTextReveal, { props: { text: "Hello" } });
  const el = wrapper.get("span");
  expect(el.classes()).toContain("align-bottom");
  const style = el.attributes("style") ?? "";
  expect(style).toContain("background-clip: text");
  expect(style).toContain("linear-gradient");
});

it("merges a custom class", () => {
  const wrapper = mount(DiaTextReveal, {
    props: { text: "Hello", class: "text-4xl font-bold" },
  });
  expect(wrapper.get("span").classes()).toContain("text-4xl");
  expect(wrapper.get("span").classes()).toContain("font-bold");
});

it("uses inline-block layout for multi-text (rotation)", () => {
  const wrapper = mount(DiaTextReveal, {
    props: { text: ["a", "bb"] },
  });
  const style = wrapper.get("span").attributes("style") ?? "";
  expect(style).toContain("display: inline-block");
  expect(style).toContain("white-space: nowrap");
});

it("does not apply inline-block layout for single text", () => {
  const wrapper = mount(DiaTextReveal, { props: { text: "solo" } });
  const style = wrapper.get("span").attributes("style") ?? "";
  expect(style).not.toContain("display: inline-block");
});

it("includes custom colors in the gradient", async () => {
  const wrapper = mount(DiaTextReveal, {
    props: { text: "Hi", colors: ["#123456", "#abcdef"], startOnView: false },
  });
  await new Promise((resolve) => setTimeout(resolve, 20));
  const style = wrapper.get("span").attributes("style") ?? "";
  expect(style.toLowerCase()).toContain("#123456");
});

it("settles on textColor when reduced motion is preferred", async () => {
  globalThis.matchMedia = ((query: string) => ({
    matches: true,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
    onchange: null,
  })) as unknown as typeof globalThis.matchMedia;
  const wrapper = mount(DiaTextReveal, {
    props: { text: "Reduced", textColor: "rgb(1, 2, 3)" },
  });
  await wrapper.vm.$nextTick();
  const style = wrapper.get("span").attributes("style") ?? "";
  expect(style).toContain("rgb(1, 2, 3)");
  globalThis.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
    onchange: null,
  })) as unknown as typeof globalThis.matchMedia;
});
