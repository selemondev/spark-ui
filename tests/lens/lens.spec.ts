// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { expect, it } from "vite-plus/test";
import Lens from "../../docs/src/components/spark-ui/lens/lens.vue";

const slot = { default: () => "<img src='x' alt='x' />" };

it("renders the base content and container defaults", () => {
  const wrapper = mount(Lens, { slots: slot });
  const container = wrapper.get("[role='region']");

  expect(container.attributes("aria-label")).toBe("Zoom Area");
  expect(container.classes()).toContain("overflow-hidden");
  // interactive mode: no lens content until hovering
  expect(container.element.querySelectorAll("div").length).toBe(0);
});

it("shows the lens content immediately when isStatic", () => {
  const wrapper = mount(Lens, {
    props: { isStatic: true, position: { x: 100, y: 50 }, zoomFactor: 2 },
    slots: slot,
  });
  const lens = wrapper.get("[role='region'] > div");
  const style = lens.attributes("style") ?? "";

  expect(style).toContain("transform-origin: 100px 50px");
  expect(style).toContain("radial-gradient");
  const zoom = wrapper.get("[role='region'] > div > div");
  expect(zoom.attributes("style")).toContain("scale(2)");
});

it("renders lens content when a defaultPosition is provided", () => {
  const wrapper = mount(Lens, {
    props: { defaultPosition: { x: 10, y: 20 } },
    slots: slot,
  });
  const lens = wrapper.get("[role='region'] > div");
  expect(lens.attributes("style")).toContain("transform-origin: 10px 20px");
});

it("reveals the lens on mouse enter in interactive mode", async () => {
  const wrapper = mount(Lens, { props: { class: "custom" }, slots: slot });
  const container = wrapper.get("[role='region']");
  expect(container.classes()).toContain("custom");

  await container.trigger("mouseenter");
  await nextTick();
  expect(wrapper.find(".absolute.inset-0.overflow-hidden").exists()).toBe(true);

  await container.trigger("mouseleave");
  await nextTick();
  expect(wrapper.find(".absolute.inset-0.overflow-hidden").exists()).toBe(false);
});

it("uses lensColor and lensSize in the mask", () => {
  const wrapper = mount(Lens, {
    props: { isStatic: true, position: { x: 0, y: 0 }, lensSize: 200, lensColor: "red" },
    slots: slot,
  });
  const style = wrapper.get("[role='region'] > div").attributes("style") ?? "";
  expect(style).toContain("circle 100px");
  expect(style).toContain("red");
});

it("throws when zoomFactor is less than 1", () => {
  expect(() => mount(Lens, { props: { zoomFactor: 0.5 }, slots: slot })).toThrow(
    "zoomFactor must be greater than 1",
  );
});
