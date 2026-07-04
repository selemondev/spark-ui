<script setup lang="ts">
import GlareHover from "../../components/spark-ui/glare-hover/glare-hover.vue";

const features = ["Unlimited projects", "Team collaboration", "Advanced analytics"];
</script>

<template>
  <GlareHover class="rounded-xl" :duration="600">
    <div
      class="w-[340px] rounded-xl border border-border bg-card text-card-foreground shadow-sm"
    >
      <div class="flex flex-col gap-1.5 p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold leading-none tracking-tight">Pro</h3>
          <span
            class="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground"
          >
            Popular
          </span>
        </div>
        <p class="text-sm text-muted-foreground">For teams that need more.</p>
        <div class="flex items-baseline gap-1 pt-2">
          <span class="text-4xl font-semibold tracking-tight">$49</span>
          <span class="text-sm text-muted-foreground">/mo</span>
        </div>
      </div>
      <div class="flex flex-col gap-2.5 p-6 pt-0">
        <div v-for="f in features" :key="f" class="flex items-center gap-2 text-sm">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M12.5 3.5L6 10L2.5 6.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ f }}
        </div>
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" opacity="0.4" />
          </svg>
          SSO (coming soon)
        </div>
      </div>
      <div class="flex items-center p-6 pt-0">
        <button
          class="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get started
        </button>
      </div>
    </div>
  </GlareHover>
</template>
