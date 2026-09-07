# Client Tweet Card

A tweet card that loads public tweet data in the browser. It also accepts data that your application already loaded.

<demo src="../../src/example/client-tweet-card/demo.vue" srcCode="../../src/spark-ui-demos/client-tweet-card/demo.vue" />

## Installation

Copy the files below into `src/components/spark-ui/`. Keep the `tweet-card` and `client-tweet-card` folders next to each other.
If you already installed Tweet Card, add only `client-tweet-card.vue`. This component needs no React package or extra CSS configuration.

::: code-group

```vue [client-tweet-card/client-tweet-card.vue]
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
```

```ts [tweet-card/tweet-data.ts]
// Data shapes and entity handling follow vercel/react-tweet (MIT).
export interface TweetEntity {
  indices: [number, number];
  text?: string;
  screen_name?: string;
  expanded_url?: string;
  display_url?: string;
}

export interface TweetData {
  id_str: string;
  text: string;
  user: {
    name: string;
    screen_name: string;
    profile_image_url_https: string;
    verified?: boolean;
    is_blue_verified?: boolean;
  };
  lang?: string;
  created_at?: string;
  display_text_range?: [number, number];
  entities?: {
    hashtags?: TweetEntity[];
    symbols?: TweetEntity[];
    user_mentions?: TweetEntity[];
    urls?: TweetEntity[];
    media?: TweetEntity[];
  };
  photos?: { url: string; width: number; height: number; alt_text?: string }[];
  video?: { poster: string; variants: { src: string; type?: string }[] };
  mediaDetails?: {
    type: "photo" | "video" | "animated_gif";
    media_url_https: string;
    ext_alt_text?: string;
    original_info?: { width: number; height: number };
    video_info?: { variants: { url: string; content_type: string; bitrate?: number }[] };
  }[];
  card?: {
    binding_values?: Record<
      string,
      {
        string_value?: string;
        image_value?: { url: string; width?: number; height?: number };
      }
    >;
  };
  favorite_count?: number;
  conversation_count?: number;
  quoted_tweet?: TweetData;
  in_reply_to_screen_name?: string;
  in_reply_to_status_id_str?: string;
  possibly_sensitive?: boolean;
  note_tweet?: { id: string };
}

export function safeUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function tweetUrl(tweet: TweetData): string {
  return `https://x.com/${encodeURIComponent(tweet.user.screen_name)}/status/${encodeURIComponent(tweet.id_str)}`;
}

function decodeText(text: string): string {
  // Decode text, never markup. Vue escapes the returned string.
  return text.replace(/&(?:amp|lt|gt|quot|apos|#39|#x[\da-f]+|#\d+);/gi, (entity) => {
    const named: Record<string, string> = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'",
      "&#39;": "'",
    };
    if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
    const value = entity.toLowerCase().startsWith("&#x")
      ? Number.parseInt(entity.slice(3, -1), 16)
      : Number.parseInt(entity.slice(2, -1), 10);
    return Number.isFinite(value) && value >= 0 && value <= 0x10ffff
      ? String.fromCodePoint(value)
      : entity;
  });
}

export function tweetSegments(tweet: TweetData): { text: string; href?: string }[] {
  // Syndication indices count Unicode code points, not UTF-16 code units.
  const text = Array.from(tweet.text);
  const [start, end] = tweet.display_text_range ?? [0, text.length];
  const entities = tweet.entities;
  const links = [
    ...(entities?.hashtags ?? []).map((item) => ({
      ...item,
      href: `https://x.com/hashtag/${encodeURIComponent(item.text ?? "")}`,
      hidden: false,
    })),
    ...(entities?.symbols ?? []).map((item) => ({
      ...item,
      href: `https://x.com/search?q=%24${encodeURIComponent(item.text ?? "")}`,
      hidden: false,
    })),
    ...(entities?.user_mentions ?? []).map((item) => ({
      ...item,
      href: `https://x.com/${encodeURIComponent(item.screen_name ?? "")}`,
      hidden: false,
    })),
    ...(entities?.urls ?? []).map((item) => ({
      ...item,
      href: safeUrl(item.expanded_url),
      hidden: false,
    })),
    ...(entities?.media ?? []).map((item) => ({ ...item, href: undefined, hidden: true })),
  ].sort((a, b) => a.indices[0] - b.indices[0]);
  const result: { text: string; href?: string }[] = [];
  let cursor = start;
  for (const entity of links) {
    const [from, to] = entity.indices;
    if (from < cursor || from >= end || to > end || to <= from) continue;
    if (cursor < from) result.push({ text: decodeText(text.slice(cursor, from).join("")) });
    if (!entity.hidden)
      result.push({
        text: decodeText(entity.display_url ?? text.slice(from, to).join("")),
        href: entity.href,
      });
    cursor = to;
  }
  if (cursor < end) result.push({ text: decodeText(text.slice(cursor, end).join("")) });
  return result;
}

export function isTweetData(value: unknown): value is TweetData {
  if (!value || typeof value !== "object") return false;
  const tweet = value as Partial<TweetData>;
  return (
    typeof tweet.id_str === "string" &&
    typeof tweet.text === "string" &&
    typeof tweet.user?.name === "string" &&
    typeof tweet.user?.screen_name === "string" &&
    typeof tweet.user?.profile_image_url_https === "string"
  );
}

/** Fetch public tweet data. apiUrl is a full endpoint returning { data: TweetData | null }. */
export async function getTweet(
  id?: string,
  apiUrl?: string,
  fetchOptions?: RequestInit,
): Promise<TweetData | null> {
  if (!apiUrl && (!id || !/^\d{1,40}$/.test(id))) throw new Error("A valid tweet ID is required.");
  const url = apiUrl ?? `https://react-tweet.vercel.app/api/tweet/${id}`;
  const response = await fetch(url, fetchOptions);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Tweet request failed (${response.status}).`);
  const payload: unknown = await response.json();
  const value = payload && typeof payload === "object" && "data" in payload ? payload.data : null;
  if (value == null) return null;
  if (!isTweetData(value)) throw new Error("The tweet endpoint returned invalid data.");
  return value;
}

/** Server-only access to the same public syndication endpoint used by react-tweet/api. */
export async function getTweetFromSyndication(
  id: string,
  fetchOptions?: RequestInit,
): Promise<TweetData | null> {
  if (!/^\d{1,40}$/.test(id)) throw new Error("A valid tweet ID is required.");
  const url = new URL("https://cdn.syndication.twimg.com/tweet-result");
  url.searchParams.set("id", id);
  url.searchParams.set("lang", "en");
  url.searchParams.set(
    "token",
    ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, ""),
  );
  const response = await fetch(url, fetchOptions);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Tweet request failed (${response.status}).`);
  const value: unknown = await response.json();
  if (isTweetData(value)) return value;
  if (
    value &&
    typeof value === "object" &&
    (Object.keys(value).length === 0 ||
      ("__typename" in value && value.__typename === "TweetTombstone"))
  )
    return null;
  throw new Error("The syndication endpoint returned invalid data.");
}
```

```vue [tweet-card/tweet-content.vue]
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { safeUrl, tweetSegments, tweetUrl, type TweetData } from "./tweet-data";

const props = withDefaults(defineProps<{ tweet: TweetData; quoted?: boolean }>(), {
  quoted: false,
});
const segments = computed(() => tweetSegments(props.tweet));
const url = computed(() => tweetUrl(props.tweet));
const profileUrl = computed(
  () => `https://x.com/${encodeURIComponent(props.tweet.user.screen_name)}`,
);
const sensitiveVisible = ref(false);
watch(
  () => props.tweet,
  () => {
    sensitiveVisible.value = false;
  },
);
const photos = computed(
  () =>
    props.tweet.photos ??
    props.tweet.mediaDetails
      ?.filter((media) => media.type === "photo")
      .map((media) => ({
        url: media.media_url_https,
        width: media.original_info?.width,
        height: media.original_info?.height,
        alt_text: media.ext_alt_text,
      })) ??
    [],
);
const video = computed(() => {
  const legacy = props.tweet.video;
  if (legacy) {
    const source = legacy.variants.find(
      (variant) => variant.type === "video/mp4" || /\.mp4(?:\?|$)/i.test(variant.src),
    );
    return source && safeUrl(source.src)
      ? { src: safeUrl(source.src), poster: safeUrl(legacy.poster), loop: true }
      : undefined;
  }
  const media = props.tweet.mediaDetails?.find((item) => item.type !== "photo");
  const source = media?.video_info?.variants
    .filter((variant) => variant.content_type === "video/mp4")
    .sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))[0];
  return source && safeUrl(source.url)
    ? {
        src: safeUrl(source.url),
        poster: safeUrl(media?.media_url_https),
        loop: media?.type === "animated_gif",
      }
    : undefined;
});
const preview = computed(() => {
  const values = props.tweet.card?.binding_values;
  if (!values || photos.value.length || video.value) return undefined;
  const image = safeUrl(
    values.thumbnail_image_large?.image_value?.url ??
      values.photo_image_full_size_large?.image_value?.url ??
      values.summary_photo_image_large?.image_value?.url,
  );
  if (!image) return undefined;
  return {
    image,
    title: values.title?.string_value,
    description: values.description?.string_value,
    href:
      safeUrl(values.card_url?.string_value ?? props.tweet.entities?.urls?.[0]?.expanded_url) ??
      url.value,
  };
});
const timestamp = computed(() => {
  const date = new Date(props.tweet.created_at ?? "");
  if (Number.isNaN(date.getTime())) return undefined;
  return {
    iso: date.toISOString(),
    label:
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC",
      }).format(date) + " UTC",
  };
});
</script>

<template>
  <div class="flex min-w-0 flex-col gap-4">
    <header class="flex items-start justify-between gap-3 tracking-normal">
      <div class="flex min-w-0 items-center gap-3">
        <a :href="profileUrl" target="_blank" rel="noopener noreferrer" class="shrink-0">
          <img
            :src="safeUrl(tweet.user.profile_image_url_https)"
            :alt="`Profile picture of ${tweet.user.name}`"
            width="48"
            height="48"
            class="size-12 rounded-full border object-cover"
            loading="lazy"
          />
        </a>
        <div class="min-w-0">
          <a
            :href="profileUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 font-medium text-foreground hover:opacity-80"
          >
            <span class="truncate" :title="tweet.user.name">{{ tweet.user.name }}</span>
            <svg
              v-if="tweet.user.verified || tweet.user.is_blue_verified"
              viewBox="0 0 24 24"
              class="size-4 shrink-0 text-blue-500"
              role="img"
              aria-label="Verified account"
            >
              <path
                fill="currentColor"
                d="m12 1 3 2 3.6.4.9 3.5L22 10l-1 3.4.1 3.6-3.3 1.5-2.2 2.9-3.6-.7-3.4 1.2-2.6-2.5-3.5-1-.4-3.6L1 12l2-3 .4-3.6 3.5-.9L10 2Z"
              />
              <path d="m7.5 12 3 3 6-6" fill="none" stroke="white" stroke-width="2" />
            </svg>
          </a>
          <a
            :href="profileUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block truncate text-sm text-muted-foreground hover:text-foreground"
            >@{{ tweet.user.screen_name }}</a
          >
        </div>
      </div>
      <a
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="shrink-0 text-muted-foreground transition-transform hover:scale-105 hover:text-foreground"
        aria-label="Open tweet on X"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" class="size-5" aria-hidden="true">
          <path
            d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165Z"
          />
        </svg>
      </a>
    </header>
    <p v-if="tweet.in_reply_to_screen_name" class="text-sm text-muted-foreground">
      Replying to
      <a
        :href="`https://x.com/${encodeURIComponent(tweet.in_reply_to_screen_name)}${tweet.in_reply_to_status_id_str ? `/status/${encodeURIComponent(tweet.in_reply_to_status_id_str)}` : ''}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-500 hover:underline"
        >@{{ tweet.in_reply_to_screen_name }}</a
      >
    </p>
    <p
      :lang="tweet.lang"
      dir="auto"
      class="whitespace-pre-wrap break-words text-[15px] font-normal leading-relaxed tracking-normal text-foreground"
    >
      <template v-for="(segment, index) in segments" :key="index"
        ><a
          v-if="segment.href"
          :href="segment.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline"
          >{{ segment.text }}</a
        ><span v-else>{{ segment.text }}</span></template
      >
    </p>
    <a
      v-if="tweet.note_tweet"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-sm text-blue-500 hover:underline"
      >Show more on X</a
    >
    <template v-if="photos.length || video || preview">
      <button
        v-if="tweet.possibly_sensitive && !sensitiveVisible"
        type="button"
        class="rounded-xl border p-6 text-sm hover:bg-muted"
        @click="sensitiveVisible = true"
      >
        Show sensitive media
      </button>
      <div v-else class="min-w-0">
        <video
          v-if="video"
          :key="video.src"
          :poster="video.poster"
          controls
          muted
          :loop="video.loop"
          playsinline
          preload="metadata"
          class="max-h-96 w-full rounded-xl border"
        >
          <source :src="video.src" type="video/mp4" />
          <a :href="url" target="_blank" rel="noopener noreferrer">Watch this video on X</a>
        </video>
        <div
          v-if="photos.length"
          class="flex snap-x snap-mandatory gap-3 overflow-x-auto"
          tabindex="0"
          aria-label="Tweet photos"
        >
          <a
            v-for="(photo, index) in photos"
            :key="photo.url"
            :href="safeUrl(photo.url)"
            target="_blank"
            rel="noopener noreferrer"
            :class="['shrink-0 snap-center', photos.length === 1 ? 'w-full' : 'w-5/6']"
          >
            <img
              :src="safeUrl(photo.url)"
              :width="photo.width"
              :height="photo.height"
              :alt="photo.alt_text ?? `Photo ${index + 1} by ${tweet.user.name}: ${tweet.text}`"
              loading="lazy"
              class="h-64 w-full rounded-xl border object-cover"
            />
          </a>
        </div>
        <a
          v-if="preview"
          :href="preview.href"
          target="_blank"
          rel="noopener noreferrer"
          class="block overflow-hidden rounded-xl border hover:bg-muted/50"
        >
          <img
            :src="preview.image"
            :alt="preview.title ?? 'Link preview'"
            loading="lazy"
            class="max-h-64 w-full object-cover"
          />
          <div v-if="preview.title || preview.description" class="space-y-1 p-3">
            <p class="font-medium">{{ preview.title }}</p>
            <p class="text-sm text-muted-foreground">{{ preview.description }}</p>
          </div>
        </a>
      </div>
    </template>
    <div v-if="tweet.quoted_tweet && !quoted" class="rounded-xl border p-3">
      <TweetContent :tweet="tweet.quoted_tweet" quoted />
    </div>
    <footer
      v-if="
        timestamp || tweet.favorite_count !== undefined || tweet.conversation_count !== undefined
      "
      class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
    >
      <a
        v-if="timestamp"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline"
        ><time :datetime="timestamp.iso">{{ timestamp.label }}</time></a
      >
      <a
        v-if="tweet.favorite_count !== undefined"
        :href="`https://x.com/intent/like?tweet_id=${encodeURIComponent(tweet.id_str)}`"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-foreground"
        >{{ tweet.favorite_count.toLocaleString("en-US") }} likes</a
      >
      <a
        v-if="tweet.conversation_count !== undefined"
        :href="`https://x.com/intent/tweet?in_reply_to=${encodeURIComponent(tweet.id_str)}`"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-foreground"
        >{{ tweet.conversation_count.toLocaleString("en-US") }} replies</a
      >
    </footer>
  </div>
</template>
```

```vue [tweet-card/tweet-card.vue]
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
import { cn } from "@/lib/utils";
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
```

:::

## Usage

Pass a public tweet ID. Use the slots to replace the loading and unavailable states.

```vue
<script setup lang="ts">
import ClientTweetCard from "@/components/spark-ui/client-tweet-card/client-tweet-card.vue";
</script>

<template>
  <ClientTweetCard id="1668408059125702661">
    <template #fallback>Loading tweet...</template>
    <template #not-found="{ error }">
      <p>{{ error ? "The tweet request failed." : "This tweet is unavailable." }}</p>
    </template>
  </ClientTweetCard>
</template>
```

Pass `tweet` instead of `id` to render a supplied `TweetData` object. Supplied data takes priority and skips the request.
The demo starts with a saved response. Select Load live tweet to request the entered ID from the public API.

## Props

| Prop           | Type                        | Default | Description                                                              |
| -------------- | --------------------------- | ------- | ------------------------------------------------------------------------ |
| `id`           | `string`                    | None    | Public tweet ID.                                                         |
| `tweet`        | `TweetData`                 | None    | Supplied syndication data. This skips the request.                       |
| `apiUrl`       | `string`                    | None    | Full endpoint URL. It takes priority over the default URL.               |
| `fetchOptions` | `RequestInit`               | None    | Fetch configuration, including headers and a cancellation signal.        |
| `onError`      | `(error: Error) => unknown` | None    | Called for request errors. Its return value is passed to the error slot. |
| `class`        | `string`                    | None    | Classes for the card.                                                    |
| `className`    | `string`                    | None    | Upstream class prop.                                                     |

## Slots

| Slot        | Slot data            | Description                                               |
| ----------- | -------------------- | --------------------------------------------------------- |
| `fallback`  | None                 | Replaces the loading skeleton inside the card.            |
| `not-found` | `{ error: unknown }` | Replaces the unavailable or failed state inside the card. |

## Behavior

The component starts requests after mounting. It does not fetch during server rendering.
Without supplied data, the server and initial browser render show the same loading skeleton. Without an ID or endpoint, they show the unavailable state.

Changes to the ID, endpoint, supplied data, or fetch configuration object cancel the previous request. Unmounting cancels active requests and removes cancellation listeners.
A late response cannot replace a newer tweet. A missing or private tweet shows the unavailable state without calling `onError`.
Request failures show the error state and call `onError`.

The shared renderer preserves line breaks and links text entities. An entity is a marked range in the tweet text.
Vue escapes text instead of rendering HTML. Links and media accept only HTTP or HTTPS URLs.
Author details, verification, timestamps, counts, reply context, and quoted tweets appear when the response includes those fields.

Photos scroll horizontally. Videos use native controls and do not autoplay.
Sensitive media stays hidden until the reader selects its button. Link previews appear when the response includes a thumbnail and no photo or video.
The loading skeleton respects reduced motion.

## Endpoint

The default endpoint is `https://react-tweet.vercel.app/api/tweet/{id}`. React Tweet uses this same public endpoint in the browser.
A custom `apiUrl` must return JSON with the shape `{ data: TweetData | null }`. Pass the complete URL, including the ID.
If the endpoint uses another origin, it must allow your site through CORS. CORS is the browser rule for access across origins.

The public service has no uptime guarantee. Network restrictions, removed tweets, and rate limits can prevent a live request.
For a production site, use your own server endpoint and cache public responses there. The shared `getTweetFromSyndication` helper can fetch public data on that server.
Do not call that helper from the browser. X's syndication endpoint does not provide a browser CORS contract.

## Source

Ported from [Magic UI Client Tweet Card](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/client-tweet-card.tsx).
The endpoint contract follows [React Tweet's browser hook](https://github.com/vercel/react-tweet/blob/main/packages/react-tweet/src/hooks.ts).
Vue props and slots replace React nodes and the `components.TweetNotFound` override. The shared renderer comes from [Tweet Card](/components/tweet-card).
