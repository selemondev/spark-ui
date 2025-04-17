<script setup lang='ts'>
import AnimatedSpan from './AnimatedSpan.vue'
import Terminal from './Terminal.vue'
import TypingAnimation from './TypingAnimation.vue'
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <Terminal>
      <TypingAnimation>&gt; pnpm dlx shadcn-vue@latest init</TypingAnimation>
      <AnimatedSpan :delay="1500" class="text-green-500">
        <span>✔ Preflight checks.</span>
      </AnimatedSpan>

      <AnimatedSpan :delay="2000" class="text-green-500">
        <span>✔ Verifying framework. Found Nuxt.js.</span>
      </AnimatedSpan>

      <AnimatedSpan :delay="2500" class="text-green-500">
        <span>✔ Validating Tailwind CSS.</span>
      </AnimatedSpan>

      <AnimatedSpan :delay="3000" class="text-green-500">
        <span>✔ Validating import alias.</span>
      </AnimatedSpan>

      <AnimatedSpan :delay="3500" class="text-green-500">
        <span>✔ Writing components.json.</span>
      </AnimatedSpan>

      <AnimatedSpan :delay="4500" class="text-green-500">
        <span>✔ Updating tailwind.config.ts</span>
      </AnimatedSpan>

      <AnimatedSpan :delay="5000" class="text-green-500">
        <span>✔ Updating assets/css/main.css</span>
      </AnimatedSpan>

      <AnimatedSpan :delay="5500" class="text-green-500">
        <span>✔ Installing dependencies.</span>
      </AnimatedSpan>

      <TypingAnimation :delay="6500" class="text-muted-foreground">
        Success! Project initialization completed.
      </TypingAnimation>

      <TypingAnimation :delay="7000" class="text-muted-foreground">
        You may now add components.
      </TypingAnimation>
    </Terminal>
  </div>
</template>
