// @vitest-environment jsdom
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import HyperText from "../../docs/src/components/spark-ui/hyper-text/hyper-text.vue";

type RafCallback = (time: number) => void;
let rafCallbacks: RafCallback[] = [];
let now = 0;

const setNow = (n: number) => {
  now = n;
};

beforeEach(() => {
  vi.useFakeTimers();
  rafCallbacks = [];
  now = 0;
  vi.stubGlobal("requestAnimationFrame", (cb: RafCallback) => {
    rafCallbacks.push(cb);
    return rafCallbacks.length;
  });
  vi.stubGlobal("cancelAnimationFrame", () => {});
  vi.spyOn(performance, "now").mockImplementation(() => now);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

// Run only the frames queued at call time. Draining newly scheduled frames in
// the same pass would loop forever, since the component reschedules a frame on
// every tick until `now` advances past the animation duration.
const drainRaf = () => {
  const pending = rafCallbacks;
  rafCallbacks = [];
  for (const cb of pending) {
    cb(now);
  }
};

it("renders the slot text split into per-character spans", () => {
  const wrapper = mount(HyperText, { slots: { default: "Hi" } });
  const spans = wrapper.findAll("span");
  expect(spans).toHaveLength(2);
});

it("accepts the text prop as an alternative to the slot", () => {
  const wrapper = mount(HyperText, { props: { text: "Yo" } });
  expect(wrapper.findAll("span")).toHaveLength(2);
});

it("applies base classes and merges a custom class", () => {
  const wrapper = mount(HyperText, {
    props: { text: "AB", class: "text-red-500" },
  });
  const el = wrapper.get("div");
  expect(el.classes()).toContain("overflow-hidden");
  expect(el.classes()).toContain("font-bold");
  expect(el.classes()).toContain("text-red-500");
});

it("renders as the requested element via the `as` prop", () => {
  const wrapper = mount(HyperText, { props: { text: "AB", as: "h1" } });
  expect(wrapper.find("h1").exists()).toBe(true);
});

it("resolves to the final text once the animation completes", async () => {
  const wrapper = mount(HyperText, { props: { text: "AB", duration: 800 } });
  // Fire the initial start timeout (delay = 0).
  vi.advanceTimersByTime(0);
  // First scramble frame at t=0.
  setNow(0);
  drainRaf();
  // Final frame past the duration -> text settles.
  setNow(1000);
  drainRaf();
  await flushPromises();
  expect(wrapper.text().replace(/\s+/g, "")).toBe("AB");
});

it("uppercases the resolved characters", async () => {
  const wrapper = mount(HyperText, { props: { text: "ab", duration: 800 } });
  vi.advanceTimersByTime(0);
  setNow(1000);
  drainRaf();
  await flushPromises();
  expect(wrapper.text().replace(/\s+/g, "")).toBe("AB");
});
