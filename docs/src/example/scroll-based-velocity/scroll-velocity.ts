import { useScroll, useSpring, useTransform, useVelocity } from "motion-v";
import type { MotionValue } from "motion-v";
import type { InjectionKey } from "vue";

export const scrollVelocityKey: InjectionKey<MotionValue<number>> = Symbol("scroll-velocity");

export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  return useTransform(smoothVelocity, (value) => {
    const sign = value < 0 ? -1 : 1;
    return sign * Math.min(5, (Math.abs(value) / 1000) * 5);
  });
}
