<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../../lib/utils";

interface LetterPullupProps {
  class?: string;
  words: string;
  delay?: number;
}

const props = defineProps<LetterPullupProps>();

const letters = computed(() => props.words.split(""));

const pullupVariant = {
  initial: { y: 100, opacity: 0 },
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * (props.delay ?? 50),
    },
  }),
};

const className = computed(() =>
  cn(
    "font-display text-center text-4xl font-bold tracking-[-0.02em] text-black dark:text-white drop-shadow-sm md:text-4xl md:leading-[5rem]",
    props.class,
  ),
);
</script>

<template>
  <h1 class="flex justify-center">
    <span class="sr-only">{{ props.words }}</span>
    <span aria-hidden="true" v-for="(letter, index) in letters" :key="index">
      <span
        class="inline-block"
        v-motion
        :initial="pullupVariant.initial"
        :enter="pullupVariant.enter(index)"
        :class="className"
      >
        <span v-if="letter === ' '">&nbsp;</span>
        <span v-else>{{ letter }}</span>
      </span>
    </span>
  </h1>
</template>
