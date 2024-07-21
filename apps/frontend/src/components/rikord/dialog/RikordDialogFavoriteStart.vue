<!-- お気に入りで始める機能を集約したコンポーネント -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordTimerResult } from '~/types/rikord';

const showViewer = defineModel<boolean>('show', { required: true });

defineProps<{ rikoImage: RikoImageEntityResponse }>();

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
    <!-- 画像ビューア -->
    <RikordImageViewer
      :riko-image="rikoImage!" :show="showViewer"
      @cancel="showViewer = false" @save="onSaveTimerResult"
    />

    <!-- 記録ダイアログ -->
    <RikordForm
      v-model:show="showForm" :init-riko-image="rikoImage" :rikord-timer-result="timerResult"
      @cancel="finishRikord" @ok="finishRikord"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
