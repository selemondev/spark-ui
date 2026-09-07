// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import IconCloud from "../../docs/src/components/spark-ui/icon-cloud/icon-cloud.vue";

// The root tsconfig omits the DOM lib, so reach globals through globalThis.
const g = globalThis as unknown as Record<string, unknown> & {
  HTMLCanvasElement: { prototype: { getContext: unknown } };
  document: { createElement: (tag: string) => unknown };
};

const raf = vi.fn((_callback: () => void) => 1);
const caf = vi.fn();
const scales = vi.fn();

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
    scale: scales,
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
  scales.mockClear();
});

it("projects an icon's depth after vertical keyboard rotation", async () => {
  const wrapper = mount(IconCloud);
  try {
    const initialScale = scales.mock.calls[0]![0];
    scales.mockClear();
    for (let i = 0; i < 10; i++) {
      await wrapper.get("canvas").trigger("keydown", { key: "ArrowDown" });
    }
    raf.mock.calls.at(-1)?.[0]();
    expect(scales.mock.calls[0]![0]).toBeGreaterThan(initialScale + 0.25);
  } finally {
    wrapper.unmount();
  }
});

it("starts the animation loop on mount and cancels it on unmount", () => {
  const wrapper = mount(IconCloud, { props: { images: ["/a.png", "/b.png"] } });
  expect(raf).toHaveBeenCalled();

  wrapper.unmount();
  expect(caf).toHaveBeenCalled();
});
