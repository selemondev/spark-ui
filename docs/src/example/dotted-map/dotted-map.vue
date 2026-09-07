<script setup lang="ts">
import { computed } from "vue";
import { createMap } from "svg-dotted-map";
import { cn } from "../../lib/utils";

export interface Marker {
  lat: number;
  lng: number;
  size?: number;
  pulse?: boolean;
  [key: string]: any;
}

/** Markers returned by addMarkers have lat/lng removed; x, y and other props remain. */
export type MapMarker = Omit<Marker, "lat" | "lng"> & {
  x: number;
  y: number;
};

interface DottedMapProps {
  class?: string;
  width?: number;
  height?: number;
  mapSamples?: number;
  markers?: Marker[];
  dotColor?: string;
  markerColor?: string;
  dotRadius?: number;
  stagger?: boolean;
  pulse?: boolean;
  [key: string]: any;
}

const props = withDefaults(defineProps<DottedMapProps>(), {
  width: 150,
  height: 75,
  mapSamples: 5000,
  markers: () => [],
  dotColor: "currentColor",
  markerColor: "#FF6900",
  dotRadius: 0.2,
  stagger: true,
  pulse: false,
});

defineSlots<{
  marker?: (props: {
    marker: MapMarker;
    index: number;
    x: number;
    y: number;
    r: number;
  }) => unknown;
}>();

const map = computed(() =>
  createMap({
    width: props.width,
    height: props.height,
    mapSamples: props.mapSamples,
  }),
);

const points = computed(() => map.value.points);

const processedMarkers = computed(() => map.value.addMarkers(props.markers) as MapMarker[]);

// Compute stagger helpers in a single, simple pass.
const staggerLayout = computed(() => {
  const sorted = [...points.value].sort((a, b) => a.y - b.y || a.x - b.x);
  const rowMap = new Map<number, number>();
  let step = 0;
  let prevY = Number.NaN;
  let prevXInRow = Number.NaN;

  for (const p of sorted) {
    if (p.y !== prevY) {
      // new row
      prevY = p.y;
      prevXInRow = Number.NaN;
      if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size);
    }
    if (!Number.isNaN(prevXInRow)) {
      const delta = p.x - prevXInRow;
      if (delta > 0) step = step === 0 ? delta : Math.min(step, delta);
    }
    prevXInRow = p.x;
  }

  return { xStep: step || 1, yToRowIndex: rowMap };
});

function rowOffset(y: number) {
  const rowIndex = staggerLayout.value.yToRowIndex.get(y) ?? 0;
  return props.stagger && rowIndex % 2 === 1 ? staggerLayout.value.xStep / 2 : 0;
}

const renderedMarkers = computed(() =>
  processedMarkers.value.map((marker, index) => {
    const offsetX = rowOffset(marker.y);
    const x = marker.x + offsetX;
    const y = marker.y;
    const r = marker.size ?? props.dotRadius;
    const shouldPulse = props.pulse ? marker.pulse !== false : marker.pulse === true;
    const pulseTo = r * 2.8;
    return { marker: { ...marker, x, y }, index, x, y, r, shouldPulse, pulseTo };
  }),
);
</script>

<template>
  <svg
    :viewBox="`0 0 ${props.width} ${props.height}`"
    :class="cn('text-gray-500 dark:text-gray-500', props.class)"
    style="width: 100%; height: 100%"
  >
    <circle
      v-for="(point, index) in points"
      :key="`${point.x}-${point.y}-${index}`"
      :cx="point.x + rowOffset(point.y)"
      :cy="point.y"
      :r="props.dotRadius"
      :fill="props.dotColor"
    />

    <g v-for="item in renderedMarkers" :key="`${item.x}-${item.y}-${item.index}`">
      <circle :cx="item.x" :cy="item.y" :r="item.r" :fill="props.markerColor" />

      <g v-if="item.shouldPulse" pointer-events="none">
        <circle
          :cx="item.x"
          :cy="item.y"
          :r="item.r"
          fill="none"
          :stroke="props.markerColor"
          :stroke-opacity="1"
          :stroke-width="0.35"
        >
          <animate
            attributeName="r"
            :values="`${item.r};${item.pulseTo}`"
            dur="1.4s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="1;0" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle
          :cx="item.x"
          :cy="item.y"
          :r="item.r"
          fill="none"
          :stroke="props.markerColor"
          :stroke-opacity="0.9"
          :stroke-width="0.3"
        >
          <animate
            attributeName="r"
            :values="`${item.r};${item.pulseTo}`"
            dur="1.4s"
            begin="0.7s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.9;0"
            dur="1.4s"
            begin="0.7s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      <slot
        name="marker"
        :marker="item.marker"
        :index="item.index"
        :x="item.x"
        :y="item.y"
        :r="item.r"
      />
    </g>
  </svg>
</template>
