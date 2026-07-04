<script setup lang="ts">
import DottedMap from "./dotted-map.vue";
import type { Marker } from "./dotted-map.vue";

const markers: Marker[] = [
  {
    lat: 37.5665,
    lng: 126.978,
    size: 0.3,
  },
  {
    lat: 40.7128,
    lng: -74.006,
    size: 0.3,
    pulse: false,
  },
];
</script>

<template>
  <div class="relative h-[440px] w-full max-w-[500px] overflow-hidden rounded-lg border">
    <div
      class="absolute inset-0 bg-radial from-transparent to-background to-200%"
    />
    <DottedMap :markers="markers" pulse />
  </div>
</template>
