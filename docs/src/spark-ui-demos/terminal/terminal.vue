<script setup lang='ts'>
import { cn } from '@/lib/utils'

interface TerminalProps {
  className?: string
};
const props = defineProps<TerminalProps>()
</script>

<template>
  <div
    :class="cn(
      'z-0 min-h-[300px] w-full max-w-lg rounded-xl border border-gray-300 bg-white',
      props.className,
    )"
  >
    <div class="flex flex-col gap-y-2 border-b border-gray-300 p-4">
      <div class="flex flex-row gap-x-2">
        <div class="h-2 w-2 rounded-full bg-red-500" />
        <div class="h-2 w-2 rounded-full bg-yellow-500" />
        <div class="h-2 w-2 rounded-full bg-green-500" />
      </div>
    </div>
    <pre class="px-4 h-auto">
        <code class="grid gap-y-1">
            <slot />
        </code>
      </pre>
  </div>
</template>
