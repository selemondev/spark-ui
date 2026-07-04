// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import Android from "../../docs/src/components/spark-ui/android/android.vue";

it("renders an svg with default dimensions", () => {
  const wrapper = mount(Android);
  const svg = wrapper.find("svg");
  expect(svg.exists()).toBe(true);
  expect(svg.attributes("width")).toBe("433");
  expect(svg.attributes("height")).toBe("882");
  expect(svg.attributes("viewBox")).toBe("0 0 433 882");
});

it("renders an image when src is provided", () => {
  const wrapper = mount(Android, {
    props: { src: "https://example.com/image.png" },
  });
  const image = wrapper.find("image");
  expect(image.exists()).toBe(true);
  expect(image.attributes("href")).toBe("https://example.com/image.png");
  expect(wrapper.find("video").exists()).toBe(false);
});

it("renders a video when videoSrc is provided", () => {
  const wrapper = mount(Android, {
    props: { videoSrc: "https://example.com/video.mp4" },
  });
  const video = wrapper.find("video");
  expect(video.exists()).toBe(true);
  expect(video.attributes("src")).toBe("https://example.com/video.mp4");
  expect(wrapper.find("image").exists()).toBe(false);
});

it("applies custom class and dimensions", () => {
  const wrapper = mount(Android, {
    props: { class: "size-full", width: 200, height: 400 },
  });
  const svg = wrapper.find("svg");
  expect(svg.classes()).toContain("size-full");
  expect(svg.attributes("width")).toBe("200");
  expect(svg.attributes("viewBox")).toBe("0 0 200 400");
});
