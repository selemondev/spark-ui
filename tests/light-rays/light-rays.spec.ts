// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import { nextTick } from "vue";
import LightRays from "../../docs/src/components/spark-ui/light-rays/light-rays.vue";

it("renders the default number of rays with wrapper custom properties", async () => {
  const wrapper = mount(LightRays);
  await nextTick();
  const style = wrapper.attributes("style") ?? "";

  expect(style).toContain("--light-rays-color: rgba(160, 210, 255, 0.2)");
  expect(style).toContain("--light-rays-blur: 36px");
  expect(style).toContain("--light-rays-length: 70vh");
  expect(wrapper.findAll(".light-ray")).toHaveLength(7);
});

it("respects a custom count, color, blur, and length", async () => {
  const wrapper = mount(LightRays, {
    props: {
      count: 3,
      color: "rgba(255, 0, 0, 0.5)",
      blur: 12,
      length: "50vh",
    },
  });
  await nextTick();
  const style = wrapper.attributes("style") ?? "";

  expect(style).toContain("--light-rays-color: rgba(255, 0, 0, 0.5)");
  expect(style).toContain("--light-rays-blur: 12px");
  expect(style).toContain("--light-rays-length: 50vh");
  expect(wrapper.findAll(".light-ray")).toHaveLength(3);
});

it("renders no rays when count is zero or negative", async () => {
  const wrapper = mount(LightRays, { props: { count: 0 } });
  await nextTick();
  expect(wrapper.findAll(".light-ray")).toHaveLength(0);
});

it("forwards additional class names to the wrapper", () => {
  const wrapper = mount(LightRays, { props: { class: "custom-rays" } });
  expect(wrapper.classes()).toContain("custom-rays");
});

it("sets per-ray animation custom properties", async () => {
  const wrapper = mount(LightRays, { props: { count: 1 } });
  await nextTick();
  const ray = wrapper.get(".light-ray");
  const style = ray.attributes("style") ?? "";

  expect(style).toContain("--ray-left:");
  expect(style).toContain("--ray-width:");
  expect(style).toContain("--ray-rotate:");
  expect(style).toContain("--ray-duration:");
});
