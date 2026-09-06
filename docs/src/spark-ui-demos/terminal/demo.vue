<script setup lang="ts">
import AnimatedSpan from "../../components/spark-ui/terminal/animated-span.vue";
import Terminal from "../../components/spark-ui/terminal/terminal.vue";
import TypingAnimation from "../../components/spark-ui/terminal/typing-animation.vue";
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

      <AnimatedSpan :delay="4000" class="text-green-500">
        <span>✔ Checking registry.</span>
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

      <AnimatedSpan :delay="6000" class="text-blue-500">
        <span>ℹ Updated 1 file:</span>
        <span class="pl-2">- lib/utils.ts</span>
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
