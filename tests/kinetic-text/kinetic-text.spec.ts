// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import KineticText from "../../docs/src/components/spark-ui/kinetic-text/kinetic-text.vue";

it("renders one span per character plus an sr-only copy", () => {
  const wrapper = mount(KineticText, { props: { text: "abc" } });
  const chars = wrapper.findAll(".kinetic-text__char");
  expect(chars).toHaveLength(3);
  expect(chars.map((c) => c.text()).join("")).toBe("abc");
  expect(wrapper.find(".sr-only").text()).toBe("abc");
});

it("renders as an h1 by default", () => {
  const wrapper = mount(KineticText, { props: { text: "hi" } });
  expect(wrapper.element.tagName).toBe("H1");
});

it("respects the `as` prop", () => {
  const wrapper = mount(KineticText, { props: { text: "hi", as: "span" } });
  expect(wrapper.element.tagName).toBe("SPAN");
});

it("renders spaces as non-breaking spaces", () => {
  const wrapper = mount(KineticText, { props: { text: "a b" } });
  const chars = wrapper.findAll(".kinetic-text__char");
  expect(chars).toHaveLength(3);
  expect(chars[1]!.element.textContent).toBe("\u00A0");
});

it("marks per-character spans as aria-hidden", () => {
  const wrapper = mount(KineticText, { props: { text: "x" } });
  expect(wrapper.find(".kinetic-text__char").attributes("aria-hidden")).toBe(
    "true",
  );
});

it("merges a custom class onto the wrapper", () => {
  const wrapper = mount(KineticText, {
    props: { text: "x", class: "my-custom text-[5rem]" },
  });
  expect(wrapper.classes()).toContain("my-custom");
  expect(wrapper.classes()).toContain("kinetic-text");
});
