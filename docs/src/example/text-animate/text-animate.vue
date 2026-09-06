<script lang="ts">
import { Comment, defineComponent, h, isVNode, type PropType, type VNodeChild } from "vue";
import { AnimatePresence, motion, type Variants } from "motion-v";
import { cn } from "../../lib/utils";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";
type ElementTag =
  | "article"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "li"
  | "p"
  | "section"
  | "span";

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.3 },
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 1.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
};

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

export default defineComponent({
  name: "TextAnimate",
  inheritAttrs: false,
  props: {
    className: String,
    segmentClassName: String,
    delay: { type: Number, default: 0 },
    duration: { type: Number, default: 0.3 },
    variants: Object as PropType<Variants>,
    as: { type: String as PropType<ElementTag>, default: "p" },
    by: { type: String as PropType<AnimationType>, default: "word" },
    startOnView: { type: Boolean, default: true },
    once: { type: Boolean, default: false },
    animation: { type: String as PropType<AnimationVariant>, default: "fadeIn" },
    accessible: { type: Boolean, default: true },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const text = extractText(slots.default?.() ?? []);
      const segments =
        props.by === "word"
          ? text.split(/(\s+)/)
          : props.by === "character"
            ? text.split("")
            : props.by === "line"
              ? text.split("\n")
              : [text];
      const stagger = props.duration / Math.max(segments.length, 1);
      const container: Variants = props.variants
        ? {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                opacity: { duration: 0.01, delay: props.delay },
                delayChildren: props.delay,
                staggerChildren: stagger,
              },
            },
            exit: { opacity: 0, transition: { staggerChildren: stagger, staggerDirection: -1 } },
          }
        : {
            ...defaultContainerVariants,
            show: {
              opacity: 1,
              transition: { delayChildren: props.delay, staggerChildren: stagger },
            },
            exit: { opacity: 0, transition: { staggerChildren: stagger, staggerDirection: -1 } },
          };
      const item = props.variants ?? defaultItemAnimationVariants[props.animation].item;
      return h(
        AnimatePresence,
        { mode: "popLayout" },
        {
          default: () =>
            h(
              motion[props.as] as any,
              {
                variants: container,
                initial: "hidden",
                whileInView: props.startOnView ? "show" : undefined,
                animate: props.startOnView ? undefined : "show",
                exit: "exit",
                viewport: { once: props.once },
                ...attrs,
                class: cn("whitespace-pre-wrap", props.className, attrs.class as string),
              },
              {
                default: () => [
                  ...(props.accessible ? [h("span", { class: "sr-only" }, text)] : []),
                  ...segments.map((segment, index) =>
                    h(
                      motion.span as any,
                      {
                        key: `${props.by}-${segment}-${index}`,
                        variants: item,
                        custom: index * staggerTimings[props.by],
                        class: cn(
                          props.by === "line" ? "block" : "inline-block whitespace-pre",
                          props.segmentClassName,
                        ),
                        "aria-hidden": props.accessible ? true : undefined,
                      },
                      { default: () => segment },
                    ),
                  ),
                ],
              },
            ),
        },
      );
    };
  },
});
</script>
