<script setup lang="ts">
import { ref, useId } from "vue";
import ShineBorder from "./shine-border.vue";

const id = useId();
const submitted = ref(false);
</script>

<template>
  <div
    class="relative w-[min(350px,70vw)] overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
  >
    <ShineBorder :shine-color="['#A07CFE', '#FE8FB5', '#FFBE7B']" />
    <h3 class="text-xl font-semibold text-neutral-950 dark:text-white">Login</h3>
    <p class="mt-2 text-sm text-neutral-500">Enter your credentials to access your account.</p>
    <form class="mt-6 grid gap-4" @submit.prevent="submitted = true">
      <div class="grid gap-2">
        <label :for="`${id}-email`" class="text-sm font-medium">Email</label>
        <input
          :id="`${id}-email`"
          type="email"
          placeholder="name@example.com"
          autocomplete="off"
          class="w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
        />
      </div>
      <div class="grid gap-2">
        <label :for="`${id}-password`" class="text-sm font-medium">Password</label>
        <input
          :id="`${id}-password`"
          type="password"
          autocomplete="off"
          class="w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
        />
      </div>
      <button
        type="submit"
        class="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
      >
        Sign In
      </button>
      <p class="text-xs text-neutral-500" aria-live="polite">
        {{ submitted ? "Demo submitted. No data was sent." : "Demo only. No data is sent." }}
      </p>
    </form>
  </div>
</template>
