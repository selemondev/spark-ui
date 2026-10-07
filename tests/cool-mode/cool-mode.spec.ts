/// <reference lib="dom" />
// @vitest-environment jsdom
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import { h, nextTick, reactive } from "vue";
import CoolMode from "../../docs/src/components/spark-ui/cool-mode/cool-mode.vue";

enableAutoUnmount(afterEach);
const frames = new Map<number, FrameRequestCallback>();
let frameId = 0;
let now = 0;
beforeEach(() => {
  frames.clear();
  now = 0;
  vi.spyOn(performance, "now").mockImplementation(() => now);
  vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation((callback) => {
    frames.set(++frameId, callback);
    return frameId;
  });
  vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation((id) => {
    frames.delete(id);
  });
});
afterEach(() => {
  vi.restoreAllMocks();
});
function advanceFrame() {
  now += 40;
  const callbacks = [...frames.values()];
  frames.clear();
  for (const callback of callbacks) callback(now);
}

it("keeps another instance's particles usable after an idle owner unmounts", async () => {
  const idle = mount(CoolMode);
  const active = mount(CoolMode, { props: { options: { particle: "/active.png" } } });
  idle.unmount();
  await active.get("span").trigger("pointerdown", { clientX: 40, clientY: 40 });
  advanceFrame();
  expect(document.querySelector('img[src="/active.png"]')).not.toBeNull();
  active.unmount();
  advanceFrame();
  expect(document.querySelector('img[src="/active.png"]')).toBeNull();
  expect(frames.size).toBe(0);
});

it("honors the particle cap and zero launch speeds while held", async () => {
  const wrapper = mount(CoolMode, {
    props: {
      options: { particle: "/limited.png", particleCount: 1, size: 20, speedHorz: 0, speedUp: 0 },
    },
  });
  await wrapper.get("span").trigger("pointerdown", { clientX: 50, clientY: 50 });
  advanceFrame();
  const particle = document.querySelector('img[src="/limited.png"]')?.parentElement;
  expect(particle?.style.left).toBe("40px");
  expect(particle?.style.top).toBe("40px");
  advanceFrame();
  advanceFrame();
  expect(document.querySelectorAll('img[src="/limited.png"]')).toHaveLength(1);
});

it("reads replacement particle options and stops generating after pointer cancellation", async () => {
  const props = reactive({ options: { particle: "/before.png" } });
  const wrapper = mount(() => h(CoolMode, props));
  await wrapper.get("span").trigger("pointerdown", { clientX: 50, clientY: 50 });
  advanceFrame();
  props.options = { particle: "/after.png" };
  await nextTick();
  advanceFrame();
  expect(document.querySelector('img[src="/before.png"]')).not.toBeNull();
  expect(document.querySelector('img[src="/after.png"]')).not.toBeNull();
  window.dispatchEvent(new Event("pointercancel"));
  advanceFrame();
  expect(document.querySelectorAll('img[src="/after.png"]')).toHaveLength(1);
});

it("confines particles to the container element with container-relative coordinates", async () => {
  const area = document.createElement("div");
  document.body.appendChild(area);
  Object.defineProperty(area, "scrollHeight", { value: 300 });
  vi.spyOn(area, "getBoundingClientRect").mockReturnValue(new DOMRect(100, 200, 300, 300));
  const wrapper = mount(CoolMode, {
    props: {
      container: area,
      options: { particle: "/contained.png", particleCount: 1, size: 20, speedHorz: 0, speedUp: 0 },
    },
  });
  const overlay = area.querySelector<HTMLElement>("[data-cool-mode-effect]");
  expect(overlay?.style.position).toBe("absolute");
  expect(document.body.querySelector(":scope > [data-cool-mode-effect]")).toBeNull();
  await wrapper.get("span").trigger("pointerdown", { clientX: 150, clientY: 260 });
  advanceFrame();
  const particle = overlay?.querySelector('img[src="/contained.png"]')?.parentElement;
  expect(particle?.style.left).toBe("40px");
  expect(particle?.style.top).toBe("50px");
  wrapper.unmount();
  expect(area.querySelector("[data-cool-mode-effect]")).toBeNull();
  area.remove();
});
