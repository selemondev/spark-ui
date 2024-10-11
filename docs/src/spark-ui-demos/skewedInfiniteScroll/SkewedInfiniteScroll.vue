<script setup lang='ts'>
import SkewedInfiniteScroll from '../../components/spark-ui/skewed-infinite-scroll/SkewedInfiniteScroll.vue'

const items = [
  { id: '1', text: 'Spark UI' },
  { id: '2', text: 'Magic UI' },
  { id: '3', text: 'Spark UI' },
  { id: '4', text: 'Magic UI' },
  { id: '5', text: 'Spark UI' },
  { id: '6', text: 'Magic UI' },
  {
    id: '7',
    text: 'Spark UI',
  },
  {
    id: '8',
    text: 'Magic UI',
  },
]
</script>

<template>
  <div class="grid place-items-center w-full min-h-screen">
    <SkewedInfiniteScroll :items="items" />
  </div>
</template>
