<script setup lang="ts">
import TweetCard from "../tweet-card/tweet-card.vue";
import type { TweetData } from "../tweet-card/tweet-data";

interface ClientTweetCardProps {
  id?: string;
  tweet?: TweetData;
  apiUrl?: string;
  fetchOptions?: RequestInit;
  onError?: (error: Error) => unknown;
  class?: string;
  className?: string;
}
const props = defineProps<ClientTweetCardProps>();
</script>

<template>
  <TweetCard v-bind="props" client-only>
    <template v-if="$slots.fallback" #fallback><slot name="fallback" /></template>
    <template v-if="$slots['not-found']" #not-found="state"
      ><slot name="not-found" v-bind="state"
    /></template>
  </TweetCard>
</template>
