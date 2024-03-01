<script setup lang="ts">
import ImageCard from '@/components/ImageCard.vue'
import InputForm from '@/components/InputForm.vue'
import { getTrendingImg, getImgBySearch } from '../Service'
import { ref } from 'vue'
import { onMounted } from 'vue'

const images = ref({})
const error = ref('')
const handleSearch = async (searchValue: string) => {
  console.log(searchValue)
  images.value = await getImgBySearch(searchValue)
}
onMounted(async () => {
  try {
    images.value = await getTrendingImg()
  } catch (e) {
    if (e) {
      error.value = 'error acured during get trending img'
    }
  }
})
</script>
<template>
  <InputForm @submit="handleSearch" />
  <ImageCard :images="images" :error="error" />
</template>
