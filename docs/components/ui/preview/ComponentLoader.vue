<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import ComponenntSpinner from './ComponentSpinner.vue'

const props = defineProps<{
  name: string
}>()

const Component = defineAsyncComponent({
  loadingComponent: ComponenntSpinner,
  loader: () => import(`../../spark_ui/ui/examples/${props.name}.vue`),
  timeout: 5000,
})
</script>

<template>
  <Component :is="Component" />
</template>
