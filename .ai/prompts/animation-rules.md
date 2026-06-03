# Animation Migration Rules

Framer Motion behavior must be migrated to Motion for Vue. Do not replace advanced Framer Motion behavior with plain CSS animations.

## Required Mappings

- `motion.*` React elements become Motion for Vue components or directives.
- Framer variants become equivalent Vue-side variant objects.
- Spring transitions preserve stiffness, damping, mass, bounce, and duration where possible.
- Stagger orchestration must preserve parent/child timing.
- `whileHover`, `whileTap`, drag, pan, and gesture states must remain interactive.
- Viewport and in-view animations must stay viewport-aware.
- Scroll-linked animations must stay scroll-linked.
- Layout animations and shared layout concepts must be preserved when the library supports them.
- `AnimatePresence` behavior must be represented with Vue transitions or Motion for Vue presence APIs when available.

## Forbidden Simplifications

- Do not convert Framer Motion springs to generic CSS `transition` values.
- Do not replace scroll or viewport animation with a one-time CSS animation.
- Do not remove gestures because Vue syntax is different.
- Do not flatten variants into static classes.

If a Motion for Vue feature is unavailable, document the limitation in the PR and preserve the closest equivalent behavior with Vue and browser APIs.
