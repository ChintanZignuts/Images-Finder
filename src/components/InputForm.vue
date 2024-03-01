<script setup lang="ts">
import { ref } from 'vue'

const searchItem = ref('')
const emit = defineEmits<{
  (event: 'submit', value: string): void
}>()
const handleInput = () => {
  emit('submit', searchItem.value)
}
</script>
<template>
  <form @submit.prevent="handleInput">
    <div class="d-flex align-center justify-center">
      <div class="w-50 mt-5">
        <v-text-field label="Search.." variant="outlined" v-model="searchItem"></v-text-field>
      </div>
      <div class="d-flex align-center justify-center ml-6">
        <v-btn variant="tonal" icon="mdi-magnify" type="submit"></v-btn>
      </div>
    </div>
  </form>
</template>
