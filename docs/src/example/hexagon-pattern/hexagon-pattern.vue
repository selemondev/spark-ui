<script setup lang="ts">
import { computed, useId } from "vue";
import { cn } from "../../lib/utils";

type Direction = "horizontal" | "vertical";
type HexPoint = readonly [number, number];

interface HexagonPatternProps {
  radius?: number;
  gap?: number;
  x?: number;
  y?: number;
  direction?: Direction;
  strokeDasharray?: string;
  hexagons?: Array<[number, number]>;
  class?: string;
}

const props = withDefaults(defineProps<HexagonPatternProps>(), {
  radius: 40,
  gap: 0,
  x: -1,
  y: -1,
  direction: "horizontal",
  strokeDasharray: "0",
});

const id = `hexagon-pattern-${useId()}`;

function hexVertexList(cx: number, cy: number, r: number, direction: Direction): HexPoint[] {
  const startAngle = direction === "horizontal" ? 0 : 30;
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((startAngle + i * 60) * Math.PI) / 180;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const;
  });
}

function hexPoints(cx: number, cy: number, r: number, direction: Direction): string {
  return hexVertexList(cx, cy, r, direction)
    .map(([px, py]) => `${px},${py}`)
    .join(" ");
}

function edgeLexKey(a: HexPoint, b: HexPoint): string {
  const [p, q] = a[0] < b[0] || (a[0] === b[0] && a[1] <= b[1]) ? [a, b] : [b, a];
  return `${p[0].toFixed(6)},${p[1].toFixed(6)}|${q[0].toFixed(6)},${q[1].toFixed(6)}`;
}

function collectUniqueHexEdges(
  centers: [number, number][],
  r: number,
  direction: Direction,
): [HexPoint, HexPoint][] {
  const seen = new Set<string>();
  const edges: [HexPoint, HexPoint][] = [];
  for (const [cx, cy] of centers) {
    const verts = hexVertexList(cx, cy, r, direction);
    for (let i = 0; i < 6; i++) {
      const a = verts[i];
      const b = verts[(i + 1) % 6];
      const key = edgeLexKey(a, b);
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([a, b]);
      }
    }
  }
  return edges;
}

function isSolidStrokeDasharray(strokeDasharray: string): boolean {
  const t = strokeDasharray.trim();
  return t === "" || t === "none" || t === "0";
}

function getHexSpacing(r: number, direction: Direction, gap: number) {
  const sqrt3 = Math.sqrt(3);
  if (direction === "horizontal") {
    const colStep = (3 * r) / 2 + (sqrt3 * gap) / 2;
    const rowStep = sqrt3 * r + gap;
    return { colStep, rowStep, tileW: colStep * 2, tileH: rowStep };
  }
  const colStep = sqrt3 * r + gap;
  const rowStep = (3 * r) / 2 + (sqrt3 * gap) / 2;
  return { colStep, rowStep, tileW: colStep, tileH: rowStep * 2 };
}

function getTileGeometry(r: number, direction: Direction, gap: number) {
  const { colStep, rowStep, tileW, tileH } = getHexSpacing(r, direction, gap);
  const canonical: [number, number][] =
    direction === "horizontal"
      ? [
          [colStep / 2, rowStep / 2],
          [(colStep * 3) / 2, rowStep],
        ]
      : [
          [colStep / 2, rowStep / 2],
          [colStep, (rowStep * 3) / 2],
        ];

  const centers: [number, number][] = [];
  for (const [cx, cy] of canonical) {
    centers.push([cx, cy]);
    if (cy - r < 0) centers.push([cx, cy + tileH]);
    if (cy + r > tileH) centers.push([cx, cy - tileH]);
    if (cx - r < 0) centers.push([cx + tileW, cy]);
    if (cx + r > tileW) centers.push([cx - tileW, cy]);
    if (cy - r < 0 && cx - r < 0) centers.push([cx + tileW, cy + tileH]);
    if (cy - r < 0 && cx + r > tileW) centers.push([cx - tileW, cy + tileH]);
    if (cy + r > tileH && cx - r < 0) centers.push([cx + tileW, cy - tileH]);
    if (cy + r > tileH && cx + r > tileW) centers.push([cx - tileW, cy - tileH]);
  }

  return { tileW, tileH, centers };
}

function hexCenter(
  col: number,
  row: number,
  r: number,
  direction: Direction,
  gap: number,
): [number, number] {
  const { colStep, rowStep } = getHexSpacing(r, direction, gap);
  if (direction === "horizontal") {
    const cx = col * colStep + colStep / 2;
    const cy = row * rowStep + rowStep / 2 + (col % 2 !== 0 ? rowStep / 2 : 0);
    return [cx, cy];
  }
  const cx = col * colStep + colStep / 2 + (row % 2 !== 0 ? colStep / 2 : 0);
  const cy = row * rowStep + rowStep / 2;
  return [cx, cy];
}

const geometry = computed(() => getTileGeometry(props.radius, props.direction, props.gap));
const solidStroke = computed(() => isSolidStrokeDasharray(props.strokeDasharray));
const solidPolygons = computed(() =>
  solidStroke.value
    ? geometry.value.centers.map(([cx, cy]) => ({
        key: `${cx}-${cy}`,
        points: hexPoints(cx, cy, props.radius, props.direction),
      }))
    : [],
);
const dashedEdges = computed(() =>
  solidStroke.value
    ? []
    : collectUniqueHexEdges(geometry.value.centers, props.radius, props.direction).map(([a, b]) => ({
        key: edgeLexKey(a, b),
        x1: a[0],
        y1: a[1],
        x2: b[0],
        y2: b[1],
      })),
);
const highlighted = computed(() =>
  (props.hexagons ?? []).map(([col, row]) => {
    const [cx, cy] = hexCenter(col, row, props.radius, props.direction, props.gap);
    return {
      key: `${col}-${row}`,
      points: hexPoints(cx, cy, props.radius - 1, props.direction),
    };
  }),
);
</script>

<template>
  <svg
    aria-hidden="true"
    :class="
      cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30',
        props.class,
      )
    "
  >
    <defs>
      <pattern
        :id="id"
        :width="geometry.tileW"
        :height="geometry.tileH"
        patternUnits="userSpaceOnUse"
        :x="props.x"
        :y="props.y"
      >
        <template v-if="solidStroke">
          <polygon
            v-for="poly in solidPolygons"
            :key="poly.key"
            class="fill-none"
            :points="poly.points"
            :stroke-dasharray="props.strokeDasharray"
          />
        </template>
        <template v-else>
          <line
            v-for="edge in dashedEdges"
            :key="edge.key"
            class="fill-none"
            :x1="edge.x1"
            :y1="edge.y1"
            :x2="edge.x2"
            :y2="edge.y2"
            :stroke-dasharray="props.strokeDasharray"
          />
        </template>
      </pattern>
    </defs>

    <rect width="100%" height="100%" :fill="`url(#${id})`" stroke="none" />

    <svg
      v-if="highlighted.length > 0"
      aria-hidden="true"
      class="overflow-visible"
      :x="props.x"
      :y="props.y"
    >
      <polygon
        v-for="hex in highlighted"
        :key="hex.key"
        :points="hex.points"
        stroke-width="0"
      />
    </svg>
  </svg>
</template>
