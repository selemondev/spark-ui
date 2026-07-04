# Android

A mockup of an Android device that can display an image or an autoplaying video inside its screen.

<demo src="../../src/example/android/demo.vue" srcCode="../../src/spark-ui-demos/android/android.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [android.vue]
<script setup lang="ts">
import { cn } from "@/lib/utils";

interface AndroidProps {
  class?: string;
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
  [key: string]: any;
}

const props = withDefaults(defineProps<AndroidProps>(), {
  width: 433,
  height: 882,
});
</script>

<template>
  <svg
    :width="props.width"
    :height="props.height"
    :viewBox="`0 0 ${props.width} ${props.height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="cn(props.class)"
  >
    <path
      d="M376 153H378C379.105 153 380 153.895 380 155V249C380 250.105 379.105 251 378 251H376V153Z"
      class="fill-[#E5E5E5] dark:fill-[#404040]"
    />
    <path
      d="M376 301H378C379.105 301 380 301.895 380 303V351C380 352.105 379.105 353 378 353H376V301Z"
      class="fill-[#E5E5E5] dark:fill-[#404040]"
    />
    <path
      d="M0 42C0 18.8041 18.804 0 42 0H336C359.196 0 378 18.804 378 42V788C378 811.196 359.196 830 336 830H42C18.804 830 0 811.196 0 788V42Z"
      class="fill-[#E5E5E5] dark:fill-[#404040]"
    />
    <path
      d="M2 43C2 22.0132 19.0132 5 40 5H338C358.987 5 376 22.0132 376 43V787C376 807.987 358.987 825 338 825H40C19.0132 825 2 807.987 2 787V43Z"
      class="fill-white dark:fill-[#262626]"
    />

    <g clip-path="url(#clip0_514_20855)">
      <path
        d="M9.25 48C9.25 29.3604 24.3604 14.25 43 14.25H335C353.64 14.25 368.75 29.3604 368.75 48V780C368.75 798.64 353.64 813.75 335 813.75H43C24.3604 813.75 9.25 798.64 9.25 780V48Z"
        class="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
      />
    </g>
    <circle cx="189" cy="28" r="9" class="fill-white dark:fill-[#262626]" />
    <circle cx="189" cy="28" r="4" class="fill-[#E5E5E5] dark:fill-[#404040]" />
    <image
      v-if="props.src"
      :href="props.src"
      width="360"
      height="800"
      class="size-full object-cover"
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#clip0_514_20855)"
    />
    <foreignObject
      v-if="props.videoSrc"
      width="380"
      height="820"
      clip-path="url(#clip0_514_20855)"
      preserveAspectRatio="xMidYMid slice"
    >
      <video class="size-full object-cover" :src="props.videoSrc" autoplay loop muted playsinline />
    </foreignObject>
    <defs>
      <clipPath id="clip0_514_20855">
        <rect
          width="360"
          height="800"
          rx="33"
          ry="25"
          class="fill-white dark:fill-[#262626]"
          transform="translate(9 14)"
        />
      </clipPath>
    </defs>
  </svg>
</template>
```

:::

## Usage

```vue
<script setup lang="ts">
import Android from "@/components/spark-ui/android/android.vue";
</script>

<template>
  <Android class="size-full" />
</template>
```

## Examples

### With Image

<demo src="../../src/example/android/image-demo.vue" srcCode="../../src/spark-ui-demos/android/image-android.vue" />

### With Video

<demo src="../../src/example/android/video-demo.vue" srcCode="../../src/spark-ui-demos/android/video-android.vue" />

## Props

| Prop       | Type     | Default | Description                          |
| ---------- | -------- | ------- | ------------------------------------ |
| `class`    | `string` | `-`     | The class to apply to the component. |
| `width`    | `number` | `433`   | The width of the Android window.     |
| `height`   | `number` | `882`   | The height of the Android window.    |
| `src`      | `string` | `-`     | The source of the image to display.  |
| `videoSrc` | `string` | `-`     | The source of the video to display.  |

The `Android` component also accepts all attributes of the `SVGElement` type.
