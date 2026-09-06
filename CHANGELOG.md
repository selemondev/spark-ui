# Changelog

## Unreleased

### Fixes

- Restore maintenance-script type checking and explicit Node ESM imports.
- Correct demo source utility imports to match the installation guide's `@/lib/utils` path.
- Stop requiring the intentionally removed sync guide and watcher workflow during normalization.
- Update PostCSS to 8.5.28 and pin the existing Vite+ catalog versions to prevent unrelated toolchain upgrades.
- Confine Markdown content negotiation to real files inside the documentation root, including symlink targets.
- Pin installation examples to Tailwind CSS 3 and tailwind-merge 2 so the documented CLI and configuration work.
- Remove stray Markdown from the copied Animated Gradient Text Vue example.
- Resolve registry paths correctly in checkouts whose names contain spaces or URL-escaped characters.
- Align workspace commands and aliases with the existing docs package; remove the unused declaration-build dependency.
- Remove the stale npm lockfile; the pnpm lockfile is the authoritative dependency graph.
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
