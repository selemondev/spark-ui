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
