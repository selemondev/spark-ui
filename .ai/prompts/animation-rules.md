# Animation Migration Rules (Framer Motion to Motion for Vue)

When a MagicUI source component uses Framer Motion (`framer-motion` or `motion/react`), migrate its behavior to Motion for Vue (the `motion-v` package). Preserve the animation's intent and feel; do not downgrade rich, interactive motion into plain CSS.

## Imports

Import primitives from `motion-v`, mirroring the React API:

```ts
import type { MotionProps } from "motion-v";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion-v";
```

## Required Behavior Mappings

| Framer Motion (React)                         | Motion for Vue (`motion-v`)                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `motion.*` elements                           | `<motion.* />` components or directives                                              |
| `variants` objects                            | Equivalent Vue-side variant objects                                                  |
| Spring transitions                            | Preserve `stiffness`, `damping`, `mass`, `bounce`, and `duration` where possible     |
| Stagger orchestration                         | Preserve parent/child timing                                                         |
| `whileHover`, `whileTap`, drag, pan, gestures | Keep interactive and gesture-aware                                                   |
| Viewport / in-view animations                 | Stay viewport-aware                                                                  |
| Scroll-linked animations (`useScroll`)        | Stay scroll-linked                                                                   |
| Layout / shared-layout animations             | Preserve when `motion-v` supports them                                               |
| `AnimatePresence`                             | Use the `motion-v` presence API, or Vue transitions when no direct equivalent exists |

## Forbidden Simplifications

- Do not convert Framer Motion springs into generic CSS `transition` values.
- Do not replace scroll-linked or viewport animation with a one-time CSS animation.
- Do not drop gestures because the Vue syntax differs.
- Do not flatten variants into static classes.

## When a Feature Is Missing

If a Motion for Vue feature is unavailable, document the limitation in the pull request and preserve the closest equivalent behavior using `motion-v`, Vue transitions, and guarded browser APIs.
