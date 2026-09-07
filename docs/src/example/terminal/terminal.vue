<script setup lang="ts">
import { cn } from "../../lib/utils";

interface TerminalProps {
  className?: string;
}
const props = defineProps<TerminalProps>();
</script>

<template>
  <div
    :class="
      cn(
        'z-0 min-h-[300px] w-full max-w-lg rounded-xl !border !border-solid !border-gray-400 bg-background text-foreground shadow-sm dark:!border-neutral-800 dark:shadow-none',
        props.className,
      )
    "
  >
    <div
      class="flex flex-col gap-y-2 !border !border-solid !border-gray-400 p-4 dark:!border-neutral-800"
    >
      <div class="flex flex-row gap-x-2">
        <div class="h-3 w-3 rounded-full bg-red-500" />
        <div class="h-3 w-3 rounded-full bg-yellow-500" />
        <div class="h-3 w-3 rounded-full bg-green-500" />
      </div>
    </div>
    <pre class="px-4 h-auto -mt-5">
        <code class="grid gap-y-1">
            <slot />
        </code>
      </pre>
  </div>
</template>
