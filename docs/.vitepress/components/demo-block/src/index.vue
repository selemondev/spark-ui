<script lang='ts' setup name="demo-block">
import { useClipboard, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import DotPattern from '../../../../components/DotPattern/DotPattern.vue'
import { cn } from '../../../../lib/utils'
import { demoProps } from './index'

const props = defineProps(demoProps)

const decodedHighlightedCode = computed(() =>
  decodeURIComponent(props.highlightedCode),
)
const { copy, copied } = useClipboard({ source: decodeURIComponent(props.code) })
const [value, toggle] = useToggle()
</script>

<template>
  <div class="mt-6">
    <div
      class="relative flex h-96 w-full bg-[#fffefe] p-6 flex-col items-center justify-center overflow-hidden rounded-lg border-parent dark:border-none bg-background md:shadow-md c-#282f38 overflow-x-scroll dark:bg-[#000000] flex-wrap [&:o-button-base]:!c-context vp-raw bg"
    >
      <div class="w-full py-6 h-full">
        <div class="border-child relative rounded-md w-full h-full flex items-center justify-center dark:border-none">
          <p
            class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white"
          >
            <slot />
          </p>
          <DotPattern
            :class="cn(
              '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
            )"
          />
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
        </div>
      </div>
    </div>
    <div v-show="value" :class="`language-${lang} extra-class`" v-html="decodedHighlightedCode" />
    <!-- <div
      class="relative flex h-72 w-full flex-col items-center justify-center c-#282f38  overflow-hidden rounded-lg border dark:bg-[#000000] [md:shadow-xl c-#282f38 overflow-x-scroll !border-gray-700 dark:bg-[#000000] dark:border-#fff flex-wrap [&:o-button-base]:!c-context vp-raw b"
    >
      <p class="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        <slot />
      </p>
      <DotPattern
        :class-name="cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]',
        )"
      />
    </div> -->
    <!-- <div class="relative">
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
      </div> -->
  </div>
</template>

<style scoped>
.border-parent {
  border: 1px solid rgb(247, 246, 246);
}

.dark .dark-border-parent {
  border: 1px solid rgb(183, 23, 23);
  /* dark mode border color */
}

.border-child {
  border: 1px solid rgb(239, 239, 239);
}
</style>
