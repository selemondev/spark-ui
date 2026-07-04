# Code Comparison

A component which compares two code snippets side by side with syntax highlighting, diff and focus support.

<demo src="../../src/example/code-comparison/demo.vue" srcCode="../../src/spark-ui-demos/code-comparison/code-comparison.vue" />

## Installation

Copy and paste the following code into your project:

::: code-group

```vue [code-comparison.vue]
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";
import { cn } from "@/lib/utils";

interface CodeComparisonProps {
  class?: string;
  beforeCode: string;
  afterCode: string;
  language: string;
  filename: string;
  lightTheme?: string;
  darkTheme?: string;
  highlightColor?: string;
}

const props = withDefaults(defineProps<CodeComparisonProps>(), {
  lightTheme: "github-light",
  darkTheme: "github-dark",
  highlightColor: "rgba(101, 117, 133, 0.16)",
});

const { isDark } = useData();

const highlightedBefore = ref("");
const highlightedAfter = ref("");

const selectedTheme = computed(() => (isDark.value ? props.darkTheme : props.lightTheme));

const hasLeftFocus = computed(() => /class="[^"]*\bfocused\b/.test(highlightedBefore.value));
const hasRightFocus = computed(() => /class="[^"]*\bfocused\b/.test(highlightedAfter.value));

async function highlightCode() {
  try {
    const { codeToHtml } = await import("shiki");
    const { transformerNotationHighlight, transformerNotationDiff, transformerNotationFocus } =
      await import("@shikijs/transformers");

    const transformers = [
      transformerNotationHighlight({ matchAlgorithm: "v3" }),
      transformerNotationDiff({ matchAlgorithm: "v3" }),
      transformerNotationFocus({ matchAlgorithm: "v3" }),
    ];

    const [before, after] = await Promise.all([
      codeToHtml(props.beforeCode, {
        lang: props.language,
        theme: selectedTheme.value,
        transformers,
      }),
      codeToHtml(props.afterCode, {
        lang: props.language,
        theme: selectedTheme.value,
        transformers,
      }),
    ]);

    highlightedBefore.value = before;
    highlightedAfter.value = after;
  } catch {
    highlightedBefore.value = "";
    highlightedAfter.value = "";
  }
}

onMounted(highlightCode);

watch(
  () => [props.beforeCode, props.afterCode, props.language, selectedTheme.value],
  () => {
    highlightCode();
  },
);
</script>

<template>
  <div :class="cn('mx-auto w-full max-w-5xl', props.class)">
    <div class="group border-border relative w-full overflow-hidden rounded-md border">
      <div class="relative grid md:grid-cols-2">
        <div
          :class="
            cn('leftside group/left border-primary/20 md:border-r', { 'has-focus': hasLeftFocus })
          "
        >
          <div
            class="border-primary/20 bg-accent text-foreground flex items-center border-b p-2 text-sm"
          >
            <svg
              class="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            {{ props.filename }}
            <span class="ml-auto hidden md:block">before</span>
          </div>
          <div
            v-if="highlightedBefore"
            class="shiki-code bg-background h-full w-full overflow-auto font-mono text-xs"
            :style="{ '--highlight-color': props.highlightColor }"
            v-html="highlightedBefore"
          />
          <pre
            v-else
            class="bg-background text-foreground h-full overflow-auto p-4 font-mono text-xs break-all"
            >{{ props.beforeCode }}</pre
          >
        </div>
        <div
          :class="
            cn('rightside group/right border-primary/20 border-t md:border-t-0', {
              'has-focus': hasRightFocus,
            })
          "
        >
          <div
            class="border-primary/20 bg-accent text-foreground flex items-center border-b p-2 text-sm"
          >
            <svg
              class="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            {{ props.filename }}
            <span class="ml-auto hidden md:block">after</span>
          </div>
          <div
            v-if="highlightedAfter"
            class="shiki-code bg-background h-full w-full overflow-auto font-mono text-xs"
            :style="{ '--highlight-color': props.highlightColor }"
            v-html="highlightedAfter"
          />
          <pre
            v-else
            class="bg-background text-foreground h-full overflow-auto p-4 font-mono text-xs break-all"
            >{{ props.afterCode }}</pre
          >
        </div>
      </div>
      <div
        class="border-primary/20 bg-accent text-foreground absolute top-1/2 left-1/2 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border text-xs md:flex"
      >
        VS
      </div>
    </div>
  </div>
</template>

<style scoped>
.shiki-code :deep(pre) {
  height: 100%;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  margin: 0;
  background-color: transparent !important;
}

.shiki-code :deep(pre > code) {
  display: inline-block;
  width: 100%;
}

.shiki-code :deep(pre > code > span) {
  display: inline-block;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}

.shiki-code :deep(pre > code > .highlighted) {
  display: inline-block;
  width: 100%;
  background-color: var(--highlight-color);
}

.shiki-code :deep(pre > code > .add) {
  background-color: rgba(16, 185, 129, 0.16);
}

.shiki-code :deep(pre > code > .remove) {
  background-color: rgba(244, 63, 94, 0.16);
}

.has-focus .shiki-code :deep(pre > code > :not(.focused)) {
  opacity: 0.5;
  filter: blur(0.095rem);
  transition: all 0.3s;
}

.group\/left:hover .shiki-code :deep(pre > code > :not(.focused)),
.group\/right:hover .shiki-code :deep(pre > code > :not(.focused)) {
  opacity: 1 !important;
  filter: none !important;
  transition: all 0.3s;
}
</style>
```

:::

This component uses [Shiki](https://shiki.style) for syntax highlighting. Make sure it is installed in your project:

```bash
npm install shiki @shikijs/transformers
```

## Usage

Use the `[!code highlight]`, `[!code ++]` / `[!code --]` and `[!code focus]` comment notations inside your code strings to highlight lines, mark diff additions/removals and focus specific lines respectively.

```vue
<script setup lang="ts">
import CodeComparison from "@/components/ui/code-comparison.vue";

const beforeCode = `const value = 1; // [!code --]`;
const afterCode = `const value = 2; // [!code ++]`;
</script>

<template>
  <CodeComparison
    :before-code="beforeCode"
    :after-code="afterCode"
    language="typescript"
    filename="example.ts"
  />
</template>
```

## Props

| Prop             | Type     | Default                     | Description                                            |
| ---------------- | -------- | --------------------------- | ------------------------------------------------------ |
| `class`          | `string` | `-`                         | The class name to be applied to the component          |
| `beforeCode`     | `string` | `-`                         | The code snippet to display in the "before" section    |
| `afterCode`      | `string` | `-`                         | The code snippet to display in the "after" section     |
| `language`       | `string` | `-`                         | The language of the code snippets (e.g., "typescript") |
| `filename`       | `string` | `-`                         | The filename to display for the code snippets          |
| `lightTheme`     | `string` | `github-light`              | The Shiki theme to use in light mode                   |
| `darkTheme`      | `string` | `github-dark`               | The Shiki theme to use in dark mode                    |
| `highlightColor` | `string` | `rgba(101, 117, 133, 0.16)` | The color to use for highlighting lines                |
