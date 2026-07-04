// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import DottedMap from "../../docs/src/components/spark-ui/dotted-map/dotted-map.vue";

const seoul = { lat: 37.5665, lng: 126.978, size: 2.8 };

it("renders an svg with the default viewBox and dot points", () => {
  const wrapper = mount(DottedMap);
  const svg = wrapper.get("svg");
  expect(svg.attributes("viewBox")).toBe("0 0 150 75");
  expect(wrapper.findAll("circle").length).toBeGreaterThan(0);
});

it("applies a custom viewBox for width/height and the base dot color class", () => {
  const wrapper = mount(DottedMap, { props: { width: 100, height: 50 } });
  const svg = wrapper.get("svg");
  expect(svg.attributes("viewBox")).toBe("0 0 100 50");
  expect(svg.classes()).toContain("text-gray-500");
});

it("uses the provided dotRadius and dotColor for map dots", () => {
  const wrapper = mount(DottedMap, {
    props: { dotRadius: 0.5, dotColor: "red", mapSamples: 500 },
  });
  const circle = wrapper.get("circle");
  expect(circle.attributes("r")).toBe("0.5");
  expect(circle.attributes("fill")).toBe("red");
});

it("renders markers filled with markerColor", () => {
  const wrapper = mount(DottedMap, {
    props: { markers: [seoul], markerColor: "#00ff00" },
  });
  const markerCircle = wrapper
    .findAll("circle")
    .find((c) => c.attributes("fill") === "#00ff00");
  expect(markerCircle).toBeTruthy();
});

it("does not render pulse animations by default", () => {
  const wrapper = mount(DottedMap, { props: { markers: [seoul] } });
  expect(wrapper.findAll("animate").length).toBe(0);
});

it("renders pulse animations when pulse is enabled", () => {
  const wrapper = mount(DottedMap, {
    props: { markers: [seoul], pulse: true },
  });
  expect(wrapper.findAll("animate").length).toBeGreaterThan(0);
});

it("opts a marker out of pulsing via marker.pulse === false", () => {
  const wrapper = mount(DottedMap, {
    props: { markers: [{ ...seoul, pulse: false }], pulse: true },
  });
  expect(wrapper.findAll("animate").length).toBe(0);
});

it("pulses only opted-in markers when pulse is off", () => {
  const wrapper = mount(DottedMap, {
    props: { markers: [{ ...seoul, pulse: true }] },
  });
  expect(wrapper.findAll("animate").length).toBeGreaterThan(0);
});

it("exposes marker slot props for custom overlays", () => {
  const wrapper = mount(DottedMap, {
    props: { markers: [seoul] },
    slots: {
      marker: `<template #marker="{ label }"><text class="overlay">x</text></template>`,
    },
  });
  expect(wrapper.find(".overlay").exists()).toBe(true);
});

it("merges a custom class onto the svg", () => {
  const wrapper = mount(DottedMap, { props: { class: "my-map" } });
  expect(wrapper.get("svg").classes()).toContain("my-map");
});
