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
