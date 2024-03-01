<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  images: Object
  error?: string
}>()
</script>
<template>
  <div class="ma-10">
    <!-- Check if there are images and no error -->
    <div v-if="images && !error">
      <v-row>
        <v-col
          v-for="image of images.results || images"
          :key="image.id"
          class="d-flex child-flex"
          cols="4"
        >
          <v-img
            :lazy-src="`https://picsum.photos/10/6?image=${3 * 5 + 10}`"
            :src="image.urls.regular"
            aspect-ratio="1"
            class="bg-grey-lighten-2"
            cover
          >
            <template v-slot:placeholder>
              <v-row align="center" class="fill-height ma-0" justify="center">
                <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>

      <!-- Display message if images.results is an empty array -->
      <div v-if="!images.results || images.results.length === 0">
        <v-alert type="warning" dismissible> Images not found. </v-alert>
      </div>
    </div>

    <!-- Display error message if there is an error -->
    <div v-else-if="error">
      {{ error }}
    </div>
  </div>
</template>
