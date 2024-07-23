<!-- 🖼️梨子ちゃんライブラリ トップ画面 -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

type ButtonToggleLabel = '画像' | 'タグ';
const label1: ButtonToggleLabel = '画像';
const label2: ButtonToggleLabel = 'タグ';
const toggle = ref<ButtonToggleLabel>('画像');

const { data: rikoImages, status } = findRikoImagesApi();

const showCreateForm = ref(false);

const selectedRikoImage = ref<RikoImageEntityResponse | undefined>();
const showDetails = ref(false);
function openDetail(rikoImage: RikoImageEntityResponse) {
  selectedRikoImage.value = rikoImage;
  showDetails.value = true;
}
</script>

<template>
  <div>
    <div class="row justify-end">
      <div class="col-8">
        <UIButtonToggle
          v-model="toggle"
          :label1="label1" :label2="label2"
          mdi1="mdi-image-outline" mdi2="mdi-tag-outline"
        />
      </div>

      <div class="col-1 text-center q-px-xs">
        <q-btn color="dark" flat icon="mdi-filter-menu-outline" round />
      </div>

      <div class="col-1 text-center q-px-xs">
        <q-btn color="dark" flat icon="mdi-plus" round @click="showCreateForm = true" />
      </div>
    </div>

    <RikoLibraryImageList v-if="status === 'success'" :images="rikoImages!" @click="openDetail" />
    <RikoLibraryImageUploadForm :show="showCreateForm" @cancel="showCreateForm = false" @ok="showCreateForm = false" />

    <RikoLibraryImageDetailsDialog v-model:show="showDetails" :riko-image="selectedRikoImage!" />
  </div>
</template>

<style lang="scss" scoped>
.border {
  border: 1px solid $dark
}
</style>
