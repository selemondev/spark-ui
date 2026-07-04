<script setup lang="ts">
import HexagonPattern from "../../components/spark-ui/hexagon-pattern/hexagon-pattern.vue";
import { cn } from "../../lib/utils";
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <div
      class="relative flex h-[450px] w-[300px] items-center justify-center overflow-hidden rounded-lg p-20 md:w-[500px]"
    >
      <HexagonPattern
        :radius="40"
        :x="-1"
        :y="-1"
        :class="
          cn('[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]')
        "
      />
    </div>
  </div>
</template>
