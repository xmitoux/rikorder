<!-- 選んで始める機能を集約したコンポーネント -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordTimerResult } from '~/types/rikord';

const showImageSelector = defineModel<boolean>('show', { required: true });

defineProps<{ rikoImages: RikoImageEntityResponse[] }>();

const showViewer = ref(false);
const selectedViewImage = ref<RikoImageEntityResponse | undefined>();
function onSelectViewImage(selectedImage: RikoImageEntityResponse) {
  selectedViewImage.value = selectedImage;
  showImageSelector.value = false;
  showViewer.value = true;
}

const timerResult = ref<RikordTimerResult>({ startDatetime: undefined, endDatetime: undefined });
function onSaveTimerResult(result: RikordTimerResult) {
  showViewer.value = false;
  timerResult.value = result;
  showForm.value = true;
}

const showForm = ref(false);
function finishRikord() {
  showForm.value = false;
}
</script>

<template>
  <div>
    <!-- 画像選択ダイアログ -->
    <RikordImageSelector
      :riko-images="rikoImages" :show="showImageSelector"
      @cancel="showImageSelector = false" @select="onSelectViewImage"
    />

    <!-- 画像ビューア -->
    <RikordImageViewer
      :riko-image="selectedViewImage!" :show="showViewer"
      @cancel="showViewer = false" @save="onSaveTimerResult"
    />

    <!-- 記録ダイアログ -->
    <RikordForm
      v-model:show="showForm" :init-riko-image="selectedViewImage" :riko-images="rikoImages" :rikord-timer-result="timerResult"
      @cancel="finishRikord" @ok="finishRikord"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
