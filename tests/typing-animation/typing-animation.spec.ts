// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, expect, it, vi } from "vite-plus/test";
import { createSSRApp, h, nextTick, reactive } from "vue";
import { renderToString } from "vue/server-renderer";
import TypingAnimation from "../../docs/src/components/spark-ui/typing-animation/typing-animation.vue";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.useRealTimers();
});

it("restarts with the latest text and pace without showing the complete text first", async () => {
  const props = reactive({ text: "FIRST", duration: 100 });
  const wrapper = mount(() => h(TypingAnimation, props));
  expect(wrapper.text()).toBe("");
  await vi.advanceTimersByTimeAsync(100);
  expect(wrapper.text()).toBe("F");
  props.text = "SECOND";
  props.duration = 20;
  await nextTick();
  expect(wrapper.text()).toBe("");
  await vi.advanceTimersByTimeAsync(120);
  expect(wrapper.text()).toBe("SECOND");
  props.text = "LONG PENDING TEXT";
  props.duration = 1000;
  await nextTick();
  wrapper.unmount();
  expect(vi.getTimerCount()).toBe(0);
});

it("does not start a typing timer during server rendering", async () => {
  const app = createSSRApp(TypingAnimation, { text: "Server text", duration: 100 });
  await renderToString(app);
  expect(vi.getTimerCount()).toBe(0);
});
