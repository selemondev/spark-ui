<script lang="ts">
import { motion, type Options } from "motion-v";
import { Comment, Fragment, Text, defineComponent, h, type PropType, type VNodeChild } from "vue";
import { cn } from "../../../lib/utils";

interface SpinningVariants {
  container?: Options["variants"];
  item?: Options["variants"];
}

function readText(node: VNodeChild): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(readText).join("");
  if (node.type === Comment) return "";
  if (node.type === Text || node.type === Fragment) return readText(node.children as VNodeChild);
  throw new Error("SpinningText requires plain text in its default slot.");
}

export default defineComponent({
  name: "SpinningText",
  props: {
    duration: { type: Number, default: 10 },
    reverse: { type: Boolean, default: false },
    radius: { type: Number, default: 5 },
    className: { type: String, default: undefined },
    transition: { type: Object as PropType<Options["transition"]>, default: undefined },
    variants: { type: Object as PropType<SpinningVariants>, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const text = readText(slots.default?.() ?? []);
      const letters = Array.from(text);
      letters.push(" ");
      const transition = {
        repeat: Infinity,
        ease: "linear" as const,
        ...props.transition,
        duration:
          (props.transition as { duration?: number } | undefined)?.duration ?? props.duration,
      };
      const containerVariants = {
        visible: { rotate: props.reverse ? -360 : 360 },
        ...props.variants?.container,
      };
      const itemVariants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        ...props.variants?.item,
      };
      return h(
        motion.div,
        {
          class: cn("relative", props.className),
          initial: "hidden",
          animate: "visible",
          variants: containerVariants,
          transition,
        },
        {
          default: () => [
            ...letters.map((letter, index) =>
              h(
                motion.span,
                {
                  key: `${index}-${letter}`,
                  "aria-hidden": "true",
                  variants: itemVariants,
                  class: "absolute left-1/2 top-1/2 inline-block",
                  style: {
                    transform: `translate(-50%, -50%) rotate(${(360 / letters.length) * index}deg) translateY(${-props.radius}ch)`,
                    transformOrigin: "center",
                  },
                },
                { default: () => letter },
              ),
            ),
            h("span", { class: "sr-only" }, text),
          ],
        },
      );
    };
  },
});
</script>
