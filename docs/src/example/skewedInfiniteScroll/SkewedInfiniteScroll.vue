<script setup lang='ts'>
import { computed } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { theme } = useTheme()
const currentTheme = computed(() => theme.value === 'auto' ? '#1f2937' : theme.value === 'light' ? '#f3f4f6' : '')

const items = [
  { id: '1', text: 'Spark UI' },
  { id: '2', text: 'Magic UI' },
  { id: '3', text: 'Spark UI' },
  { id: '4', text: 'Magic UI' },
  { id: '5', text: 'Spark UI' },
  { id: '6', text: 'Magic UI' },
  {
    id: '7',
    text: 'Spark UI',
  },
  {
    id: '8',
    text: 'Magic UI',
  },
]
</script>

<template>
  <div>
    <div class="flex items-center justify-center">
      <div
        class="relative w-full max-w-screen-lg overflow-hidden" :style="{
          maskComposite: 'intersect',
          maskImage: `
          linear-gradient(to right,  transparent, black 5rem),
          linear-gradient(to left,   transparent, black 5rem),
          linear-gradient(to bottom, transparent, black 5rem),
          linear-gradient(to top,    transparent, black 5rem)
        `,
        }"
      >
        <div class="mx-auto grid animate-skew-scroll grid-cols-1 gap-5 sm:grid-cols-2">
          <div v-for="item in items" :key="item.id">
            <div
              :key="item.id"
              class="flex cursor-pointer w-72 px-6 py-1 items-center space-x-2 rounded-md border-parent shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                class="h-6 w-6 flex-none text-red-500"
              >
                <path
                  d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p class="text-gray-600">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-parent {
  border: 1px solid v-bind(currentTheme);
}

.animate-skew-scroll {
  animation: SkewScroll 20s linear infinite;
}

@keyframes SkewScroll {
  0% {
    transform: rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0);
  }

  100% {
    transform: rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%);
  }
}
</style>
