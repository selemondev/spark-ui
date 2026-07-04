// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it, vi } from "vite-plus/test";
import GlyphMatrix from "../../docs/src/components/spark-ui/glyph-matrix/glyph-matrix.vue";

// jsdom has no canvas 2d context; stub it so onMounted logic runs without error.
function stubCanvas() {
  const ctx = {
    fillStyle: "",
    font: "",
    textBaseline: "",
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    getImageData: vi.fn(() => ({ data: [0, 0, 0, 255] })),
  };
  const CanvasProto = (globalThis as unknown as { HTMLCanvasElement: { prototype: object } })
    .HTMLCanvasElement.prototype;
  vi.spyOn(CanvasProto as { getContext: () => unknown }, "getContext").mockReturnValue(ctx);
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.stubGlobal("requestAnimationFrame", () => 0);
  vi.stubGlobal("cancelAnimationFrame", () => {});
  return ctx;
}

it("renders a canvas element", () => {
  stubCanvas();
  const wrapper = mount(GlyphMatrix);
  expect(wrapper.find("canvas").exists()).toBe(true);
});

it("marks the canvas as decorative and non-interactive", () => {
  stubCanvas();
  const wrapper = mount(GlyphMatrix);
  const canvas = wrapper.get("canvas");
  expect(canvas.attributes("aria-hidden")).toBe("true");
  expect(canvas.classes()).toContain("pointer-events-none");
});

it("merges a custom class", () => {
  stubCanvas();
  const wrapper = mount(GlyphMatrix, { props: { class: "my-custom" } });
  expect(wrapper.get("canvas").classes()).toContain("my-custom");
});

it("resolves the color prop through the canvas probe", () => {
  const ctx = stubCanvas();
  mount(GlyphMatrix, { props: { color: "#ffffff" } });
  // resolveColor seeds the fallback then assigns the color and samples a pixel.
  expect(ctx.getImageData).toHaveBeenCalled();
});
