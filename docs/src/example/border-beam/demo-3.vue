<script setup lang="ts">
import BorderBeam from "./border-beam.vue";
</script>

<template>
  <div class="flex items-center justify-center p-2">
    <div
      class="relative w-[350px] overflow-hidden rounded-xl border border-solid border-black/10 bg-white p-6 text-neutral-900 shadow-sm dark:border-white/15 dark:bg-neutral-950 dark:text-neutral-100"
    >
      <div class="space-y-1.5">
        <h3 class="text-lg font-semibold leading-none tracking-tight">Login</h3>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">Enter your credentials to access your account.</p>
      </div>
      <div class="mt-6 grid gap-4">
        <div class="flex flex-col space-y-1.5">
          <label class="text-sm font-medium" for="email-reverse">Email</label>
          <input
            id="email-reverse"
            type="email"
            placeholder="Enter your email"
            class="h-9 rounded-md border border-solid border-black/15 dark:border-white/20 bg-transparent px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div class="flex flex-col space-y-1.5">
          <label class="text-sm font-medium" for="password-reverse">Password</label>
          <input
            id="password-reverse"
            type="password"
            placeholder="Enter your password"
            class="h-9 rounded-md border border-solid border-black/15 dark:border-white/20 bg-transparent px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>
      <div class="mt-6 flex justify-between">
        <button
          class="h-9 rounded-md border border-solid border-black/15 dark:border-white/20 px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Register
        </button>
        <button
          class="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Login
        </button>
      </div>
      <BorderBeam
        :duration="4"
        :size="300"
        reverse
        class="from-transparent via-green-500 to-transparent"
      />
    </div>
  </div>
</template>
