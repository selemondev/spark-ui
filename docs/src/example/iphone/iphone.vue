<script setup lang="ts">
import { computed, useId } from "vue";
import { cn } from "../../lib/utils";

interface IphoneProps {
  class?: string;
  src?: string;
  videoSrc?: string;
}

const props = defineProps<IphoneProps>();
const id = useId();
const screenPunchId = `${id}-screen-punch`;
const roundedCornersId = `${id}-rounded-corners`;

const PHONE_WIDTH = 433;
const PHONE_HEIGHT = 882;
const SCREEN_X = 21.25;
const SCREEN_Y = 19.25;
const SCREEN_WIDTH = 389.5;
const SCREEN_HEIGHT = 843.5;
const SCREEN_RADIUS = 55.75;

const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100;
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100;
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100;
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100;
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100;
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100;

const hasVideo = computed(() => !!props.videoSrc);
const hasMedia = computed(() => hasVideo.value || !!props.src);

const mediaStyle = {
  left: `${LEFT_PCT}%`,
  top: `${TOP_PCT}%`,
  width: `${WIDTH_PCT}%`,
  height: `${HEIGHT_PCT}%`,
  borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
};

const screenMask = computed(() => (hasMedia.value ? `url(#${screenPunchId})` : undefined));
</script>

<template>
  <div
    :class="cn('relative inline-block w-full align-middle leading-none', props.class)"
    :style="{ aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}` }"
  >
    <div
      v-if="hasVideo"
      class="pointer-events-none absolute z-0 overflow-hidden"
      :style="mediaStyle"
    >
      <video
        class="block size-full object-cover"
        :src="props.videoSrc"
        autoplay
        loop
        muted
        playsinline
        preload="metadata"
      />
    </div>

    <div
      v-else-if="props.src"
      class="pointer-events-none absolute z-0 overflow-hidden"
      :style="mediaStyle"
    >
      <img :src="props.src" alt="" class="block size-full object-cover object-top" />
    </div>

    <svg
      :viewBox="`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute inset-0 size-full"
      style="transform: translateZ(0)"
    >
      <g :mask="screenMask">
        <path
          d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
          class="fill-white dark:fill-[#262626]"
        />
      </g>

      <path
        opacity="0.5"
        d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
        class="fill-[#E5E5E5] dark:fill-[#404040]"
      />

      <path
        :d="`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`"
        class="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]"
        :mask="screenMask"
      />

      <path
        d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
        class="fill-[#F5F5F5] dark:fill-[#262626]"
      />
      <path
        d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
        class="fill-[#F5F5F5] dark:fill-[#262626]"
      />
      <path
        d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
        class="fill-[#E5E5E5] dark:fill-[#404040]"
      />

      <defs>
        <mask :id="screenPunchId" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" :width="PHONE_WIDTH" :height="PHONE_HEIGHT" fill="white" />
          <rect
            :x="SCREEN_X"
            :y="SCREEN_Y"
            :width="SCREEN_WIDTH"
            :height="SCREEN_HEIGHT"
            :rx="SCREEN_RADIUS"
            :ry="SCREEN_RADIUS"
            fill="black"
          />
        </mask>
        <clipPath :id="roundedCornersId">
          <rect
            :x="SCREEN_X"
            :y="SCREEN_Y"
            :width="SCREEN_WIDTH"
            :height="SCREEN_HEIGHT"
            :rx="SCREEN_RADIUS"
            :ry="SCREEN_RADIUS"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>
