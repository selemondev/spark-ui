// @vitest-environment jsdom
/// <reference lib="dom" />
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import AnimatedThemeToggler from "../../docs/src/components/spark-ui/animated-theme-toggler/animated-theme-toggler.vue";

it("renders a toggle button with an accessible label", () => {
  const wrapper = mount(AnimatedThemeToggler);

  const button = wrapper.get("button");
  expect(button.attributes("type")).toBe("button");
  expect(wrapper.text()).toContain("Toggle theme");
  expect(wrapper.find("svg").exists()).toBe(true);
});

it("toggles the dark class and persists when uncontrolled", async () => {
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("theme");
  const wrapper = mount(AnimatedThemeToggler, { attachTo: document.body });

  await wrapper.get("button").trigger("click");

  expect(document.documentElement.classList.contains("dark")).toBe(true);
  expect(localStorage.getItem("theme")).toBe("dark");
  wrapper.unmount();
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("theme");
});

it("emits themeChange and skips localStorage when controlled", async () => {
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("theme");
  const wrapper = mount(AnimatedThemeToggler, {
    props: { theme: "light" },
    attachTo: document.body,
  });

  await wrapper.get("button").trigger("click");

  expect(wrapper.emitted("themeChange")).toEqual([["dark"]]);
  expect(localStorage.getItem("theme")).toBeNull();
  wrapper.unmount();
  document.documentElement.classList.remove("dark");
});

it("accepts variant and fromCenter props", async () => {
  document.documentElement.classList.remove("dark");
  const variants = [
    "circle",
    "square",
    "triangle",
    "diamond",
    "hexagon",
    "rectangle",
    "star",
  ] as const;

  for (const variant of variants) {
    const wrapper = mount(AnimatedThemeToggler, {
      props: { variant, fromCenter: true },
      attachTo: document.body,
    });
    await wrapper.get("button").trigger("click");
    wrapper.unmount();
  }

  // Seven toggles from light: ends dark.
  expect(document.documentElement.classList.contains("dark")).toBe(true);
  document.documentElement.classList.remove("dark");
  localStorage.removeItem("theme");
});

it("merges a custom class and passes through native attrs", () => {
  const wrapper = mount(AnimatedThemeToggler, {
    props: { class: "custom-toggle" },
    attrs: { "aria-label": "theme", disabled: "" },
  });

  const button = wrapper.get("button");
  expect(button.classes()).toContain("custom-toggle");
  expect(button.attributes("aria-label")).toBe("theme");
  expect(button.attributes("disabled")).toBeDefined();
});
