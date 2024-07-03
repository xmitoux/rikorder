<script setup lang="ts">
const props = defineProps<{
  images: { id: number; url: string }[];
}>();

const emit = defineEmits<{
  click: [imageId: number];
}>();
</script>

<template>
  <div class="row text-center">
    <div v-for="image in props.images" :key="image.id" class="col-6">
      <q-img
        class="image-container q-mt-md"
        spinner-color="pink-2"
        :src="image.url"
        @click="emit('click', image.id)"
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
