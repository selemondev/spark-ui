<script setup lang="ts">
import GlareHover from "./glare-hover.vue";
</script>

<template>
  <GlareHover class="rounded-xl" color="#505050" :duration="700">
    <div
      class="w-full rounded-xl border border-border bg-card text-center text-card-foreground shadow-sm"
    >
      <div class="flex flex-col gap-1.5 p-6">
        <p class="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          14-day free trial · No card required
        </p>
        <h3 class="text-2xl font-semibold leading-none tracking-tight">
          Ready to get started?
        </h3>
        <p class="mx-auto max-w-sm text-sm text-muted-foreground">
          Join 4,000+ teams already using our platform to ship faster.
        </p>
      </div>
      <div class="flex items-center justify-center gap-2 p-6 pt-0">
        <button
          class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Start free trial
        </button>
        <button
          class="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          View demo
        </button>
      </div>
    </div>
  </GlareHover>
</template>
