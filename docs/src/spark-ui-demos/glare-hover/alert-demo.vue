<script setup lang="ts">
import GlareHover from "../../components/spark-ui/glare-hover/glare-hover.vue";
</script>

<template>
  <div class="flex flex-col gap-3">
    <GlareHover class="rounded-lg" :duration="550" :opacity="0.25">
      <div class="relative w-full rounded-lg border border-border bg-card p-4 text-card-foreground">
        <svg
          class="absolute left-4 top-4"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div class="pl-10">
          <h5 class="mb-1 font-medium leading-none tracking-tight">Action required</h5>
          <div class="text-sm text-muted-foreground">
            Your plan expires in 3 days. Renew to keep access.
          </div>
        </div>
      </div>
    </GlareHover>

    <GlareHover class="w-full rounded-lg" color="#ff6070" :opacity="0.25" :duration="550">
      <div
        class="relative w-full rounded-lg border border-destructive/50 bg-background p-4 text-destructive"
      >
        <svg
          class="absolute left-4 top-4"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
        <div class="pl-10">
          <h5 class="mb-1 font-medium leading-none tracking-tight">Payment declined</h5>
          <div class="text-sm">Check your card details and try again.</div>
        </div>
      </div>
    </GlareHover>

    <GlareHover class="w-full rounded-lg" color="#60ff70" :opacity="0.25" :duration="550">
      <div class="relative w-full rounded-lg border border-border bg-card p-4 text-card-foreground">
        <svg
          class="absolute left-4 top-4 stroke-emerald-500"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21.801 10A10 10 0 1 1 17 3.335" />
          <path d="m9 11 3 3L22 4" />
        </svg>
        <div class="pl-10">
          <h5 class="mb-1 font-medium leading-none tracking-tight text-emerald-500">
            Subscription confirmed
          </h5>
          <div class="text-sm text-emerald-500">
            You have full Pro access until April 5, 2027.
          </div>
        </div>
      </div>
    </GlareHover>
  </div>
</template>
