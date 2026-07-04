// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import IconCloud from "../../docs/src/components/spark-ui/icon-cloud/icon-cloud.vue";

// The root tsconfig omits the DOM lib, so reach globals through globalThis.
const g = globalThis as unknown as Record<string, unknown> & {
  HTMLCanvasElement: { prototype: { getContext: unknown } };
  document: { createElement: (tag: string) => unknown };
};

const raf = vi.fn(() => 1);
const caf = vi.fn();

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", raf);
  vi.stubGlobal("cancelAnimationFrame", caf);
  // jsdom canvas has no 2d context; provide a minimal stub.
  g.HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    closePath: vi.fn(),
    clip: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    fill: vi.fn(),
    fillText: vi.fn(),
    fillStyle: "",
    globalAlpha: 1,
    textAlign: "",
    textBaseline: "",
    font: "",
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
  raf.mockClear();
  caf.mockClear();
});

it("renders an accessible canvas with default dimensions", () => {
  const wrapper = mount(IconCloud);
  const canvas = wrapper.get("canvas");

  expect(canvas.attributes("role")).toBe("img");
  expect(canvas.attributes("aria-label")).toBe("Interactive 3D Icon Cloud");
  expect(canvas.attributes("width")).toBe("400");
  expect(canvas.attributes("height")).toBe("400");
  expect(canvas.classes()).toContain("rounded-lg");
});

it("merges a custom class onto the canvas", () => {
  const wrapper = mount(IconCloud, { props: { class: "border-red-500" } });
  expect(wrapper.get("canvas").classes()).toContain("border-red-500");
});

it("starts the animation loop on mount and cancels it on unmount", () => {
  const wrapper = mount(IconCloud, { props: { images: ["/a.png", "/b.png"] } });
  expect(raf).toHaveBeenCalled();

  wrapper.unmount();
  expect(caf).toHaveBeenCalled();
});

it("builds an offscreen canvas per image", () => {
  const createSpy = vi.spyOn(g.document, "createElement");
  mount(IconCloud, { props: { images: ["/a.png", "/b.png", "/c.png"] } });

  // One offscreen canvas per image (plus the component's own rendered canvas).
  const canvasCreations = createSpy.mock.calls.filter(([tag]) => tag === "canvas");
  expect(canvasCreations.length).toBeGreaterThanOrEqual(3);
  createSpy.mockRestore();
});
