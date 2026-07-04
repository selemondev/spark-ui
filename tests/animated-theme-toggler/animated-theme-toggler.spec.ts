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

it("toggles the dark class on the document element when clicked", async () => {
  document.documentElement.classList.remove("dark");
  const wrapper = mount(AnimatedThemeToggler, { attachTo: document.body });

  await wrapper.get("button").trigger("click");

  expect(document.documentElement.classList.contains("dark")).toBe(true);
  wrapper.unmount();
});

it("merges a custom class onto the button", () => {
  const wrapper = mount(AnimatedThemeToggler, {
    props: { class: "custom-toggle" },
  });

  expect(wrapper.get("button").classes()).toContain("custom-toggle");
});
