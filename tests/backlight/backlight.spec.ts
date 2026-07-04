// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import Backlight from "../../docs/src/components/spark-ui/backlight/backlight.vue";

it("renders slot content inside the filtered wrapper", () => {
  const wrapper = mount(Backlight, {
    slots: { default: '<img alt="test" />' },
  });
  expect(wrapper.find("img").exists()).toBe(true);
});

it("applies the default blur of 20 to feGaussianBlur", () => {
  const wrapper = mount(Backlight);
  expect(wrapper.find("feGaussianBlur").attributes("stdDeviation")).toBe("20");
});

it("applies a custom blur value", () => {
  const wrapper = mount(Backlight, { props: { blur: 40 } });
  expect(wrapper.find("feGaussianBlur").attributes("stdDeviation")).toBe("40");
});

it("merges a custom class onto the wrapper div", () => {
  const wrapper = mount(Backlight, { props: { class: "w-full" } });
  expect(wrapper.classes()).toContain("w-full");
});

it("links the filter id to the inner wrapper filter style", () => {
  const wrapper = mount(Backlight);
  const filterId = wrapper.find("filter").attributes("id");
  const styled = wrapper.findAll("div").find((d) => d.attributes("style")?.includes("url(#"));
  expect(styled?.attributes("style")).toContain(`url(#${filterId})`);
});
