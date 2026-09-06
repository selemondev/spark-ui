// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import { h, nextTick, ref } from "vue";
import TypingAnimation from "../../docs/src/example/terminal/typing-animation.vue";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

it("retypes changed slot text and cancels delayed work when removed", async () => {
  const text = ref("First");
  const wrapper = mount(() =>
    h(
      TypingAnimation,
      { duration: 10, delay: 30 },
      {
        default: () => h("span", text.value),
      },
    ),
  );
  expect(wrapper.text()).toBe("");
  await vi.advanceTimersByTimeAsync(100);
  expect(wrapper.text()).toBe("First");
  text.value = "Latest";
  await nextTick();
  expect(wrapper.text()).toBe("");
  await vi.advanceTimersByTimeAsync(100);
  expect(wrapper.text()).toBe("Latest");
  text.value = "Pending";
  await nextTick();
  wrapper.unmount();
  expect(vi.getTimerCount()).toBe(0);
});
