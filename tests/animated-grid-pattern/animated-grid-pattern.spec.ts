// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it, vi } from "vite-plus/test";

vi.mock("../../docs/src/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.flat(Infinity).filter(Boolean).join(" "),
}));

const { default: AnimatedGridPattern } =
  await import("../../docs/src/components/spark-ui/animated-grid-pattern/animated-grid-pattern.vue");

it("renders the grid pattern svg with a defs pattern", () => {
  const wrapper = mount(AnimatedGridPattern, {
    props: { numSquares: 5, class: "custom-grid" },
  });

  const svg = wrapper.find("svg");
  expect(svg.exists()).toBe(true);
  expect(svg.attributes("aria-hidden")).toBe("true");
  expect(svg.classes()).toContain("custom-grid");

  const pattern = wrapper.find("pattern");
  expect(pattern.exists()).toBe(true);
  expect(pattern.attributes("width")).toBe("40");
  expect(pattern.attributes("height")).toBe("40");

  wrapper.unmount();
});
