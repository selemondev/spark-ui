// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import InteractiveGridPattern from "../../docs/src/components/spark-ui/interactive-grid-pattern/interactive-grid-pattern.vue";

it("renders the default 24x24 grid of squares", () => {
  const wrapper = mount(InteractiveGridPattern);
  expect(wrapper.findAll("rect").length).toBe(24 * 24);
});

it("sizes the svg from width/height and squares", () => {
  const wrapper = mount(InteractiveGridPattern, {
    props: { width: 20, height: 10, squares: [5, 3] },
  });
  const svg = wrapper.get("svg");
  expect(svg.attributes("width")).toBe("100");
  expect(svg.attributes("height")).toBe("30");
  expect(wrapper.findAll("rect").length).toBe(15);
});

it("positions squares in a row-major layout", () => {
  const wrapper = mount(InteractiveGridPattern, {
    props: { width: 40, height: 40, squares: [2, 2] },
  });
  const rects = wrapper.findAll("rect");
  // index 0 -> (0,0), index 1 -> (40,0), index 2 -> (0,40), index 3 -> (40,40)
  expect(rects[1]?.attributes("x")).toBe("40");
  expect(rects[1]?.attributes("y")).toBe("0");
  expect(rects[2]?.attributes("x")).toBe("0");
  expect(rects[2]?.attributes("y")).toBe("40");
});

it("merges a custom class onto the svg", () => {
  const wrapper = mount(InteractiveGridPattern, { props: { class: "custom-mask" } });
  const classes = wrapper.get("svg").classes();
  expect(classes).toContain("absolute");
  expect(classes).toContain("custom-mask");
});

it("applies squaresClassName to each square", () => {
  const wrapper = mount(InteractiveGridPattern, {
    props: { squares: [2, 2], squaresClassName: "hover:fill-blue-500" },
  });
  expect(wrapper.get("rect").classes()).toContain("hover:fill-blue-500");
});

it("highlights only the hovered square", async () => {
  const wrapper = mount(InteractiveGridPattern, { props: { squares: [2, 2] } });
  const rects = wrapper.findAll("rect");
  await rects[1]?.trigger("mouseenter");
  expect(rects[1]?.classes()).toContain("fill-gray-300/30");
  expect(rects[0]?.classes()).toContain("fill-transparent");
  await rects[1]?.trigger("mouseleave");
  expect(rects[1]?.classes()).toContain("fill-transparent");
});
