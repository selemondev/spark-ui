// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import Iphone from "../../docs/src/components/spark-ui/iphone/iphone.vue";

it("renders the frame svg with the iPhone aspect ratio and no media by default", () => {
  const wrapper = mount(Iphone);
  const svg = wrapper.find("svg");
  expect(svg.exists()).toBe(true);
  expect(svg.attributes("viewBox")).toBe("0 0 433 882");
  expect(wrapper.element.getAttribute("style") ?? "").toContain(
    "aspect-ratio: 433/882",
  );
  expect(wrapper.find("img").exists()).toBe(false);
  expect(wrapper.find("video").exists()).toBe(false);
  // Frame group has no mask when there is no media.
  expect(wrapper.find("g").attributes("mask")).toBeUndefined();
});

it("renders an image and masks the screen when src is provided", () => {
  const wrapper = mount(Iphone, {
    props: { src: "https://example.com/image.png" },
  });
  const img = wrapper.find("img");
  expect(img.exists()).toBe(true);
  expect(img.attributes("src")).toBe("https://example.com/image.png");
  expect(wrapper.find("video").exists()).toBe(false);
  expect(wrapper.find("g").attributes("mask")).toBe("url(#screenPunch)");
});

it("renders a muted autoplay video when videoSrc is provided", () => {
  const wrapper = mount(Iphone, {
    props: { videoSrc: "https://example.com/video.mp4" },
  });
  const video = wrapper.find("video");
  expect(video.exists()).toBe(true);
  expect(video.attributes("src")).toBe("https://example.com/video.mp4");
  expect(wrapper.find("img").exists()).toBe(false);
  expect(wrapper.find("g").attributes("mask")).toBe("url(#screenPunch)");
});

it("prefers video over image when both are provided", () => {
  const wrapper = mount(Iphone, {
    props: {
      src: "https://example.com/image.png",
      videoSrc: "https://example.com/video.mp4",
    },
  });
  expect(wrapper.find("video").exists()).toBe(true);
  expect(wrapper.find("img").exists()).toBe(false);
});

it("merges a custom class onto the wrapper", () => {
  const wrapper = mount(Iphone, { props: { class: "h-full w-auto" } });
  expect(wrapper.classes()).toContain("h-full");
  expect(wrapper.classes()).toContain("w-auto");
  // twMerge drops the base w-full in favor of w-auto.
  expect(wrapper.classes()).not.toContain("w-full");
});
