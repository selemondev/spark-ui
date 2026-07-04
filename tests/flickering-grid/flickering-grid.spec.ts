// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { beforeAll, expect, it, vi } from "vite-plus/test";
import FlickeringGrid from "../../docs/src/components/spark-ui/flickering-grid/flickering-grid.vue";

beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("requestAnimationFrame", () => 0);
  vi.stubGlobal("cancelAnimationFrame", () => {});
  const canvasProto = (globalThis as unknown as { HTMLCanvasElement: { prototype: { getContext: unknown } } }).HTMLCanvasElement.prototype;
  canvasProto.getContext = vi.fn(() => ({
    fillStyle: "",
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: [0, 0, 0, 255] }),
  }));
});

it("renders a container and a canvas", () => {
  const wrapper = mount(FlickeringGrid);
  expect(wrapper.find("canvas").exists()).toBe(true);
});

it("applies base container classes and merges a custom class", () => {
  const wrapper = mount(FlickeringGrid, { props: { class: "my-grid" } });
  const container = wrapper.get("div");
  expect(container.classes()).toContain("h-full");
  expect(container.classes()).toContain("w-full");
  expect(container.classes()).toContain("my-grid");
});

it("marks the canvas as non-interactive", () => {
  const wrapper = mount(FlickeringGrid);
  expect(wrapper.get("canvas").classes()).toContain("pointer-events-none");
});

it("accepts flicker configuration props without error", () => {
  const wrapper = mount(FlickeringGrid, {
    props: {
      squareSize: 8,
      gridGap: 2,
      flickerChance: 0.5,
      color: "#60A5FA",
      maxOpacity: 0.5,
      width: 200,
      height: 100,
    },
  });
  expect(wrapper.find("canvas").exists()).toBe(true);
});
