// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it, vi } from "vite-plus/test";
import Confetti from "../../docs/src/components/spark-ui/confetti/confetti.vue";
import ConfettiButton from "../../docs/src/components/spark-ui/confetti/confetti-button.vue";

// The component resolves "canvas-confetti" from the docs workspace, so the
// mock has to target the same resolved module.
vi.mock("../../docs/node_modules/canvas-confetti", () => {
  const instance = vi.fn(() => Promise.resolve());
  (instance as unknown as { reset: () => void }).reset = vi.fn();
  const create = vi.fn(() => instance);
  const confettiFn = vi.fn(() => Promise.resolve());
  (confettiFn as unknown as { create: typeof create }).create = create;
  return { default: confettiFn };
});

interface MockFn {
  (...args: unknown[]): Promise<unknown>;
  mock: { calls: unknown[][]; results: { value: MockFn }[] };
  mockClear: () => void;
  reset: MockFn;
  create: MockFn;
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

async function getConfetti() {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error - resolved from the docs workspace, no bundled types here
  const mod = await import("../../docs/node_modules/canvas-confetti");
  return (mod as unknown as { default: MockFn }).default;
}

function firstResult(fn: MockFn): MockFn {
  const result = fn.mock.results[0];
  if (!result) throw new Error("expected confetti.create to have been called");
  return result.value;
}

it("creates a confetti instance on mount and fires automatically", async () => {
  const confetti = await getConfetti();
  confetti.create.mockClear();

  const wrapper = mount(Confetti);
  await flush();

  expect(confetti.create).toHaveBeenCalledTimes(1);
  expect(wrapper.find("canvas").exists()).toBe(true);

  const instance = firstResult(confetti.create);
  expect(instance).toHaveBeenCalledTimes(1);
});

it("does not fire automatically when manualstart is true", async () => {
  const confetti = await getConfetti();
  confetti.create.mockClear();

  mount(Confetti, { props: { manualstart: true } });
  await flush();

  expect(confetti.create).toHaveBeenCalledTimes(1);
  const instance = firstResult(confetti.create);
  expect(instance).not.toHaveBeenCalled();
});

it("exposes a fire method that merges default options with call options", async () => {
  const confetti = await getConfetti();
  confetti.create.mockClear();

  const wrapper = mount(Confetti, {
    props: { manualstart: true, options: { particleCount: 10 } },
  });
  await flush();

  const instance = firstResult(confetti.create);
  instance.mockClear();

  (wrapper.vm as unknown as { fire: (o?: object) => void }).fire({ spread: 90 });
  await flush();

  expect(instance).toHaveBeenCalledWith({ particleCount: 10, spread: 90 });
});

it("passes globalOptions to confetti.create with resize forced on", async () => {
  const confetti = await getConfetti();
  confetti.create.mockClear();

  mount(Confetti, {
    props: { manualstart: true, globalOptions: { useWorker: false } },
  });
  await flush();

  const createArg = confetti.create.mock.calls[0]?.[1];
  expect(createArg).toMatchObject({
    useWorker: false,
    resize: true,
  });
});

it("resets the instance on unmount", async () => {
  const confetti = await getConfetti();
  confetti.create.mockClear();

  const wrapper = mount(Confetti, { props: { manualstart: true } });
  await flush();

  const instance = firstResult(confetti.create);
  instance.reset.mockClear();

  wrapper.unmount();
  expect(instance.reset).toHaveBeenCalledTimes(1);
});

it("ConfettiButton renders slot content and fires confetti with a computed origin on click", async () => {
  const confetti = await getConfetti();
  confetti.mockClear();

  const wrapper = mount(ConfettiButton, {
    props: { options: { particleCount: 20 } },
    slots: { default: "Fire 🎉" },
  });

  expect(wrapper.find("button").text()).toContain("Fire");

  await wrapper.find("button").trigger("click");
  await flush();

  expect(confetti).toHaveBeenCalledTimes(1);
  const arg = confetti.mock.calls[0]?.[0] as {
    particleCount: number;
    origin: { x: number; y: number };
  };
  expect(arg.particleCount).toBe(20);
  expect(arg.origin).toHaveProperty("x");
  expect(arg.origin).toHaveProperty("y");
});
