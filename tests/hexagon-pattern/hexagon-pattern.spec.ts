// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import HexagonPattern from "../../docs/src/components/spark-ui/hexagon-pattern/hexagon-pattern.vue";

it("renders an svg with a userSpaceOnUse pattern", () => {
  const wrapper = mount(HexagonPattern);
  const svg = wrapper.get("svg");
  expect(svg.attributes("aria-hidden")).toBe("true");
  const pattern = wrapper.get("pattern");
  expect(pattern.attributes("patternUnits")).toBe("userSpaceOnUse");
});

it("applies base pattern styling and merges a custom class", () => {
  const wrapper = mount(HexagonPattern, { props: { class: "custom-mask" } });
  const classes = wrapper.get("svg").classes();
  expect(classes).toContain("absolute");
  expect(classes).toContain("fill-gray-400/30");
  expect(classes).toContain("stroke-gray-400/30");
  expect(classes).toContain("custom-mask");
});

it("renders solid polygons by default (solid stroke)", () => {
  const wrapper = mount(HexagonPattern);
  expect(wrapper.findAll("pattern polygon").length).toBeGreaterThan(0);
  expect(wrapper.findAll("pattern line").length).toBe(0);
});

it("renders dashed lines when strokeDasharray is not solid", () => {
  const wrapper = mount(HexagonPattern, { props: { strokeDasharray: "4 2" } });
  const lines = wrapper.findAll("pattern line");
  expect(lines.length).toBeGreaterThan(0);
  expect(lines[0]?.attributes("stroke-dasharray")).toBe("4 2");
  expect(wrapper.findAll("pattern polygon").length).toBe(0);
});

it("renders highlighted hexagons for provided coordinates", () => {
  const wrapper = mount(HexagonPattern, {
    props: { hexagons: [[1, 1], [2, 2]] },
  });
  // inner svg holds the highlighted polygons (outside the pattern defs)
  const highlighted = wrapper.findAll("svg svg polygon");
  expect(highlighted.length).toBe(2);
});

it("applies x and y offset to the pattern origin", () => {
  const wrapper = mount(HexagonPattern, { props: { x: -5, y: 3 } });
  const pattern = wrapper.get("pattern");
  expect(pattern.attributes("x")).toBe("-5");
  expect(pattern.attributes("y")).toBe("3");
});

it("changes tile geometry between horizontal and vertical directions", () => {
  const h = mount(HexagonPattern, { props: { direction: "horizontal" } });
  const v = mount(HexagonPattern, { props: { direction: "vertical" } });
  const hw = h.get("pattern").attributes("width");
  const vw = v.get("pattern").attributes("width");
  expect(hw).not.toBe(vw);
});
