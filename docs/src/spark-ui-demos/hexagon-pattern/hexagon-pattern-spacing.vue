<script setup lang="ts">
import HexagonPattern from "../../components/spark-ui/hexagon-pattern/hexagon-pattern.vue";
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div
      class="relative flex h-[450px] w-[300px] items-center justify-center overflow-hidden rounded-lg p-20 md:w-[600px] lg:w-[850px]"
    >
      <HexagonPattern :gap="20" :radius="40" :x="-1" :y="-1" />
    </div>
  </div>
</template>
