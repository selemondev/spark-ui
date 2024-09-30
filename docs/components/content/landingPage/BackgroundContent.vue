<script setup lang='ts'>
import Particles from '~/components/ui/particles/Particles.vue'

const props = defineProps<{
  color?: string
  colorDark?: string
}>()
const target = ref(null)
const targetIsVisible = ref(false)
const { _ } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    targetIsVisible.value = isIntersecting
  },
)
</script>

<template>
  <section class="relative">
    <div
      ref="target"
      class="after:bg-[radial-gradient(ellipse_100%_40%_at_50%_60%,rgba(var(--feature-color),0.1),transparent) relative -mt-14 flex flex-col items-center overflow-x-clip before:pointer-events-none before:absolute before:h-[35rem] before:w-[650px] before:bg-[conic-gradient(from_90deg_at_80%_50%,#000212,rgb(var(--feature-color-dark))),conic-gradient(from_270deg_at_20%_50%,rgb(var(--feature-color-dark)),#000212)] before:bg-no-repeat before:transition-[transform,opacity] before:duration-1000 before:ease-in before:[background-position:1%_0%,99%_0%] before:[background-size:50%_100%,50%_100%] before:[mask:radial-gradient(100%_50%_at_center_center,_black,_transparent)] after:pointer-events-none after:absolute after:inset-0 md:-mt-10 md:before:w-[1200px]"
      :class="{
        'is-visible before:opacity-100 before:[transform:rotate(180deg)_scale(2)]': targetIsVisible,
        'before:rotate-180 before:opacity-40': !targetIsVisible,
      }" :style="{
        '--feature-color': props.color, '--feature-color-dark': props.colorDark,
      }"
    >
      <div class="mb-16 mt-[19rem] w-full md:mb-[12.8rem] md:mt-[19.5rem]">
        <div
          class="relative before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_50%_50%_at_center,rgba(var(--feature-color),0.1),transparent)]"
        >
          <Container class="max-w-[90%] text-center">
            <div
              class="text-gradient mb-11 translate-y-[40%] text-center text-4xl leading-none [transition:transform_1000ms_cubic-bezier(0.3,_1.17,_0.55,_0.99)_0s] md:pt-0 md:text-5xl [.is-visible_&]:translate-y-0"
            >
              <h1 class="font-sans font-bold leading-tight tracking-tighter">
                Components
              </h1>
            </div>
          </Container>
        </div>
        <slot />
      </div>
    </div>
    <Particles :accelerate="true" />
  </section>
</template>
