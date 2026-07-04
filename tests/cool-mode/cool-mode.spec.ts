/// <reference lib="dom" />
// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import CoolMode from "../../docs/src/components/spark-ui/cool-mode/cool-mode.vue";

type LoopCallback = (time: number) => void;

const tapEvent = "ontouchstart" in window ? "touchstart" : "mousedown";

const press = (el: ReturnType<ReturnType<typeof mount>["find"]>, x: number, y: number) =>
  el.trigger(tapEvent, { clientX: x, clientY: y, touches: [{ clientX: x, clientY: y }] });

let rafSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  // Keep the animation loop from running indefinitely under jsdom.
  rafSpy = vi.spyOn(globalThis, "requestAnimationFrame").mockReturnValue(1 as unknown as number);
  vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(() => 0 as unknown as void);
});

afterEach(() => {
  vi.restoreAllMocks();
  document.getElementById("_coolMode_effect")?.remove();
});

it("renders its slot inside a span wrapper", () => {
  const wrapper = mount(CoolMode, {
    slots: { default: "<button>Click Me!</button>" },
  });

  const span = wrapper.find("span");
  expect(span.exists()).toBe(true);
  expect(span.find("button").text()).toBe("Click Me!");
});

it("creates the fixed effect container on mount", () => {
  mount(CoolMode, { slots: { default: "<button>Go</button>" } });

  const container = document.getElementById("_coolMode_effect");
  expect(container).not.toBeNull();
  expect(container?.getAttribute("style")).toContain("pointer-events:none");
});

it("starts the animation loop on mount", () => {
  mount(CoolMode, { slots: { default: "<button>Go</button>" } });
  expect(rafSpy).toHaveBeenCalled();
});

it("spawns a circle particle while pressed", async () => {
  const wrapper = mount(CoolMode, {
    attachTo: document.body,
    slots: { default: "<button>Go</button>" },
  });

  const nowSpy = vi.spyOn(performance, "now");
  nowSpy.mockReturnValue(1000);

  // Press to enable auto-adding particles.
  await press(wrapper.find("span"), 10, 10);

  // Drive one loop iteration manually.
  const loop = rafSpy.mock.calls[0][0] as LoopCallback;
  loop(0);

  const container = document.getElementById("_coolMode_effect");
  expect(container?.querySelector("svg circle")).not.toBeNull();

  nowSpy.mockRestore();
  wrapper.unmount();
});

it("renders an image particle when given a URL option", async () => {
  const wrapper = mount(CoolMode, {
    attachTo: document.body,
    props: { options: { particle: "https://example.com/avatar.png" } },
    slots: { default: "<button>Go</button>" },
  });

  vi.spyOn(performance, "now").mockReturnValue(1000);
  await press(wrapper.find("span"), 5, 5);

  const loop = rafSpy.mock.calls[0][0] as LoopCallback;
  loop(0);

  const container = document.getElementById("_coolMode_effect");
  const img = container?.querySelector("img");
  expect(img).not.toBeNull();
  expect(img?.getAttribute("src")).toBe("https://example.com/avatar.png");

  wrapper.unmount();
});

it("removes listeners on unmount without error", () => {
  const wrapper = mount(CoolMode, { slots: { default: "<button>Go</button>" } });
  expect(() => wrapper.unmount()).not.toThrow();
});
