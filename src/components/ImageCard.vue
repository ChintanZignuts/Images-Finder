<script setup lang="ts">
interface Image {
  id: string
  urls: { regular: string }
  alt_description: string
  user: { name: string; profile_image: { medium: string }; location: string }
}
defineProps<{
  images: Image[]
  error?: string
}>()
</script>
<template>
  <div class="ma-10">
    <div v-if="images && !error">
      <v-row>
        <v-col
          v-for="image of images"
          :key="image.id"
          class="d-flex child-flex"
          cols="12"
          lg="4"
          md="4"
          sm="6"
        >
          <v-img
            :lazy-src="`https://picsum.photos/10/6?image=${3 * 5 + 10}`"
            :src="image.urls.regular"
            aspect-ratio="1"
            :alt="image.alt_description"
            class="bg-grey-lighten-2 rounded-lg"
            cover
          >
            <v-card-title
              class="text-h6 text-white d-flex justify-space-between position-absolute w-100 align-center"
              style="bottom: 0px"
            >
              <div class="d-flex align-center">
                <v-avatar size="36px">
                  <v-img
                    v-if="image.user"
                    alt="Avatar"
                    :src="image.user.profile_image.medium"
                  ></v-img>
                </v-avatar>
                <div class="ml-4">
                  <p>{{ image.user.name }}</p>
                  <p class="ma-0 text-body-1 font-weight-bold"></p>
                  <p class="text-caption font-weight-medium">{{ image.user.location }}</p>
                </div>
              </div>
              <a
                :href="image.urls.regular"
                :download="`image_${image.id}`"
                v-if="image.urls.regular"
              >
                <v-icon color="white" icon="mdi-eye" size="large"></v-icon>
              </a>
            </v-card-title>
            <template v-slot:placeholder>
              <v-row align="center" class="fill-height ma-0" justify="center">
                <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>

      <div v-if="images.length <= 0">
        <v-alert type="warning" dismissible> Images not found. </v-alert>
      </div>
    </div>

    <div v-else-if="error">
      <v-alert type="warning" dismissible> {{ error }} </v-alert>
    </div>
  </div>
</template>
