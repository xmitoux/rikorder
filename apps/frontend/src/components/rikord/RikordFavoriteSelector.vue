<!-- お気に入り選択カルーセル -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

const props = defineProps<{
  rikoImages: RikoImageEntityResponse[];
  loading: boolean;
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
        <!-- データロード中のスケルトン -->
        <template v-if="loading">
          <q-skeleton v-for="i in 3" :key="i" class="col-4 q-mx-sm" size="90px" />
        </template>

        <template v-else>
          <q-img
            v-for="image in chunk" :key="image.id"
            class="col-4 q-mx-sm rounded-borders" no-spinner :ratio="1" spinner-color="pink-2" :src="image.url" width="90px"
            @click="selectImage(image)"
          >
            <!-- 取得した画像のロード中もスピナーではなくスケルトンを表示 -->
            <template #loading>
              <q-skeleton size="90px" />
            </template>
          </q-img>
        </template>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
