<script setup lang="ts">
import TweetCard from "../../components/spark-ui/tweet-card/tweet-card.vue";
import type { TweetData } from "../../components/spark-ui/tweet-card/tweet-data";

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
</script>

<template>
  <div class="w-[min(440px,70vw)] space-y-3">
    <p class="text-center text-xs text-muted-foreground">
      Saved sample of a public tweet. Counts reflect the saved response.
    </p>
    <TweetCard :tweet="sampleTweet" />
  </div>
</template>
