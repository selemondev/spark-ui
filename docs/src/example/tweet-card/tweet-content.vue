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
    label: `${new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(date)} UTC`,
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
