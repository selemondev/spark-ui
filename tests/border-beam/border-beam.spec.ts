// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import BorderBeam from "../../docs/src/components/spark-ui/border-beam/border-beam.vue";

it("renders the animated beam element with defaults", () => {
  const wrapper = mount(BorderBeam);
  const beam = wrapper.get(".animate-border-beam");

  expect(beam.attributes("style")).toContain("--duration: 6");
  expect(beam.attributes("style")).toContain("width: 50px");
  expect(beam.attributes("style")).toContain("animation-direction: normal");
});

it("reverses the animation direction and forwards custom props", () => {
  const wrapper = mount(BorderBeam, {
    props: { reverse: true, size: 120, colorFrom: "#fff", initialOffset: 20, class: "via-red-500" },
  });
  const beam = wrapper.get(".animate-border-beam");
  const style = beam.attributes("style") ?? "";

  expect(style).toContain("animation-direction: reverse");
  expect(style).toContain("width: 120px");
  expect(style).toContain("--color-from: #fff");
  expect(style).toContain("--initial-offset: 20");
  expect(beam.classes()).toContain("via-red-500");
});
