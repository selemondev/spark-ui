<script setup lang="ts">
import { ref } from "vue";
import Safari from "../../components/spark-ui/safari/safari.vue";

const simple = ref(false);
</script>

<template>
  <div class="flex w-[min(760px,75vw)] flex-col items-center gap-5 py-6">
    <Safari
      url="mountains.example"
      image-src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85"
      image-alt="Mountains reflected in a lake"
      :mode="simple ? 'simple' : 'default'"
    />
    <button
      class="rounded-md border px-4 py-2 text-sm"
      :aria-pressed="simple"
      @click="simple = !simple"
    >
      Toggle simple toolbar
    </button>
  </div>
</template>
