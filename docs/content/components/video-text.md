# Video Text

Play a video inside the shapes of your text.

<demo src="../../src/example/video-text/demo.vue" srcCode="../../src/spark-ui-demos/video-text/demo.vue" />

## Installation

Copy the component below into `src/components/spark-ui/video-text/video-text.vue`.

::: code-group

```vue [video-text.vue]
<script setup lang="ts">
import { Comment, isVNode, useSlots } from "vue";

interface VideoTextProps {
  src: string;
  as?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
}
const props = withDefaults(defineProps<VideoTextProps>(), {
  as: "div",
  autoPlay: true,
  muted: true,
  loop: true,
  preload: "auto",
  fontSize: 20,
  fontWeight: "bold",
  textAnchor: "middle",
  dominantBaseline: "middle",
  fontFamily: "sans-serif",
});
const slots = useSlots();
function textContent(nodes: unknown[]): string {
  return nodes
    .map((node): string => {
      if (typeof node === "string" || typeof node === "number") return String(node);
      if (Array.isArray(node)) return textContent(node);
      if (isVNode(node) && node.type !== Comment) {
        return Array.isArray(node.children)
          ? textContent(node.children)
          : typeof node.children === "string"
            ? node.children
            : "";
      }
      return "";
    })
    .join("");
}
function escapeXml(value: string | number): string {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );
}
function maskStyle() {
  const size = typeof props.fontSize === "number" ? `${props.fontSize}vw` : props.fontSize;
  const content = textContent(slots.default?.() ?? []);
  const mask = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" font-size="${escapeXml(size)}" font-weight="${escapeXml(props.fontWeight)}" text-anchor="${escapeXml(props.textAnchor)}" dominant-baseline="${escapeXml(props.dominantBaseline)}" font-family="${escapeXml(props.fontFamily)}">${escapeXml(content)}</text></svg>`;
  const image = `url("data:image/svg+xml,${encodeURIComponent(mask)}")`;
  return { maskImage: image, WebkitMaskImage: image };
}
</script>

<template>
  <component :is="as" class="relative size-full" :class="className">
    <div
      class="video-text-mask absolute inset-0 flex items-center justify-center"
      :style="maskStyle()"
      aria-hidden="true"
    >
      <video
        :key="src"
        :src="src"
        class="h-full w-full object-cover"
        :autoplay="autoPlay"
        :muted="muted"
        :loop="loop"
        :preload="preload"
        playsinline
      />
    </div>
    <span class="sr-only"><slot /></span>
  </component>
</template>

<style scoped>
.video-text-mask {
  mask-size: contain;
  -webkit-mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-position: center;
}
</style>
```

:::

## Usage

```vue
<script setup lang="ts">
import VideoText from "@/components/spark-ui/video-text/video-text.vue";
</script>

<template>
  <div class="relative h-56 w-full">
    <VideoText src="https://cdn.magicui.design/ocean-small.webm">OCEAN</VideoText>
  </div>
</template>
```

## Props

| Prop               | Type                             | Default        | Description                                                     |
| ------------------ | -------------------------------- | -------------- | --------------------------------------------------------------- |
| `src`              | `string`                         | Required       | Video URL.                                                      |
| `as`               | `string`                         | `"div"`        | Wrapper HTML tag.                                               |
| `className`        | `string`                         | Unset          | Extra wrapper classes.                                          |
| `autoPlay`         | `boolean`                        | `true`         | Requests automatic playback.                                    |
| `muted`            | `boolean`                        | `true`         | Mutes the video.                                                |
| `loop`             | `boolean`                        | `true`         | Repeats the video.                                              |
| `preload`          | `"auto" \| "metadata" \| "none"` | `"auto"`       | Browser loading hint.                                           |
| `fontSize`         | `string \| number`               | `20`           | Number in SVG viewport width units, or an SVG font-size string. |
| `fontWeight`       | `string \| number`               | `"bold"`       | Weight of the text.                                             |
| `textAnchor`       | `string`                         | `"middle"`     | Horizontal text alignment.                                      |
| `dominantBaseline` | `string`                         | `"middle"`     | Vertical text alignment.                                        |
| `fontFamily`       | `string`                         | `"sans-serif"` | Font for the text.                                              |

## Behavior

The default slot supplies the text. Use plain text or text inside HTML elements. The mask uses the text without its HTML formatting.

An SVG mask hides the video outside the letters. The video remains an HTML video element with inline playback. A hidden copy of the text supports screen readers.

Give the parent an explicit height and width. The mask scales with its container and updates when the text or font props change. Special characters stay literal text.

The demo loads `https://cdn.magicui.design/ocean-small.webm`. Your browser must support WebM and allow automatic playback. If your site limits media or image sources, allow the video host and SVG `data:` images. No extra package is required.

## Source

Ported from [Magic UI Video Text](https://magicui.design/docs/components/video-text). The [upstream source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/video-text.tsx) uses React.
