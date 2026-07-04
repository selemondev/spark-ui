<script setup lang="ts">
import DottedMap from "./dotted-map.vue";
import type { Marker } from "./dotted-map.vue";

type MyMarker = Marker & {
  overlay: {
    countryCode: string;
    label: string;
  };
};

const markers: MyMarker[] = [
  {
    lat: 37.5665,
    lng: 126.978,
    size: 2.8,
    overlay: { countryCode: "kr", label: "Seoul" },
  },
  {
    lat: 40.7128,
    lng: -74.006,
    size: 2.8,
    overlay: { countryCode: "us", label: "NYC" },
  },
];

const id = "dotted-map-demo";
</script>

<template>
  <div class="relative h-[440px] w-full max-w-[500px] overflow-hidden rounded-lg border">
    <div
      class="absolute inset-0 bg-radial from-transparent to-background to-200%"
    />
    <DottedMap :markers="markers">
      <template #marker="{ marker, x, y, r, index }">
        <g style="pointer-events: none">
          <clipPath :id="`${id}-flag-clip-${index}`">
            <circle :cx="x" :cy="y" :r="r * 0.75" />
          </clipPath>

          <image
            :href="`https://flagcdn.com/w80/${marker.overlay.countryCode}.webp`"
            :x="x - r * 0.75"
            :y="y - r * 0.75"
            :width="r * 0.75 * 2"
            :height="r * 0.75 * 2"
            preserveAspectRatio="xMidYMid slice"
            :clip-path="`url(#${id}-flag-clip-${index})`"
          />

          <rect
            :x="x + r + r * 0.6"
            :y="y - (r * 1.5) / 2"
            :width="
              marker.overlay.label.length * (r * 0.9 * 0.62) +
              r * 1.4
            "
            :height="r * 1.5"
            :rx="(r * 1.5) / 2"
            fill="rgba(0,0,0,0.55)"
          />
          <text
            :x="x + r + r * 0.6 + r * 0.7"
            :y="y + r * 0.9 * 0.35"
            :font-size="r * 0.9"
            fill="white"
          >
            {{ marker.overlay.label }}
          </text>
        </g>
      </template>
    </DottedMap>
  </div>
</template>
