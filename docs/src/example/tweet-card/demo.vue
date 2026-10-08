<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import TweetCard from "./tweet-card.vue";
import type { TweetData } from "./tweet-data";

// A saved public tweet response. This demo does not fetch tweet data.
const sampleTweet: TweetData = {
  id_str: "1668408059125702661",
  text: "Companies spend $30,000+ and several weeks to build beautiful landing pages like @linear, @wopehq  and @reflectnotes \n\n\u2728I built @reactjs + @tailwindcss components for you to do the same in hours, starting at just $29 \n\nPre-order link + demo below \uD83D\uDC47\n\n#buildinpublic @buildspace https://t.co/kqz9c723ci",
  user: {
    name: "Dillion",
    screen_name: "dillionverma",
    is_blue_verified: true,
    verified: false,
    profile_image_url_https:
      "https://pbs.twimg.com/profile_images/1902402394475880448/w8lUXnEe_normal.jpg",
  },
  lang: "en",
  created_at: "2023-06-13T00:00:53.000Z",
  display_text_range: [0, 277],
  entities: {
    hashtags: [
      {
        indices: [250, 264],
        text: "buildinpublic",
      },
    ],
    media: [
      {
        display_url: "pic.x.com/kqz9c723ci",
        expanded_url: "https://x.com/dillionverma/status/1668408059125702661/video/1",
        indices: [277, 300],
      },
    ],
    user_mentions: [
      {
        indices: [81, 88],
        screen_name: "linear",
      },
      {
        indices: [90, 97],
        screen_name: "wopehq",
      },
      {
        indices: [103, 116],
        screen_name: "reflectnotes",
      },
      {
        indices: [128, 136],
        screen_name: "reactjs",
      },
      {
        indices: [139, 151],
        screen_name: "tailwindcss",
      },
      {
        indices: [265, 276],
        screen_name: "buildspace",
      },
    ],
  },
  video: {
    poster:
      "https://pbs.twimg.com/ext_tw_video_thumb/1668388166598787079/pu/img/mA7mfmJyXKLcGmo_.jpg",
    variants: [
      {
        type: "application/x-mpegURL",
        src: "https://video.twimg.com/ext_tw_video/1668388166598787079/pu/pl/jH_-zF5KwTei1htv.m3u8?tag=12",
      },
      {
        type: "video/mp4",
        src: "https://video.twimg.com/ext_tw_video/1668388166598787079/pu/vid/480x270/rWVkbpQFowBCt-vE.mp4?tag=12",
      },
      {
        type: "video/mp4",
        src: "https://video.twimg.com/ext_tw_video/1668388166598787079/pu/vid/640x360/nYFKhWYN3GwKzWL1.mp4?tag=12",
      },
      {
        type: "video/mp4",
        src: "https://video.twimg.com/ext_tw_video/1668388166598787079/pu/vid/1280x720/cgF7yrTZB8KcydKN.mp4?tag=12",
      },
    ],
  },
  favorite_count: 508,
  conversation_count: 42,
};

// Scale the tweet down (never up) so the whole card fits the preview area. Below
// MIN_SCALE the text gets too small, so the preview scrolls instead.
const MAX_WIDTH = 480;
const MIN_SCALE = 0.66;
const frame = ref<HTMLElement>();
const sizer = ref<HTMLElement>();
const content = ref<HTMLElement>();
let observer: ResizeObserver | undefined;

function fit() {
  const box = frame.value;
  const slot = sizer.value;
  const card = content.value;
  if (!box || !slot || !card) return;
  const style = getComputedStyle(box);
  const width =
    box.clientWidth - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight);
  const height =
    box.clientHeight - Number.parseFloat(style.paddingTop) - Number.parseFloat(style.paddingBottom);
  let scale = 1;
  // A narrower card is taller, so settle width and scale together.
  for (let i = 0; i < 4; i++) {
    card.style.width = `${Math.min(MAX_WIDTH, width / scale)}px`;
    scale = Math.min(1, height / card.offsetHeight, width / card.offsetWidth);
  }
  scale = Math.max(MIN_SCALE, scale);
  card.style.width = `${Math.min(MAX_WIDTH, width / scale)}px`;
  card.style.transform = `scale(${scale})`;
  const rect = card.getBoundingClientRect();
  slot.style.width = `${rect.width}px`;
  slot.style.height = `${rect.height}px`;
}

onMounted(() => {
  observer = new ResizeObserver(fit);
  observer.observe(frame.value!);
  observer.observe(content.value!);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div ref="frame" class="flex size-full justify-center overflow-y-auto p-4">
    <div ref="sizer" class="my-auto shrink-0">
      <div ref="content" class="origin-top-left">
        <TweetCard :tweet="sampleTweet" class="[&_video]:max-h-40 [&_video]:object-cover" />
      </div>
    </div>
  </div>
</template>
