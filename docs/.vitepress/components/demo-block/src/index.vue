<script lang='ts' setup name="demo-block">
import { useClipboard, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { demoProps } from './index'

const props = defineProps(demoProps)

const decodedHighlightedCode = computed(() =>
  decodeURIComponent(props.highlightedCode),
)
const { copy, copied } = useClipboard({ source: decodeURIComponent(props.code) })
const [value, toggle] = useToggle()
</script>

<template>
  <ClientOnly>
    <div v-bind="$attrs" class="mt-6">
      <div class="p-8 c-#282f38 overflow-x-scroll  border border-light-700 rounded-sm dark:bg-[#000000] dark:border-#4C4D4F flex flex-wrap [&:o-button-base]:!c-context vp-raw bg">
        <slot />
      </div>
      <div class="relative">
        <div class="flex justify-end pt-3 gap-2">
          <a class="o-demo_action_item" group :href="github" target="_blank">
            <div class="o-demo_action_icon i-carbon-logo-github" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              Edit on GitHub
            </div>
          </a>
          <a class="o-demo_action_item" group @click="copy()">
            <div class="o-demo_action_icon i-carbon:copy" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              {{ copied ? 'Copied' : 'Copy code' }}
            </div>
          </a>
          <a class="o-demo_action_item" group @click="toggle()">
            <div class="o-demo_action_icon i-carbon:fit-to-width" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              {{ value ? 'Hide code' : 'Show code' }}
            </div>
          </a>
        </div>
        <div v-show="value" :class="`language-${lang} extra-class`" v-html="decodedHighlightedCode" />
      </div>
    </div>
  </ClientOnly>
</template>
