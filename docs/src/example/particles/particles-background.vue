<script setup lang="ts">
import { useId } from "vue";

const props = withDefaults(
  defineProps<{
    color?: string;
  }>(),
  {
    color: "#00DC82",
  },
);

const id = useId();
const maskId = `${id}-mask`;
const backgroundGradientId = `${id}-background`;
const borderGradientId = `${id}-border`;
</script>

<template>
  <svg viewBox="0 0 1440 181" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask :id="maskId" fill="white">
      <path d="M0 0H1440V181H0V0Z" />
    </mask>
    <path d="M0 0H1440V181H0V0Z" :fill="`url(#${backgroundGradientId})`" fill-opacity="0.22" />
    <path d="M0 2H1440V-2H0V2Z" :fill="`url(#${borderGradientId})`" :mask="`url(#${maskId})`" />
    <defs>
      <linearGradient
        :id="backgroundGradientId"
        x1="720"
        y1="0"
        x2="720"
        y2="181"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="props.color" />
        <stop offset="1" :stop-color="props.color" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        :id="borderGradientId"
        x1="0"
        y1="90.5"
        x2="1440"
        y2="90.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="props.color" stop-opacity="0" />
        <stop offset="0.395" :stop-color="props.color" />
        <stop offset="1" :stop-color="props.color" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>
