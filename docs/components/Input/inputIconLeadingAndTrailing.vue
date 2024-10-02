<script setup lang='ts'>
import { ref } from 'vue'

const searchTerm = ref('')

function clearSearchTerm() {
  return searchTerm.value = ''
}
</script>

<template>
  <div class="grid place-items-center w-full">
    <WInput v-model="searchTerm" icon="carbon:search" placeholder="Search">
      <template v-if="searchTerm !== ''" #trailing>
        <WIcon name="heroicons:x-mark-20-solid" class="text-gray-500" @click="clearSearchTerm()" />
      </template>
    </WInput>
  </div>
</template>
