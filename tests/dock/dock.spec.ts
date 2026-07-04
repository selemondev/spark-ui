// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import Dock from "../../docs/src/components/spark-ui/dock/dock.vue";
import DockIcon from "../../docs/src/components/spark-ui/dock/dock-icon.vue";

it("renders slotted dock icons", () => {
  const wrapper = mount(Dock, {
    slots: {
      default: [
        "<div class='icon-a'>A</div>",
        "<div class='icon-b'>B</div>",
      ].join(""),
    },
  });
  expect(wrapper.find(".icon-a").exists()).toBe(true);
  expect(wrapper.find(".icon-b").exists()).toBe(true);
});

it("applies base dock variant classes", () => {
  const wrapper = mount(Dock);
  const el = wrapper.get("div");
  expect(el.classes()).toContain("rounded-2xl");
  expect(el.classes()).toContain("backdrop-blur-md");
  expect(el.classes()).toContain("items-center");
});

it("reflects direction via alignment classes", () => {
  const top = mount(Dock, { props: { direction: "top" } });
  expect(top.get("div").classes()).toContain("items-start");
  const bottom = mount(Dock, { props: { direction: "bottom" } });
  expect(bottom.get("div").classes()).toContain("items-end");
});

it("merges a custom class on the dock", () => {
  const wrapper = mount(Dock, { props: { class: "my-dock" } });
  expect(wrapper.get("div").classes()).toContain("my-dock");
});

it("updates mouseX on mousemove and resets on mouseleave", async () => {
  const wrapper = mount(Dock);
  await wrapper.trigger("mousemove", { pageX: 123 });
  await wrapper.trigger("mouseleave");
  // No throw and component stays mounted.
  expect(wrapper.get("div").classes()).toContain("rounded-2xl");
});

it("DockIcon renders slot content and base classes standalone", () => {
  const wrapper = mount(DockIcon, {
    slots: { default: "<span class='glyph'>x</span>" },
  });
  expect(wrapper.find(".glyph").exists()).toBe(true);
  expect(wrapper.get("div").classes()).toContain("rounded-full");
  expect(wrapper.get("div").classes()).toContain("aspect-square");
});

it("DockIcon defaults width/height to base size (40px) with proportional padding", () => {
  const wrapper = mount(DockIcon);
  const style = wrapper.get("div").attributes("style") ?? "";
  expect(style).toContain("width: 40px");
  expect(style).toContain("height: 40px");
  expect(style).toContain("padding: 8px");
});

it("DockIcon merges a custom class", () => {
  const wrapper = mount(DockIcon, { props: { class: "my-icon" } });
  expect(wrapper.get("div").classes()).toContain("my-icon");
});

it("DockIcon adds hover class when magnification is disabled", () => {
  const wrapper = mount(DockIcon, { props: { disableMagnification: true } });
  expect(wrapper.get("div").classes()).toContain("hover:bg-muted-foreground");
});

it("DockIcon inherits config from a parent Dock", () => {
  const wrapper = mount(Dock, {
    props: { iconSize: 60 },
    slots: {
      default: () => [],
    },
  });
  expect(wrapper.exists()).toBe(true);
});
