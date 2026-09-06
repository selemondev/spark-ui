# Dotted Map

A component with a svg dotted map.

<demo src="../../src/example/dotted-map/demo.vue" srcCode="../../src/spark-ui-demos/dotted-map/dotted-map.vue" />

## Installation

Install the following dependency:

```bash
npm install svg-dotted-map
```

Copy and paste the following code into your project:

::: code-group

```vue [dotted-map.vue]
<script setup lang="ts">
import { computed } from "vue";
import { createMap } from "svg-dotted-map";
import { cn } from "@/lib/utils";

export interface Marker {
  lat: number;
  lng: number;
  size?: number;
  pulse?: boolean;
  [key: string]: unknown;
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
  [key: string]: unknown;
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
const stagger = computed(() => {
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
  const rowIndex = stagger.value.yToRowIndex.get(y) ?? 0;
  return props.stagger && rowIndex % 2 === 1 ? stagger.value.xStep / 2 : 0;
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
```

:::

## Usage

```vue
<script setup lang="ts">
import DottedMap from "@/components/spark-ui/dotted-map/dotted-map.vue";
</script>

<template>
  <div class="relative h-[400px] w-full overflow-hidden rounded-xl border">
    <DottedMap />
  </div>
</template>
```

### With Custom Markers

Use the `marker` scoped slot (the idiomatic Vue equivalent of Magic UI's
`renderMarkerOverlay` render prop) to render custom overlays. The slot exposes
`marker`, `index`, `x`, `y` and `r`.

```vue
<script setup lang="ts">
import DottedMap from "@/components/spark-ui/dotted-map/dotted-map.vue";
import type { Marker } from "@/components/spark-ui/dotted-map/dotted-map.vue";

type MyMarker = Marker & { label: string };

const markers: MyMarker[] = [{ lat: 37.5665, lng: 126.978, size: 2.8, label: "Seoul" }];
</script>

<template>
  <DottedMap :markers="markers">
    <template #marker="{ marker, x, y }">
      <text :x="x" :y="y">{{ (marker as MyMarker).label }}</text>
    </template>
  </DottedMap>
</template>
```

## Examples

### Smaller Dots

<demo src="../../src/example/dotted-map/demo-2.vue" srcCode="../../src/spark-ui-demos/dotted-map/smaller-dots.vue" />

### Pulse Marker

<demo src="../../src/example/dotted-map/demo-3.vue" srcCode="../../src/spark-ui-demos/dotted-map/pulse-marker.vue" />

Set `pulse` on `DottedMap` to animate all markers (and use `marker.pulse = false`
to opt out per marker). Without the `pulse` prop, only markers with
`marker.pulse = true` will pulse.

## Props

| Prop          | Type       | Default          | Description                                                    |
| ------------- | ---------- | ---------------- | -------------------------------------------------------------- |
| `width`       | `number`   | `150`            | Width of the SVG map.                                          |
| `height`      | `number`   | `75`             | Height of the SVG map.                                         |
| `mapSamples`  | `number`   | `5000`           | Number of sample points for map generation.                    |
| `markers`     | `Marker[]` | `[]`             | Array of markers to display on the map.                        |
| `dotColor`    | `string`   | `"currentColor"` | Color of the map dots.                                         |
| `markerColor` | `string`   | `"#FF6900"`      | Color of the markers.                                          |
| `dotRadius`   | `number`   | `0.2`            | Radius of the map dots.                                        |
| `stagger`     | `boolean`  | `true`           | Whether to stagger dots in alternating rows for visual effect. |
| `pulse`       | `boolean`  | `false`          | Enables built-in pulse animation for markers.                  |
| `class`       | `string`   | `-`              | Additional class names applied to the SVG.                     |

## Slots

| Slot     | Props                        | Description                              |
| -------- | ---------------------------- | ---------------------------------------- |
| `marker` | `{ marker, index, x, y, r }` | Custom overlay rendered for each marker. |

## Types

### Marker

```ts
export interface Marker {
  lat: number;
  lng: number;
  size?: number;
  pulse?: boolean;
  [key: string]: unknown;
}
```
