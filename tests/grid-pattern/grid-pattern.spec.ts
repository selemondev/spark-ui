// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import GridPattern from "../../docs/src/components/spark-ui/grid-pattern/grid-pattern.vue";

it("renders an accessible svg with base classes", () => {
  const wrapper = mount(GridPattern);
  const svg = wrapper.get("svg");
  expect(svg.attributes("aria-hidden")).toBe("true");
  expect(svg.classes()).toContain("pointer-events-none");
  expect(svg.classes()).toContain("fill-gray-400/30");
  expect(svg.classes()).toContain("stroke-gray-400/30");
});

it("applies default pattern dimensions and offsets", () => {
  const wrapper = mount(GridPattern);
  const pattern = wrapper.get("pattern");
  expect(pattern.attributes("width")).toBe("40");
  expect(pattern.attributes("height")).toBe("40");
  expect(pattern.attributes("x")).toBe("-1");
  expect(pattern.attributes("y")).toBe("-1");
});

it("builds the path from width/height", () => {
  const wrapper = mount(GridPattern, { props: { width: 30, height: 20 } });
  expect(wrapper.get("path").attributes("d")).toBe("M.5 20V.5H30");
});

it("passes strokeDasharray to the path", () => {
  const wrapper = mount(GridPattern, { props: { strokeDasharray: "4 2" } });
  expect(wrapper.get("path").attributes("stroke-dasharray")).toBe("4 2");
});

it("renders no squares by default", () => {
  const wrapper = mount(GridPattern);
  expect(wrapper.findAll("rect")).toHaveLength(1);
});

it("renders and positions filled squares", () => {
  const wrapper = mount(GridPattern, {
    props: { width: 40, height: 40, squares: [[4, 4], [5, 1]] },
  });
  const rects = wrapper.findAll("rect");
  // 1 background rect + 2 square rects
  expect(rects).toHaveLength(3);
  const first = rects[1]!;
  expect(first.attributes("width")).toBe("39");
  expect(first.attributes("height")).toBe("39");
  expect(first.attributes("x")).toBe("161");
  expect(first.attributes("y")).toBe("161");
});

it("merges a custom class", () => {
  const wrapper = mount(GridPattern, { props: { class: "my-mask" } });
  expect(wrapper.get("svg").classes()).toContain("my-mask");
});

it("gives each instance a unique pattern id referenced by fill", () => {
  const wrapper = mount(GridPattern);
  const id = wrapper.get("pattern").attributes("id");
  expect(id).toBeTruthy();
  expect(wrapper.get("rect").attributes("fill")).toBe(`url(#${id})`);
});
