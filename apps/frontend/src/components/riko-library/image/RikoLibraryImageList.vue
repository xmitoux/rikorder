<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

defineProps<{
  images: RikoImageEntityResponse[];
}>();

const emit = defineEmits<{
  click: [rikoImage: RikoImageEntityResponse];
}>();
</script>

<template>
  <div class="row q-col-gutter-md text-center">
    <div v-for="image in images" :key="image.id" class="col-6 col-md-4 col-lg-3">
      <q-img
        class="image-container q-mt-md"
        spinner-color="pink-2"
        :src="image.url"
        @click="emit('click', image)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/scss/_variables.scss" as var;

.image-container {
  width: var.$riko-image-thumbnail-size;
  height: var.$riko-image-thumbnail-size;
  border-radius: var.$riko-image-border-radius;
}
</style>
