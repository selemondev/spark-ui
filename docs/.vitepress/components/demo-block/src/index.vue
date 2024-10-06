<script lang='ts' setup name="demo-block">
import { Icon } from '@iconify/vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { useData } from 'vitepress'
import { computed, ref } from 'vue'
import { MagicString } from 'vue/compiler-sfc'
import DotPattern from '../../../../src/components/spark-ui/DotPattern/DotPattern.vue'
import { cn } from '../../../../src/lib/utils'
import { demoProps } from './index'

const props = defineProps(demoProps)

const vitePressData = useData()

const decodedHighlightedCode = computed(() => {
  try {
    const decodeHighlightedCode = decodeURIComponent(props.highlightedCode)
    const updatedCode = updateImportPaths(decodeHighlightedCode)
    return updatedCode
  }
  catch (error) {
    console.error('Error decoding highlighted code:', error)
    return props.highlightedCode
  }
})

function updateImportPaths(code: string): string {
  const magicString = new MagicString(code)

  magicString.replaceAll('../../components/spark-ui/', '@/components/')
  magicString.replaceAll('../../../lib/utils', '@/libs/utils')
  magicString.replaceAll('../../lib/utils', '@/libs/utils')

  return magicString.toString()
}
const { copy, copied } = useClipboard({ source: decodeURIComponent(props.code) })
const [value, toggle] = useToggle()
const refreshKey = ref(0)
function handleRefreshComponent() {
  refreshKey.value += 1
}
</script>

<template>
  <div class="mt-6 relative">
    <div
      class="relative flex h-[600px] w-full bg-[#fffefe] flex-col items-center justify-center overflow-hidden rounded-lg border-parent dark:border-none bg-background c-#282f38 overflow-x-scroll dark:bg-[#000000] flex-wrap [&:o-button-base]:!c-context vp-raw bg"
    >
      <DotPattern
        class="absolute inset-0 size-full" :class="cn(
          '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]',
        )"
      />
      <button type="button" class="absolute right-6 text-black top-2 hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] p-2 rounded-md" @click="handleRefreshComponent">
        <Icon
          icon="ic:round-replay" class="text-black w-5 h-5 dark:text-white"
        />
      </button>
      <div class="relative w-[90%] md:w-3/4 h-[500px] py-6">
        <div class="border-child bg-white shadow-lg dark:bg-black relative rounded-md w-full h-full flex items-center justify-center dark:border-none">
          <p class="z-10">
            <slot :key="refreshKey" />
          </p>
        </div>
        <div class="relative">
          <div v-if="vitePressData.page.value.filePath !== 'index.md'" class="flex justify-end pt-3 gap-2">
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
    <div>
      <div v-show="value" :class="`language-${lang} extra-class`" v-html="decodedHighlightedCode" />
    </div>
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
  border: 1px solid #e4e4e7;
}

.dark .dark-border-parent {
  border: 1px solid rgb(183, 23, 23);
  /* dark mode border color */
}

.border-child {
  border: 1px solid rgb(239, 239, 239);
}

.rotate-0 {
  transform: rotate(0deg);
}

.rotate-45 {
  transform: rotate(45deg);
}
</style>
