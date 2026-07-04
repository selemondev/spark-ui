// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import { expect, it } from "vite-plus/test";
import AnimatedCircularProgressBar from "../../docs/src/components/spark-ui/animated-circular-progress-bar/animated-circular-progress-bar.vue";

it("renders the rounded current percent for the given value range", () => {
  const wrapper = mount(AnimatedCircularProgressBar, {
    props: {
      value: 25,
      max: 100,
      min: 0,
      gaugePrimaryColor: "rgb(79 70 229)",
      gaugeSecondaryColor: "rgba(0, 0, 0, 0.1)",
    },
  });

  const label = wrapper.get("[data-current-value]");
  expect(label.text()).toBe("25");
  expect(label.attributes("data-current-value")).toBe("25");
});

it("updates the percent reactively when value changes", async () => {
  const wrapper = mount(AnimatedCircularProgressBar, {
    props: {
      value: 0,
      gaugePrimaryColor: "rgb(79 70 229)",
      gaugeSecondaryColor: "rgba(0, 0, 0, 0.1)",
    },
  });

  expect(wrapper.get("[data-current-value]").text()).toBe("0");
  await wrapper.setProps({ value: 60 } as never);
  expect(wrapper.get("[data-current-value]").text()).toBe("60");
});

it("hides the secondary track when current percent exceeds 90", () => {
  const wrapper = mount(AnimatedCircularProgressBar, {
    props: {
      value: 100,
      gaugePrimaryColor: "rgb(79 70 229)",
      gaugeSecondaryColor: "rgba(0, 0, 0, 0.1)",
    },
  });

  expect(wrapper.findAll("circle")).toHaveLength(1);
});
