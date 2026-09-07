<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onServerPrefetch,
  ref,
  shallowRef,
  watch,
} from "vue";
import { cn } from "../../../lib/utils";
import TweetContent from "./tweet-content.vue";
import { getTweet, type TweetData } from "./tweet-data";

interface TweetCardProps {
  id?: string;
  tweet?: TweetData;
  apiUrl?: string;
  fetchOptions?: RequestInit;
  onError?: (error: Error) => unknown;
  class?: string;
  className?: string;
  clientOnly?: boolean;
}
const props = withDefaults(defineProps<TweetCardProps>(), { clientOnly: false });
const fetched = shallowRef<TweetData | null>(null);
const tweet = computed(() => props.tweet ?? fetched.value);
const loading = ref(!props.tweet && Boolean(props.id || props.apiUrl));
const error = shallowRef<unknown>(null);
let controller: AbortController | undefined;
let removeAbortListener: (() => void) | undefined;
let request = 0;

async function load() {
  const current = ++request;
  controller?.abort();
  removeAbortListener?.();
  removeAbortListener = undefined;
  fetched.value = null;
  error.value = null;
  loading.value = false;
  if (props.tweet || (!props.id && !props.apiUrl)) return;
  const active = new AbortController();
  controller = active;
  const externalSignal = props.fetchOptions?.signal;
  if (externalSignal) {
    const abort = () => active.abort(externalSignal.reason);
    if (externalSignal.aborted) abort();
    else {
      externalSignal.addEventListener("abort", abort, { once: true });
      removeAbortListener = () => externalSignal.removeEventListener("abort", abort);
    }
  }
  loading.value = true;
  try {
    const data = await getTweet(props.id, props.apiUrl, {
      ...props.fetchOptions,
      signal: active.signal,
    });
    if (current === request) fetched.value = data;
  } catch (cause) {
    if (current !== request) return;
    const failure = cause instanceof Error ? cause : new Error(String(cause));
    error.value = failure;
    if (props.onError) {
      try {
        error.value = props.onError(failure) ?? failure;
      } catch (callbackError) {
        error.value = callbackError;
      }
    }
  } finally {
    if (current === request) {
      loading.value = false;
      removeAbortListener?.();
      removeAbortListener = undefined;
    }
  }
}

onServerPrefetch(async () => {
  if (!props.clientOnly) await load();
});
onMounted(() => {
  watch(() => [props.id, props.apiUrl, props.tweet, props.fetchOptions], load, { immediate: true });
});
onBeforeUnmount(() => {
  request++;
  controller?.abort();
  removeAbortListener?.();
});
</script>

<template>
  <article
    :class="
      cn(
        'relative flex h-fit w-full max-w-lg flex-col gap-4 overflow-hidden rounded-xl border bg-background p-5 text-foreground',
        props.class,
        props.className,
      )
    "
    :aria-busy="loading"
  >
    <slot v-if="loading" name="fallback">
      <div role="status" aria-label="Loading tweet" class="tweet-skeleton flex flex-col gap-4">
        <div class="flex gap-3">
          <div class="size-12 shrink-0 rounded-full bg-muted" />
          <div class="flex flex-1 flex-col gap-2">
            <div class="h-5 w-3/4 rounded bg-muted" />
            <div class="h-4 w-1/2 rounded bg-muted" />
          </div>
        </div>
        <div class="h-20 rounded bg-muted" />
        <span class="sr-only">Loading tweet</span>
      </div>
    </slot>
    <TweetContent v-else-if="tweet" :tweet="tweet" />
    <slot v-else name="not-found" :error="error">
      <div
        role="status"
        class="flex min-h-32 flex-col items-center justify-center gap-2 text-center"
      >
        <h3 class="font-medium">{{ error ? "Unable to load tweet" : "Tweet not found" }}</h3>
        <p class="text-sm text-muted-foreground">
          {{
            error
              ? "The tweet request failed. Try again later."
              : "This tweet is unavailable or no tweet ID was supplied."
          }}
        </p>
      </div>
    </slot>
  </article>
</template>

<style scoped>
.tweet-skeleton {
  animation: tweet-pulse 2s ease-in-out infinite;
}
@keyframes tweet-pulse {
  50% {
    opacity: 0.5;
  }
}
@media (prefers-reduced-motion: reduce) {
  .tweet-skeleton {
    animation: none;
  }
}
</style>
