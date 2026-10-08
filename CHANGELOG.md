# Changelog

## v2.0.0

[compare changes](https://github.com/selemondev/spark-ui/compare/v1.0.0...v2.0.0)

### ✨ Highlights

- Restore maintenance-script type checking and explicit Node ESM imports.
- Correct demo source utility imports to match the installation guide's `@/lib/utils` path.
- Stop requiring the intentionally removed sync guide and watcher workflow during normalization.
- Update PostCSS to 8.5.28 and pin the existing Vite+ catalog versions to prevent unrelated toolchain upgrades.
- Confine Markdown content negotiation to real files inside the documentation root, including symlink targets.
- Pin installation examples to Tailwind CSS 3 and tailwind-merge 2 so the documented CLI and configuration work.
- Remove stray Markdown from the copied Animated Gradient Text Vue example.
- Resolve registry paths correctly in checkouts whose names contain spaces or URL-escaped characters.
- Align workspace commands and aliases with the existing docs package; remove the unused declaration-build dependency.
- Remove the stale npm lockfile in favor of the single workspace lockfile.
- Apply compatible security updates to form-data, Immutable, brace-expansion, JS-YAML, Browserslist and the PostCSS selector parser.
- Validate releases before creating them on GitHub; align CI with Node 22, current action runtimes and the existing typecheck/normalization gates.
- Fail closed on missing or malformed issue registries, and let dry-run/stale-closure modes run without issue-generation prompts.
- Compute repeatable major releases from the current version and reject invalid arguments, unchanged versions and existing tags before release writes.
- Restart typing animation from current text and timing, without setup-time timers or a full-text flash; cancel pending work on unmount.
- Give Cool Mode instances independent overlays and cancel held-pointer work on teardown; honor particle limits and zero launch speeds.
- Keep one animation per grid square and cancel superseded generations on resize, option changes and unmount.
- Reveal normalized reactive list slots with cancellable timing, preserving keyed additions/removals and notification class updates.
- Make Code Comparison portable to ordinary Vue apps and keep asynchronous highlighting aligned with the latest code and theme.
- Respect reduced-motion preferences locally in copied Line Shadow Text and Light Rays components while retaining readable static decoration.
- Process the existing Tailwind animation utilities in documentation builds without replacing VitePress resets; disambiguate Glare Hover transition timing.
- Honor reactive blur variants, duration and viewport margins without replacing the motion directive's captured binding.
- Scale Android artwork in its original coordinate system and keep device screen masks unique across simultaneous instances.
- Give Hero Video Dialog native modal semantics, named controls, keyboard dismissal, focus restoration and exit-aware teardown.
- Make mobile navigation keyboard-operable with associated menu state, Escape dismissal and initial scroll measurement; align copied links with the router-free component.
- Implement roving keyboard navigation and direction-aware expansion for File Tree while keeping collapsed descendants inert and initial-state APIs unchanged.
- Replace the old Motion for Vue beta with stable `motion-v` 2.4.2; retain VueUse Motion for existing directives and verify modal, tooltip, terminal and scroll consumers.
- Render line breaks in Text Animate's character and word modes instead of joining lines.
- Serialize shared theme transitions, handle skipped promises, clean up owned animations on unmount and fully cover the viewport with star reveals.
- Keep rotating reveal text valid after replacements, cancel stale repeat timers and interpret foreground tokens as HSL colors.
- Destroy Globe renderers on unmount, preserve host-document styles and distinguish a zero-coordinate drag from no interaction.
- Track terminal slot text during rendering and restart owned typing timers on content or timing changes, including delayed unmounts.
- Keep Hyper Text synchronized with reactive prop and slot replacements before, during and after scrambling; tolerate empty character sets.
- Honor zero Glyph Matrix mutation rates and rebuild changed cell geometry; keep copied usage independent of VitePress.
- Rebuild Flickering Grid dimensions when geometry props change and keep intersection transitions from scheduling duplicate frame loops.
- Resolve Icon Cloud source precedence and scaled pointer coordinates consistently, reject stale image completions and supply valid self-contained demo artwork.
- Preserve pending confetti requests and explicit canvas options; default both confetti components to independent non-worker renderers.
- Expose finite, bounded progressbar values and geometry, including invalid ranges and non-finite input.
- Keep gradient and shiny text styling reactive and provide self-contained copied examples with the correct shimmer prerequisite.
- Update avatar styling reactively and render optional remaining-person counts without empty navigation links.
- Keep Bento Grid and card class props reactive and document the copied example's icon dependency.
- Give avatar tooltips focus and keyboard activation, associated descriptions and Escape dismissal.
- Update letter-based text reactively with stable positional keys and one accessible heading per phrase.
- Keep marquee tracks nonshrinking and react to direction, orientation and repeat changes; hide inert visual copies from accessibility.
- Apply valid reactive orbit reversal and make the copied orbit example independent of unpublished icon helpers.
- Recompute Aurora Text gradient colors and speed when props change.
- Fill the entire skewed scroll cycle with an equal following track, keeping repeated content inert and hidden from accessibility.
- Provide the documented semantic color tokens to live previews without changing VitePress's document reset or layout.
- Register the intended `@` source alias instead of accidental `find` and `replacement` aliases in the documentation Vite configuration.
- Place the six newer component families under canonical source ownership, preserving implementations while making registry discovery and copied usage imports consistent.
- Switch the repository package manager from pnpm to bun and pin framer-motion/motion-dom to the versions motion-v 2.4.2 works with, restoring variant propagation to child motion components.
- Fix broken animations: File Tree collapse, Magic Card dark-mode orb blending, Shiny Button dark-mode styles, Resizable Navbar scrolled background, Text Reveal progress inside scroll containers, Text Animate `once`, and the Animated Gradient Text, Terminal and Marquee demos.
- Keep VitePress prose styles, dark-mode link colors and UnoCSS attributify rules for SVG attributes and component props out of demo previews.
- Contain every documentation demo inside its preview card and size demos to fit it at desktop, tablet and mobile widths.
- Add optional `container` props to Cool Mode, Hero Video Dialog, Scroll Progress and Resizable Navbar, and `contained` props to Pointer and Smooth Cursor, so their effects can stay inside an element instead of the viewport.
- Size Globe's cobe render buffer from the canvas width so small globes render centered.

### 🚀 Enhancements

- Port remaining MagicUI components with docs, examples and demos ([7905c2a](https://github.com/selemondev/spark-ui/commit/7905c2a))

### 🩹 Fixes

- **animated-beam:** Render on iOS Safari and Chrome ([dc5f926](https://github.com/selemondev/spark-ui/commit/dc5f926))
- **animated-beam:** Animate gradient via SMIL for WebKit support ([a73a1cc](https://github.com/selemondev/spark-ui/commit/a73a1cc))
- **animated-beam:** Apply WebKit fix to Multiple Outputs demo copy ([cdd376c](https://github.com/selemondev/spark-ui/commit/cdd376c))
- **scripts:** Restore Node ESM resolution and type checking ([1ebc99a](https://github.com/selemondev/spark-ui/commit/1ebc99a))
- **docs:** Align copied utility imports with installation ([6478813](https://github.com/selemondev/spark-ui/commit/6478813))
- **scripts:** Stop requiring retired sync assets ([3ec5315](https://github.com/selemondev/spark-ui/commit/3ec5315))
- **docs:** Confine Markdown requests to documentation root ([0754bc0](https://github.com/selemondev/spark-ui/commit/0754bc0))
- **examples:** Remove Markdown from gradient text source ([b0d059c](https://github.com/selemondev/spark-ui/commit/b0d059c))
- **registry:** Decode filesystem paths from module URLs ([0d4445a](https://github.com/selemondev/spark-ui/commit/0d4445a))
- **tooling:** Target existing documentation workspace ([312c644](https://github.com/selemondev/spark-ui/commit/312c644))
- **ci:** Validate before creating GitHub releases ([b60ea5d](https://github.com/selemondev/spark-ui/commit/b60ea5d))
- **automation:** Validate issue inputs before remote mutations ([1efb4a0](https://github.com/selemondev/spark-ui/commit/1efb4a0))
- **release:** Select the next major and reject duplicate versions ([999daf7](https://github.com/selemondev/spark-ui/commit/999daf7))
- **typing-animation:** Restart current text and cancel stale timers ([89e6956](https://github.com/selemondev/spark-ui/commit/89e6956))
- **cool-mode:** Isolate particles and stop held effects on unmount ([03279a1](https://github.com/selemondev/spark-ui/commit/03279a1))
- **animated-grid-pattern:** Bound animations to current square generations ([6342804](https://github.com/selemondev/spark-ui/commit/6342804))
- **animated-list:** Reveal reactive slots with cancellable timing ([7135566](https://github.com/selemondev/spark-ui/commit/7135566))
- **code-comparison:** Remove VitePress coupling and stale highlights ([e3730ac](https://github.com/selemondev/spark-ui/commit/e3730ac))
- **decorative-motion:** Keep static shadows and rays for reduced motion ([6e7d7f5](https://github.com/selemondev/spark-ui/commit/6e7d7f5))
- **docs:** Generate configured Tailwind animations without resetting layout ([541b424](https://github.com/selemondev/spark-ui/commit/541b424))
- **blur:** Honor reactive variants timing and viewport margins ([d15a696](https://github.com/selemondev/spark-ui/commit/d15a696))
- **device-frames:** Preserve artwork coordinates and isolate screen masks ([9ff80c5](https://github.com/selemondev/spark-ui/commit/9ff80c5))
- **hero-video-dialog:** Preserve modal focus through animated dismissal ([3430186](https://github.com/selemondev/spark-ui/commit/3430186))
- **resizable-navbar:** Associate keyboard controls and restore menu focus ([6e5292a](https://github.com/selemondev/spark-ui/commit/6e5292a))
- **file-tree:** Implement visible node keyboard traversal ([df58003](https://github.com/selemondev/spark-ui/commit/df58003))
- **theme-toggle:** Serialize transitions and clean up skipped animations ([4d196ce](https://github.com/selemondev/spark-ui/commit/4d196ce))
- **dia-text-reveal:** Reset stale cycles and resolve foreground colors ([251aae5](https://github.com/selemondev/spark-ui/commit/251aae5))
- **globe:** Destroy renderers without changing host document styles ([ec39728](https://github.com/selemondev/spark-ui/commit/ec39728))
- **terminal:** Track reactive slot text and cancel typing timers ([781b47c](https://github.com/selemondev/spark-ui/commit/781b47c))
- **hyper-text:** Retain current prop and slot content through scrambling ([c47e967](https://github.com/selemondev/spark-ui/commit/c47e967))
- **glyph-matrix:** Honor static cells and rebuild changed geometry ([005137c](https://github.com/selemondev/spark-ui/commit/005137c))
- **flickering-grid:** Rebuild reactive geometry with one animation loop ([acd9c0f](https://github.com/selemondev/spark-ui/commit/acd9c0f))
- **icon-cloud:** Align source selection and scaled pointer interaction ([94c4ad0](https://github.com/selemondev/spark-ui/commit/94c4ad0))
- **confetti:** Preserve pending bursts and independent canvas ownership ([d1872b5](https://github.com/selemondev/spark-ui/commit/d1872b5))
- **progress:** Expose bounded accessible values and finite geometry ([e613d56](https://github.com/selemondev/spark-ui/commit/e613d56))
- **decorative-text:** React to class changes and complete copied examples ([f1a9f36](https://github.com/selemondev/spark-ui/commit/f1a9f36))
- **avatar-circles:** Render optional counts without empty links ([44fa57b](https://github.com/selemondev/spark-ui/commit/44fa57b))
- **bento-grid:** Keep declared layout classes reactive ([d89d317](https://github.com/selemondev/spark-ui/commit/d89d317))
- **animated-tooltip:** Expose keyboard descriptions and dismissal ([3a14bf7](https://github.com/selemondev/spark-ui/commit/3a14bf7))
- **letter-motion:** Preserve reactive phrases and heading semantics ([8c90504](https://github.com/selemondev/spark-ui/commit/8c90504))
- **marquee:** Preserve reactive nonshrinking accessible tracks ([d59982b](https://github.com/selemondev/spark-ui/commit/d59982b))
- **orbiting-circles:** Apply reactive animation reversal ([952702a](https://github.com/selemondev/spark-ui/commit/952702a))
- **aurora:** React to gradient color and speed changes ([c8bd9d1](https://github.com/selemondev/spark-ui/commit/c8bd9d1))
- **skewed-scroll:** Fill the loop with an inert following track ([53defa0](https://github.com/selemondev/spark-ui/commit/53defa0))
- **docs:** Supply semantic color tokens for component previews ([125f1ca](https://github.com/selemondev/spark-ui/commit/125f1ca))
- **docs:** Register the intended source alias ([ae770c3](https://github.com/selemondev/spark-ui/commit/ae770c3))
- **components:** Align newer families with canonical source ownership ([ed5421d](https://github.com/selemondev/spark-ui/commit/ed5421d))
- **dock:** Use viewport coordinates for pointer magnification ([3a841f3](https://github.com/selemondev/spark-ui/commit/3a841f3))
- **interactive-hover-button:** Avoid form submission and duplicate accessible content ([58c73cc](https://github.com/selemondev/spark-ui/commit/58c73cc))
- **lens:** Keep magnified content inert and hidden from accessibility ([cb9bad1](https://github.com/selemondev/spark-ui/commit/cb9bad1))
- **particles:** Correct transparent layers and copied background examples ([75c301a](https://github.com/selemondev/spark-ui/commit/75c301a))
- **retro-grid:** Retain reactive presentation classes ([eb05f0a](https://github.com/selemondev/spark-ui/commit/eb05f0a))
- **ripple:** Resolve semantic border colors and reactive classes ([b111c49](https://github.com/selemondev/spark-ui/commit/b111c49))
- **docs:** Expose keyboard demo controls and portable copied imports ([80482b7](https://github.com/selemondev/spark-ui/commit/80482b7))
- **globe:** Center sphere and fill wrapper so it renders and rotates ([d0182f9](https://github.com/selemondev/spark-ui/commit/d0182f9))
- **text-3d-flip:** Keep word spacing and type the Intl.Segmenter guard ([febd38f](https://github.com/selemondev/spark-ui/commit/febd38f))
- **components:** Resolve motion-v type gaps in number-ticker, spinning-text, pointer, shiny-button, text-animate ([eb62e47](https://github.com/selemondev/spark-ui/commit/eb62e47))
- **terminal:** Adapt surface, border and text to dark mode ([d0b382a](https://github.com/selemondev/spark-ui/commit/d0b382a))
- **animated-list:** Use theme-safe dark styles for notification ([aa5023c](https://github.com/selemondev/spark-ui/commit/aa5023c))
- **resizable-navbar:** Dark-mode hover pill for nav items ([81233c2](https://github.com/selemondev/spark-ui/commit/81233c2))
- **animated-beam:** Recompute path via ResizeObserver and post-flush watch ([2bd823b](https://github.com/selemondev/spark-ui/commit/2bd823b))
- **icon-cloud:** Correct depth-based scale and opacity ([979eff4](https://github.com/selemondev/spark-ui/commit/979eff4))
- **letter-up:** Use millisecond stagger delay ([47eb394](https://github.com/selemondev/spark-ui/commit/47eb394))
- **resizable-navbar:** Responsive width without fixed min-width ([6bfbb66](https://github.com/selemondev/spark-ui/commit/6bfbb66))
- **lint:** Uppercase hex literal and rename dotted-map computed to avoid key collision ([e3bf526](https://github.com/selemondev/spark-ui/commit/e3bf526))
- **docs:** Correct dead tweet-card link that failed the build ([680c43c](https://github.com/selemondev/spark-ui/commit/680c43c))
- **lint:** Use decimal max code point to avoid hex-case/formatter conflict ([83a76d7](https://github.com/selemondev/spark-ui/commit/83a76d7))
- **deps:** Pin framer-motion and motion-dom to the versions pnpm resolved ([eb1acc3](https://github.com/selemondev/spark-ui/commit/eb1acc3))
- **text-animate:** Pass `once` through motion-v inViewOptions ([894c980](https://github.com/selemondev/spark-ui/commit/894c980))
- **docs:** Keep VitePress prose styles out of demo previews ([1118c8b](https://github.com/selemondev/spark-ui/commit/1118c8b))
- **file-tree:** Animate folder collapse from its measured height ([c6806dc](https://github.com/selemondev/spark-ui/commit/c6806dc))
- **magic-card:** Use screen blending for the orb in dark mode ([28f3008](https://github.com/selemondev/spark-ui/commit/28f3008))
- **shiny-button:** Scope dark-mode styles to the button ([46c5ca2](https://github.com/selemondev/spark-ui/commit/46c5ca2))
- **resizable-navbar:** Show the scrolled background in dark mode ([65672ce](https://github.com/selemondev/spark-ui/commit/65672ce))
- **text-reveal:** Reveal words across the scroll range in scroll containers ([c97eaba](https://github.com/selemondev/spark-ui/commit/c97eaba))
- **animated-gradient-text:** Restore the moving gradient border in the demo ([521485d](https://github.com/selemondev/spark-ui/commit/521485d))
- **terminal:** Sequence demo lines after the command finishes typing ([3416aa6](https://github.com/selemondev/spark-ui/commit/3416aa6))
- **marquee:** Pause the reverse vertical column on hover in the demo ([b691275](https://github.com/selemondev/spark-ui/commit/b691275))
- **docs:** Contain demos inside the preview card ([f290330](https://github.com/selemondev/spark-ui/commit/f290330))
- **docs:** Keep dark-mode doc link colors out of demo previews ([95d0618](https://github.com/selemondev/spark-ui/commit/95d0618))
- **docs:** Stop UnoCSS attributify from styling SVG attributes and props ([3af688d](https://github.com/selemondev/spark-ui/commit/3af688d))
- **cool-mode:** Confine particles to an optional container ([264dad6](https://github.com/selemondev/spark-ui/commit/264dad6))
- **hero-video-dialog:** Open the dialog inside an optional container ([c9fcf9b](https://github.com/selemondev/spark-ui/commit/c9fcf9b))
- **scroll-progress:** Track an optional scroll container ([b65770d](https://github.com/selemondev/spark-ui/commit/b65770d))
- **resizable-navbar:** Track an optional scroll container ([56b596e](https://github.com/selemondev/spark-ui/commit/56b596e))
- **pointer:** Render the pointer inside its parent when contained ([f0794f9](https://github.com/selemondev/spark-ui/commit/f0794f9))
- **smooth-cursor:** Render the cursor inside its parent when contained ([12640e8](https://github.com/selemondev/spark-ui/commit/12640e8))
- **confetti:** Draw demo confetti inside the preview card ([e51557b](https://github.com/selemondev/spark-ui/commit/e51557b))
- **globe:** Size the render buffer from the canvas and fit the demo ([30e7efb](https://github.com/selemondev/spark-ui/commit/30e7efb))
- **text-animate:** Render line breaks and fit the demo ([6591227](https://github.com/selemondev/spark-ui/commit/6591227))
- **animated-shiny-text:** Fit the demo in the preview ([0c6f8d3](https://github.com/selemondev/spark-ui/commit/0c6f8d3))
- **avatar-circles:** Fit the demo in the preview ([a5d72e1](https://github.com/selemondev/spark-ui/commit/a5d72e1))
- **gradual-spacing:** Fit the demo in the preview ([6694a96](https://github.com/selemondev/spark-ui/commit/6694a96))
- **terminal:** Fit the demo in the preview ([1807dea](https://github.com/selemondev/spark-ui/commit/1807dea))
- **tweet-card:** Fit the demo in the preview ([cc43b2c](https://github.com/selemondev/spark-ui/commit/cc43b2c))
- **client-tweet-card:** Fit the demo in the preview ([77438f7](https://github.com/selemondev/spark-ui/commit/77438f7))
- **particles:** Fit the demo in the preview ([52ef1ba](https://github.com/selemondev/spark-ui/commit/52ef1ba))
- **safari:** Fit the demo in the preview ([a6a88e4](https://github.com/selemondev/spark-ui/commit/a6a88e4))
- **pixel-image:** Fit the demo in the preview ([5bc167b](https://github.com/selemondev/spark-ui/commit/5bc167b))
- **flickering-grid:** Fill the preview card ([8386ba2](https://github.com/selemondev/spark-ui/commit/8386ba2))
- **floating-3d-particles:** Fill the preview card ([f24e761](https://github.com/selemondev/spark-ui/commit/f24e761))
- **animated-grid-pattern:** Fill the preview card ([bf22cd9](https://github.com/selemondev/spark-ui/commit/bf22cd9))
- **orbiting-circles:** Fit the demo in the preview ([b7a60c2](https://github.com/selemondev/spark-ui/commit/b7a60c2))
- **iphone:** Fit the demo in the preview ([f297d64](https://github.com/selemondev/spark-ui/commit/f297d64))
- **android:** Fit the demo in the preview ([7c44321](https://github.com/selemondev/spark-ui/commit/7c44321))
- **code-comparison:** Fit the demo in the preview ([502b41a](https://github.com/selemondev/spark-ui/commit/502b41a))
- **bento-grid:** Fit the demo in the preview ([d4f8be3](https://github.com/selemondev/spark-ui/commit/d4f8be3))
- **letter-up:** Fit the demo in the preview ([29be80f](https://github.com/selemondev/spark-ui/commit/29be80f))
- **border-beam:** Fit the demo in the preview ([05d82c1](https://github.com/selemondev/spark-ui/commit/05d82c1))
- **backlight:** Fit the demo in the preview ([e882008](https://github.com/selemondev/spark-ui/commit/e882008))
- **magic-card:** Fit the demo in the preview ([d55f7e6](https://github.com/selemondev/spark-ui/commit/d55f7e6))
- **animated-beam:** Fit the demo in the preview ([91ef742](https://github.com/selemondev/spark-ui/commit/91ef742))
- **marquee:** Fill the preview card ([22ef02b](https://github.com/selemondev/spark-ui/commit/22ef02b))
- **hexagon-pattern:** Fill the preview card ([311993c](https://github.com/selemondev/spark-ui/commit/311993c))
- **text-3d-flip:** Fit the demo in the preview ([fdb88e6](https://github.com/selemondev/spark-ui/commit/fdb88e6))
- **warp-background:** Fit the demo in the preview ([e2a6592](https://github.com/selemondev/spark-ui/commit/e2a6592))
- **animated-list:** Fit the demo in the preview ([c215f77](https://github.com/selemondev/spark-ui/commit/c215f77))
- **aurora:** Fit the demo in the preview ([f686fef](https://github.com/selemondev/spark-ui/commit/f686fef))
- **blur-fade:** Fit the demo in the preview ([64da6c0](https://github.com/selemondev/spark-ui/commit/64da6c0))
- **comic-text:** Fit the demo in the preview ([db70418](https://github.com/selemondev/spark-ui/commit/db70418))
- **dia-text-reveal:** Fit the demo in the preview ([c8a854c](https://github.com/selemondev/spark-ui/commit/c8a854c))
- **dotted-map:** Fit the demo in the preview ([a920a16](https://github.com/selemondev/spark-ui/commit/a920a16))
- **file-tree:** Fit the demo in the preview ([5bb15ac](https://github.com/selemondev/spark-ui/commit/5bb15ac))
- **glare-hover:** Fit the demo in the preview ([8718193](https://github.com/selemondev/spark-ui/commit/8718193))
- **grid-pattern:** Fill the preview card ([e732ef6](https://github.com/selemondev/spark-ui/commit/e732ef6))
- **highlighter:** Fit the demo in the preview ([d18ed6e](https://github.com/selemondev/spark-ui/commit/d18ed6e))
- **icon-cloud:** Fit the demo in the preview ([e36f395](https://github.com/selemondev/spark-ui/commit/e36f395))
- **interactive-grid-pattern:** Fill the preview card ([7eef9d3](https://github.com/selemondev/spark-ui/commit/7eef9d3))
- **lens:** Fit the demo in the preview ([e80c23d](https://github.com/selemondev/spark-ui/commit/e80c23d))
- **light-rays:** Fit the demo in the preview ([4f5c0dd](https://github.com/selemondev/spark-ui/commit/4f5c0dd))
- **meteors:** Fit the demo in the preview ([eac0fae](https://github.com/selemondev/spark-ui/commit/eac0fae))
- **noise-texture:** Fit the demo in the preview ([2504045](https://github.com/selemondev/spark-ui/commit/2504045))
- **retro-grid:** Fill the preview card ([f26ef00](https://github.com/selemondev/spark-ui/commit/f26ef00))
- **ripple:** Fill the preview card ([3811772](https://github.com/selemondev/spark-ui/commit/3811772))
- **striped-pattern:** Fill the preview card ([948eaa5](https://github.com/selemondev/spark-ui/commit/948eaa5))
- **skewed-infinite-scroll:** Fit the demo in the preview ([bc9e1ae](https://github.com/selemondev/spark-ui/commit/bc9e1ae))
- **animated-tooltip:** Keep tooltips inside the preview ([929276a](https://github.com/selemondev/spark-ui/commit/929276a))
- **dock:** Fit the demo in the preview ([d4560d6](https://github.com/selemondev/spark-ui/commit/d4560d6))
- **aurora:** Keep the space between the demo's words ([7b67aa0](https://github.com/selemondev/spark-ui/commit/7b67aa0))

### 📖 Documentation

- Pin installation to compatible Tailwind major versions ([3098ad8](https://github.com/selemondev/spark-ui/commit/3098ad8))
- Complete copied examples and align installation prerequisites ([aa6e618](https://github.com/selemondev/spark-ui/commit/aa6e618))
- Use bun commands in development and release instructions ([85ee4f6](https://github.com/selemondev/spark-ui/commit/85ee4f6))
- **changelog:** Record bun migration, animation and preview-fit fixes ([cb58493](https://github.com/selemondev/spark-ui/commit/cb58493))

### 📦 Build

- Switch package manager from pnpm to bun ([0ff51be](https://github.com/selemondev/spark-ui/commit/0ff51be))
- **scripts:** Run workspace scripts and one-off tools through bun ([294b4a5](https://github.com/selemondev/spark-ui/commit/294b4a5))

### 🏡 Chore

- Stop tracking skills-lock.json ([4f2370a](https://github.com/selemondev/spark-ui/commit/4f2370a))
- **registry:** Refresh repaired canonical component inventory ([60aae0f](https://github.com/selemondev/spark-ui/commit/60aae0f))
- **demos:** Use a scenic wallpaper for android and iphone previews ([e5123cc](https://github.com/selemondev/spark-ui/commit/e5123cc))
- **registry:** Regenerate inventory for newly ported components ([46fd068](https://github.com/selemondev/spark-ui/commit/46fd068))
- **agent-issues:** Require bun commands in component port criteria ([c24f051](https://github.com/selemondev/spark-ui/commit/c24f051))
- **renovate:** Pin the bun toolchain instead of pnpm ([5151215](https://github.com/selemondev/spark-ui/commit/5151215))
- **lint:** Exclude bun.lock from lint ([e26b4fc](https://github.com/selemondev/spark-ui/commit/e26b4fc))

### ✅ Tests

- Remove arithmetic placeholder unrelated to component behavior ([2679c1a](https://github.com/selemondev/spark-ui/commit/2679c1a))
- **glare-hover:** Remove obsolete transition shorthand assertion ([bb5f064](https://github.com/selemondev/spark-ui/commit/bb5f064))
- Provide a localStorage polyfill for jsdom specs ([4336a51](https://github.com/selemondev/spark-ui/commit/4336a51))

### 🤖 CI

- Install dependencies and run scripts with bun ([fc8cf14](https://github.com/selemondev/spark-ui/commit/fc8cf14))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>

## v1.0.0

[compare changes](https://github.com/selemondev/spark-ui/compare/v1.0.0...v1.0.0)

### 🏡 Chore

- Release latest version ([000bf9f](https://github.com/selemondev/spark-ui/commit/000bf9f))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>

## v1.0.0

[compare changes](https://github.com/selemondev/spark-ui/compare/v0.0.2...v1.0.0)

### 🚀 Enhancements

- Add analytics and refactor codebase ([93ebf17](https://github.com/selemondev/spark-ui/commit/93ebf17))
- Add posthog plugin ([6228563](https://github.com/selemondev/spark-ui/commit/6228563))
- Implement Markdown for Agents content negotiation ([fca87b4](https://github.com/selemondev/spark-ui/commit/fca87b4))
- Add .agents dir ([77fc88b](https://github.com/selemondev/spark-ui/commit/77fc88b))
- Add Border Beam ([0015bf2](https://github.com/selemondev/spark-ui/commit/0015bf2))
- Add Android ([ad3487f](https://github.com/selemondev/spark-ui/commit/ad3487f))
- Add Animated Circular Progress Bar ([633141e](https://github.com/selemondev/spark-ui/commit/633141e))
- Add Animated Theme Toggler ([8043670](https://github.com/selemondev/spark-ui/commit/8043670))
- Add Animated Grid Pattern ([f32192e](https://github.com/selemondev/spark-ui/commit/f32192e))
- Add variants, fromCenter and controlled mode to Animated Theme Toggler ([0d28194](https://github.com/selemondev/spark-ui/commit/0d28194))
- Add Backlight ([bc536f3](https://github.com/selemondev/spark-ui/commit/bc536f3))
- Add Code Comparison ([ca175ba](https://github.com/selemondev/spark-ui/commit/ca175ba))
- Add Comic Text ([3262585](https://github.com/selemondev/spark-ui/commit/3262585))
- Remove agent docs ([195d094](https://github.com/selemondev/spark-ui/commit/195d094))
- Remove agent docs ([b24b006](https://github.com/selemondev/spark-ui/commit/b24b006))
- Add Confetti ([d768b5a](https://github.com/selemondev/spark-ui/commit/d768b5a))
- Add Cool Mode ([044b7f1](https://github.com/selemondev/spark-ui/commit/044b7f1))
- Add Dock ([88027ee](https://github.com/selemondev/spark-ui/commit/88027ee))
- Add Dia Text Reveal ([2b44a13](https://github.com/selemondev/spark-ui/commit/2b44a13))
- Add Dotted Map ([0ab434a](https://github.com/selemondev/spark-ui/commit/0ab434a))
- Add Flickering Grid ([957ee4b](https://github.com/selemondev/spark-ui/commit/957ee4b))
- Add File Tree ([4c791a8](https://github.com/selemondev/spark-ui/commit/4c791a8))
- Add Glare Hover ([03cd99f](https://github.com/selemondev/spark-ui/commit/03cd99f))
- Add Grid Pattern ([53424a3](https://github.com/selemondev/spark-ui/commit/53424a3))
- Add Glyph Matrix ([5997eed](https://github.com/selemondev/spark-ui/commit/5997eed))
- Add Hexagon Pattern ([3f82386](https://github.com/selemondev/spark-ui/commit/3f82386))
- Add Highlighter ([35db095](https://github.com/selemondev/spark-ui/commit/35db095))
- Add Hyper Text ([69a48f6](https://github.com/selemondev/spark-ui/commit/69a48f6))
- Add Interactive Grid Pattern ([7a904f3](https://github.com/selemondev/spark-ui/commit/7a904f3))
- Add Icon Cloud ([767d665](https://github.com/selemondev/spark-ui/commit/767d665))
- Add Interactive Hover Button ([5de62f4](https://github.com/selemondev/spark-ui/commit/5de62f4))
- Add iPhone ([cdd49bf](https://github.com/selemondev/spark-ui/commit/cdd49bf))
- Add Kinetic Text ([14d3a8d](https://github.com/selemondev/spark-ui/commit/14d3a8d))
- Add Lens ([5bb4d7c](https://github.com/selemondev/spark-ui/commit/5bb4d7c))
- Add Light Rays ([9c46c55](https://github.com/selemondev/spark-ui/commit/9c46c55))
- Add Line Shadow Text ([954b8a7](https://github.com/selemondev/spark-ui/commit/954b8a7))
- List all components in the navbar dropdown ([5a6a183](https://github.com/selemondev/spark-ui/commit/5a6a183))

### 🩹 Fixes

- Add vitepress-plugin-group-icons to root package.json for Vercel build ([3ee6666](https://github.com/selemondev/spark-ui/commit/3ee6666))
- Guard useScroll with onMounted to prevent SSR "document is not defined" error ([7d141c1](https://github.com/selemondev/spark-ui/commit/7d141c1))
- Vite config ([2308bca](https://github.com/selemondev/spark-ui/commit/2308bca))
- Address animated theme toggler review feedback ([18d2bc0](https://github.com/selemondev/spark-ui/commit/18d2bc0))
- Remove stray worktree gitlinks and ignore .claude/worktrees ([fe4b989](https://github.com/selemondev/spark-ui/commit/fe4b989))
- Scale Android mockup to fit demo containers ([b2d73e4](https://github.com/selemondev/spark-ui/commit/b2d73e4))
- Render Dia Text Reveal text and sweep animation ([2083026](https://github.com/selemondev/spark-ui/commit/2083026))
- Contain Code Comparison layout and match upstream styling ([852e1e0](https://github.com/selemondev/spark-ui/commit/852e1e0))
- Stabilize Dock magnification spring ([6ec2292](https://github.com/selemondev/spark-ui/commit/6ec2292))
- Render Border Beam animation correctly ([fba9748](https://github.com/selemondev/spark-ui/commit/fba9748))
- Render Flickering Grid canvas ([882f3d8](https://github.com/selemondev/spark-ui/commit/882f3d8))
- Constrain Glyph Matrix demo width to demo card ([867a2d6](https://github.com/selemondev/spark-ui/commit/867a2d6))
- Fit Glyph Matrix demo inside demo card ([1940a60](https://github.com/selemondev/spark-ui/commit/1940a60))
- Fit Flickering Grid demos inside demo card ([b400371](https://github.com/selemondev/spark-ui/commit/b400371))
- Fit Hexagon Pattern demos inside demo card ([2a2ae3c](https://github.com/selemondev/spark-ui/commit/2a2ae3c))
- Make Dock bar border visible without Preflight ([1c557bf](https://github.com/selemondev/spark-ui/commit/1c557bf))
- Fit Dotted Map demos inside demo card ([69d1868](https://github.com/selemondev/spark-ui/commit/69d1868))
- Theme-aware Border Beam demo card (light/dark) ([879a305](https://github.com/selemondev/spark-ui/commit/879a305))
- Theme-aware Cool Mode demo button (light/dark) ([30e102d](https://github.com/selemondev/spark-ui/commit/30e102d))
- Pair dark-mode text colors across component demos ([03f693e](https://github.com/selemondev/spark-ui/commit/03f693e))
- Contain Border Beam and Confetti demos, theme-aware Buy Now button ([03cb0f9](https://github.com/selemondev/spark-ui/commit/03cb0f9))
- Theme-aware text colors in dark mode ([a58b8be](https://github.com/selemondev/spark-ui/commit/a58b8be))
- Theme-aware text colors in dark mode ([e065cc7](https://github.com/selemondev/spark-ui/commit/e065cc7))

### 💅 Refactors

- Extract helpers in middleware to reduce duplication ([0bfe7ef](https://github.com/selemondev/spark-ui/commit/0bfe7ef))
- Codebase ([4d29674](https://github.com/selemondev/spark-ui/commit/4d29674))
- Mjs extensions to ts ([6b685f4](https://github.com/selemondev/spark-ui/commit/6b685f4))
- Remove tsconfig.json file from /scripts dir ([0940b48](https://github.com/selemondev/spark-ui/commit/0940b48))

### 📖 Documentation

- Update lucide-vue-next references to @lucide/vue in markdown docs ([f81d9d8](https://github.com/selemondev/spark-ui/commit/f81d9d8))
- Update docs ([bb383b0](https://github.com/selemondev/spark-ui/commit/bb383b0))
- Remove badges ([f0a2788](https://github.com/selemondev/spark-ui/commit/f0a2788))
- Sync animated theme toggler snippet with implementation ([03bbd17](https://github.com/selemondev/spark-ui/commit/03bbd17))

### 🏡 Chore

- **deps-dev:** Bump vite in the npm_and_yarn group across 1 directory ([c83241c](https://github.com/selemondev/spark-ui/commit/c83241c))
- Fix Vercel build failure and update deprecated dependencies ([20c1bc3](https://github.com/selemondev/spark-ui/commit/20c1bc3))
- Migrate lucide-vue-next to @lucide/vue, add @tsconfig/node20, fix lint errors ([5ef1f8d](https://github.com/selemondev/spark-ui/commit/5ef1f8d))
- Update migration prompts ([47b09ce](https://github.com/selemondev/spark-ui/commit/47b09ce))
- Migrate to viteplus ([f649893](https://github.com/selemondev/spark-ui/commit/f649893))
- Update baseUrl ([517d322](https://github.com/selemondev/spark-ui/commit/517d322))
- Update github release workflow ([7f1c595](https://github.com/selemondev/spark-ui/commit/7f1c595))
- **deps-dev:** Bump the npm_and_yarn group across 2 directories with 1 update ([e849d1f](https://github.com/selemondev/spark-ui/commit/e849d1f))
- Delete worktrees ([9a533cb](https://github.com/selemondev/spark-ui/commit/9a533cb))
- Remove agent docs ([9a33375](https://github.com/selemondev/spark-ui/commit/9a33375))
- Remove magic ui agent docs ([0958434](https://github.com/selemondev/spark-ui/commit/0958434))
- **deps-dev:** Bump vite in the npm_and_yarn group across 1 directory ([73e26ac](https://github.com/selemondev/spark-ui/commit/73e26ac))
- Dedupe and sort newComponents sidebar ([255365d](https://github.com/selemondev/spark-ui/commit/255365d))
- Add Light Rays to sidebar ([fa5d639](https://github.com/selemondev/spark-ui/commit/fa5d639))
- Normalize sidebar component arrays ([263a78e](https://github.com/selemondev/spark-ui/commit/263a78e))
- Update dependencies, add v1 release script, refresh README ([b5ae55d](https://github.com/selemondev/spark-ui/commit/b5ae55d))
- Remove .ai prompts and their script references ([b6226b7](https://github.com/selemondev/spark-ui/commit/b6226b7))
- Delete AGENTS.md and its README reference ([e6aa44a](https://github.com/selemondev/spark-ui/commit/e6aa44a))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>

## v0.0.2

[compare changes](https://github.com/selemondev/spark-ui/compare/v0.0.1...v0.0.2)

### 🚀 Enhancements

- Add 3D-Pin ([c326203](https://github.com/selemondev/spark-ui/commit/c326203))
- Add animated tooltip ([ce88807](https://github.com/selemondev/spark-ui/commit/ce88807))
- Add terminal ([317a61b](https://github.com/selemondev/spark-ui/commit/317a61b))
- Add hero dialog ([92647cb](https://github.com/selemondev/spark-ui/commit/92647cb))
- Add scroll progress ([509c381](https://github.com/selemondev/spark-ui/commit/509c381))
- Add aurora text ([f15c71d](https://github.com/selemondev/spark-ui/commit/f15c71d))
- Add resizable navbar ([789b1a5](https://github.com/selemondev/spark-ui/commit/789b1a5))

### 🩹 Fixes

- **docs:** Fixed Github edit links pointing to non existing files on main ([c659700](https://github.com/selemondev/spark-ui/commit/c659700))
- Marquee class props ([75aff44](https://github.com/selemondev/spark-ui/commit/75aff44))
- Animated-beam prop types ([abae10b](https://github.com/selemondev/spark-ui/commit/abae10b))
- Normalize import path ([4b21000](https://github.com/selemondev/spark-ui/commit/4b21000))

### 💅 Refactors

- Remove unused components ([4b351f5](https://github.com/selemondev/spark-ui/commit/4b351f5))

### 🏡 Chore

- **release:** V0.0.1 ([d28820e](https://github.com/selemondev/spark-ui/commit/d28820e))
- Release ([4894e28](https://github.com/selemondev/spark-ui/commit/4894e28))
- Add analytics ([1fef5e8](https://github.com/selemondev/spark-ui/commit/1fef5e8))
- Lint ([fca4e9f](https://github.com/selemondev/spark-ui/commit/fca4e9f))

### 🎨 Styles

- Fix nav items hovered background color ([8e5f168](https://github.com/selemondev/spark-ui/commit/8e5f168))

### ❤️ Contributors

- [Selemondev](https://github.com/selemondev)
- [Thomas Thomsen](twt@outlook.dk)

## v0.0.1

### 🚀 Enhancements

- Init Vitepress theme ([9b80d20](https://github.com/selemondev/spark-ui/commit/9b80d20))
- Init Vitepress theme ([1045624](https://github.com/selemondev/spark-ui/commit/1045624))
- Add animated beam component ([b592383](https://github.com/selemondev/spark-ui/commit/b592383))
- Add animated gradient text ([235cb82](https://github.com/selemondev/spark-ui/commit/235cb82))
- Add skewed infinite scroll component ([7de2f94](https://github.com/selemondev/spark-ui/commit/7de2f94))
- Add letter-up component ([058c33a](https://github.com/selemondev/spark-ui/commit/058c33a))
- Add animated shiny text component ([eed9c15](https://github.com/selemondev/spark-ui/commit/eed9c15))
- Add animated beam component ([cb94cf2](https://github.com/selemondev/spark-ui/commit/cb94cf2))
- Add bento component ([09b4300](https://github.com/selemondev/spark-ui/commit/09b4300))
- Add blurFade component ([0ef5cf4](https://github.com/selemondev/spark-ui/commit/0ef5cf4))
- Add blur in component ([d431001](https://github.com/selemondev/spark-ui/commit/d431001))
- Add globe component ([1d2fb6c](https://github.com/selemondev/spark-ui/commit/1d2fb6c))
- Add gradual spacing component ([e68e58e](https://github.com/selemondev/spark-ui/commit/e68e58e))
- Add orbiting circle component ([3449507](https://github.com/selemondev/spark-ui/commit/3449507))
- Add meteors-component ([3ccbc7a](https://github.com/selemondev/spark-ui/commit/3ccbc7a))
- Add typing animation component ([4a8f405](https://github.com/selemondev/spark-ui/commit/4a8f405))
- Add Marquee component ([b8a6d40](https://github.com/selemondev/spark-ui/commit/b8a6d40))
- Add ripple component ([7ca4556](https://github.com/selemondev/spark-ui/commit/7ca4556))
- Add particles component ([1b1dec3](https://github.com/selemondev/spark-ui/commit/1b1dec3))
- Add dot pattern component ([61a5d49](https://github.com/selemondev/spark-ui/commit/61a5d49))
- Add avatar circle component ([5eec89f](https://github.com/selemondev/spark-ui/commit/5eec89f))
- Add demo code block ([5681ed3](https://github.com/selemondev/spark-ui/commit/5681ed3))

### 🩹 Fixes

- Example components ([83dca08](https://github.com/selemondev/spark-ui/commit/83dca08))
- Gradient text animation ([6d9ee2d](https://github.com/selemondev/spark-ui/commit/6d9ee2d))
- Demo block component width ([b2d2147](https://github.com/selemondev/spark-ui/commit/b2d2147))
- DotPattern component path ([46717d3](https://github.com/selemondev/spark-ui/commit/46717d3))

### 💅 Refactors

- Tsconfig.json ([8d234f3](https://github.com/selemondev/spark-ui/commit/8d234f3))
- Meteors logic ( use Array.from() instead of new Array) ([0c7948a](https://github.com/selemondev/spark-ui/commit/0c7948a))

### 📖 Documentation

- Add README.md, LICENSE, CODE_OF_CONDUCT.md and CONTRIBUTING.md ([2bb5d04](https://github.com/selemondev/spark-ui/commit/2bb5d04))
- **tools:** Add Spark UI docs ([6b513d9](https://github.com/selemondev/spark-ui/commit/6b513d9))
- Delete shadcn-nuxt-docs as it is causing the site to fail ([1b59a01](https://github.com/selemondev/spark-ui/commit/1b59a01))
- Init Vitepress ([b398272](https://github.com/selemondev/spark-ui/commit/b398272))
- Init Vitepress ([e2514b6](https://github.com/selemondev/spark-ui/commit/e2514b6))
- Refactor home page ([5e19ce4](https://github.com/selemondev/spark-ui/commit/5e19ce4))
- Configure sidebar items ([dd95880](https://github.com/selemondev/spark-ui/commit/dd95880))
- Configure doc site ([1f7c79b](https://github.com/selemondev/spark-ui/commit/1f7c79b))
- Configure site ([7257bdc](https://github.com/selemondev/spark-ui/commit/7257bdc))
- Add introduction ([586e376](https://github.com/selemondev/spark-ui/commit/586e376))
- Config ([e1c11a8](https://github.com/selemondev/spark-ui/commit/e1c11a8))
- Add installation ([23d98a5](https://github.com/selemondev/spark-ui/commit/23d98a5))
- Add installation guide ([c43f326](https://github.com/selemondev/spark-ui/commit/c43f326))
- Add animated list ([b106282](https://github.com/selemondev/spark-ui/commit/b106282))

### 🏡 Chore

- Chore: init package.json ([c297217](https://github.com/selemondev/spark-ui/commit/c297217))
- Add .gitignore file ([13924f0](https://github.com/selemondev/spark-ui/commit/13924f0))
- Init tsconfig.json ([d0e7056](https://github.com/selemondev/spark-ui/commit/d0e7056))
- Init eslint-config ([461b017](https://github.com/selemondev/spark-ui/commit/461b017))
- Fix tsconfig.json **exclude** property ([d4e42b7](https://github.com/selemondev/spark-ui/commit/d4e42b7))
- Init vitest-config ([0088c38](https://github.com/selemondev/spark-ui/commit/0088c38))
- Add scripts, git hooks and format code ([2cd60e9](https://github.com/selemondev/spark-ui/commit/2cd60e9))
- Add github actions ([319e331](https://github.com/selemondev/spark-ui/commit/319e331))
- . ([0a75e7c](https://github.com/selemondev/spark-ui/commit/0a75e7c))
- Refactor scripts ([3692d64](https://github.com/selemondev/spark-ui/commit/3692d64))
- Use iconify componernt ([06ac35e](https://github.com/selemondev/spark-ui/commit/06ac35e))
- Remove unused deps ([7aaf1f1](https://github.com/selemondev/spark-ui/commit/7aaf1f1))
- Update home page component ([772493f](https://github.com/selemondev/spark-ui/commit/772493f))

### 🎨 Styles

- Homepage ([c085ab5](https://github.com/selemondev/spark-ui/commit/c085ab5))
- Homepage ([17802fe](https://github.com/selemondev/spark-ui/commit/17802fe))
- Update text style ([dda8e1c](https://github.com/selemondev/spark-ui/commit/dda8e1c))
- Add particles theme ([c14db51](https://github.com/selemondev/spark-ui/commit/c14db51))
- Home page component responsiveness ([924e393](https://github.com/selemondev/spark-ui/commit/924e393))

### ❤️ Contributors

- Selemondev <selemondev19@gmail.com>
- Selemondev19@gmail.com <selemondev19@gmail.com>
