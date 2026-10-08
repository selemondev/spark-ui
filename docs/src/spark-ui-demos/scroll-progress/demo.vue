<script setup lang="ts">
import { ref } from "vue";
import ScrollProgress from "../../components/spark-ui/scroll-progress/scroll-progress.vue";

const scroller = ref<HTMLElement | null>(null);
</script>

<template>
  <div
    class="relative h-[400px] max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-[500px] overflow-hidden rounded-lg border bg-background"
  >
    <ScrollProgress :container="scroller" class-name="absolute" />
    <div ref="scroller" class="size-full overflow-y-auto px-6 py-5 text-sm leading-relaxed">
      <h3 class="mb-3 text-lg font-semibold">Scroll this area</h3>
      <p v-for="n in 6" :key="n" class="mb-4 text-neutral-600 dark:text-neutral-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ut repellat voluptates qui
        officia recusandae similique accusamus quis, mollitia temporibus incidunt doloribus totam
        impedit dolorem optio fugiat eveniet consectetur repudiandae ducimus. Fugiat numquam ipsam
        nobis dolores. Qui ullam excepturi, odit magni voluptates est vitae autem accusantium,
        consequatur rem nihil eum. Ad accusamus possimus exercitationem nostrum corrupti error quam
        blanditiis.
      </p>
    </div>
  </div>
</template>
