<script setup lang="ts">
import ScrollVelocityContainer from "../../components/spark-ui/scroll-based-velocity/scroll-based-velocity.vue";
import ScrollVelocityRow from "../../components/spark-ui/scroll-based-velocity/scroll-velocity-row.vue";
</script>

<template>
  <div class="relative w-[min(760px,75vw)] overflow-hidden py-10">
    <ScrollVelocityContainer class="space-y-4 text-4xl font-bold tracking-tight md:text-6xl">
      <ScrollVelocityRow :base-velocity="20" :direction="1"
        ><span class="px-4">Velocity Scroll</span></ScrollVelocityRow
      >
      <ScrollVelocityRow :base-velocity="20" :direction="-1"
        ><span class="px-4">Velocity Scroll</span></ScrollVelocityRow
      >
    </ScrollVelocityContainer>
    <p class="mt-8 text-center text-sm text-muted-foreground">
      Scroll the page up and down to change speed and direction.
    </p>
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"
    />
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"
    />
  </div>
</template>
