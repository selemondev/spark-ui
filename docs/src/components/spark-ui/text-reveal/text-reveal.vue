<script lang="ts">
import {
  Comment,
  computed,
  defineComponent,
  h,
  isVNode,
  shallowRef,
  type PropType,
  type VNodeChild,
} from "vue";
import { motion, useScroll, useTransform, type MotionValue } from "motion-v";
import { cn } from "../../../lib/utils";

const RevealWord = defineComponent({
  name: "TextRevealWord",
  props: {
    progress: { type: Object as PropType<MotionValue<number>>, required: true },
    range: { type: Array as unknown as PropType<[number, number]>, required: true },
    word: { type: String, required: true },
  },
  setup(props) {
    // Hardware-accelerated scroll animations turn this range into WAAPI keyframe
    // offsets, and WAAPI fills missing 0/1 offsets with the element's base opacity.
    // Spanning the whole timeline holds each word hidden before and shown after it.
    const inputRange = computed(() => [0, props.range[0], props.range[1], 1]);
    const opacity = useTransform(props.progress, inputRange, [0, 0, 1, 1]);
    return () =>
      h("span", { class: "relative mx-1 lg:mx-1.5", "aria-hidden": true }, [
        h("span", { class: "absolute opacity-30" }, props.word),
        h(
          motion.span,
          { style: { opacity }, class: "text-black dark:text-white" },
          { default: () => props.word },
        ),
      ]);
  },
});

function extractText(child: VNodeChild): string {
  if (typeof child === "string" || typeof child === "number") return String(child);
  if (Array.isArray(child)) return child.map(extractText).join("");
  if (
    isVNode(child) &&
    child.type !== Comment &&
    (Array.isArray(child.children) || typeof child.children === "string")
  ) {
    return extractText(child.children);
  }
  return "";
}

// Sticky positioning and native view timelines both use the nearest scroll
// container, so the JS scroll tracking must measure against the same element.
function getScrollContainer(el: HTMLElement): HTMLElement | undefined {
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY !== "visible" && overflowY !== "clip") return node;
  }
  return undefined;
}

export default defineComponent({
  name: "TextReveal",
  inheritAttrs: false,
  props: { className: String },
  setup(props, { slots, attrs }) {
    const sectionRef = shallowRef<HTMLElement>();
    const scrollContainer = shallowRef<HTMLElement>();
    const { scrollYProgress } = useScroll({ target: sectionRef, container: scrollContainer });

    // Template refs resolve before child mounted hooks, so the words' scroll
    // animations see the real container when they attach.
    const setSection = (el: unknown) => {
      sectionRef.value = el instanceof HTMLElement ? el : undefined;
      scrollContainer.value = sectionRef.value && getScrollContainer(sectionRef.value);
    };

    return () => {
      const text = extractText(slots.default?.() ?? []);
      const words = text.split(" ");
      return h(
        "div",
        {
          ...attrs,
          ref: setSection,
          class: cn("relative z-0 h-[200vh]", props.className, attrs.class as string),
        },
        [
          h(
            "div",
            {
              class:
                "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20",
            },
            [
              h("span", { class: "sr-only" }, text),
              h(
                "span",
                {
                  class:
                    "flex flex-wrap p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20",
                },
                words.map((word, index) =>
                  h(RevealWord, {
                    key: index,
                    word,
                    progress: scrollYProgress,
                    range: [index / words.length, (index + 1) / words.length],
                  }),
                ),
              ),
            ],
          ),
        ],
      );
    };
  },
});
</script>
