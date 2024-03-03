<script setup lang="ts">
import ImageCard from '@/components/ImageCard.vue'
import InputForm from '@/components/InputForm.vue'
import { getTrendingImg, getImgBySearch } from '../Service'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { watch } from 'vue'

const images = ref(null)
const error = ref('')
const page = ref(1)
const searchedimg = ref(false)
const searchedpages = ref(1)
const totalpages = ref(1)
const search = ref('')
const totalresult = ref(0)

const handalpagination = async (page: number) => {
  images.value = await getTrendingImg(page)
}
const handalsearchpagination = async (page: number) => {
  const Response = await getImgBySearch(search.value, page)
  images.value = Response.results
}

watch(page, handalpagination)
watch(searchedpages, handalsearchpagination)

const handleSearch = async (searchValue: string) => {
  search.value = searchValue
  const Response = await getImgBySearch(searchValue, searchedpages.value)
  images.value = Response.results
  totalpages.value = Response.total_pages
  totalresult.value = Response.total
  searchedimg.value = true
}
onMounted(async () => {
  try {
    images.value = await getTrendingImg(page.value)
  } catch (e) {
    if (e) {
      error.value = 'error acured during get trending img'
    }
  }
})
</script>

<template>
  <InputForm @submit="handleSearch" />
  <div v-if="searchedimg">
    <h3>
      Total Result:- <span>{{ totalresult }}</span>
    </h3>
  </div>
  <div v-if="images">
    <ImageCard :images="images" :error="error" />
  </div>

  <div>
    <div v-if="!searchedimg">
      <v-pagination :length="30" :total-visible="6" v-model="page"></v-pagination>
    </div>
    <div v-else>
      <v-pagination
        :length="totalpages < 30 ? totalpages : 30"
        :total-visible="6"
        v-model="searchedpages"
      ></v-pagination>
    </div>
  </div>
</template>
