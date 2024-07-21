<!-- お気に入り選択カルーセル -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

const props = defineProps<{
  rikoImages: RikoImageEntityResponse[];
}>();

const emit = defineEmits<{
  select: [rikoImage: RikoImageEntityResponse];
}>();

const slide = ref(1);

const chunkedImages = computed<RikoImageEntityResponse[][]>(() => {
  const chunks = [];
  for (let i = 0; i < props.rikoImages.length; i += 3) {
    chunks.push(props.rikoImages.slice(i, i + 3));
  }
  return chunks;
});

function selectImage(selectedImage: RikoImageEntityResponse) {
  emit('select', selectedImage);
}
</script>

<template>
  <q-carousel
    v-model="slide"
    animated
    class="bg-pink-1 card-border-radius"
    control-color="white"
    height="120px"
    navigation
    :slides="chunkedImages.length"
    swipeable
    transition-next="slide-left"
    transition-prev="slide-right"
  >
    <q-carousel-slide v-for="(chunk, index) in chunkedImages" :key="index" class="column no-wrap" :name="index + 1">
      <div class="row justify-center no-wrap">
        <q-img
          v-for="image in chunk" :key="image.id"
          class="col-4 q-mx-sm rounded-borders" :ratio="1" spinner-color="pink-2" :src="image.url" width="90px"
          @click="selectImage(image)"
        />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
