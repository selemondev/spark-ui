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
