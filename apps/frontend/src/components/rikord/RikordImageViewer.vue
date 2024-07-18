<!-- Rikord画像ビューア -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordTimerResult } from '~/types/rikord';

const showViewer = defineModel<boolean>('show', { required: true });

defineProps<{ rikoImage: RikoImageEntityResponse }>();

const emit = defineEmits<{
  save: [rikordResult: RikordTimerResult];
  cancel: [];
}>();

const startTimer = ref(false);
const showTimer = ref(false);
function saveTimerResult(result: RikordTimerResult) {
  closeViewer();
  emit('save', result);
}
function cancelTimer() {
  closeViewer();
  emit('cancel');
}
function closeViewer() {
  showViewer.value = false;
  startTimer.value = false;
  showTimer.value = false;
}

const image = ref();
const isImageLoaded = ref(false);
function onImageLoad() {
  if (image.value) {
    // 横長画像を自動で中央にスクロールする
    image.value.scrollLeft = (image.value.scrollWidth - image.value.clientWidth) / 2;
  }

  // 初期表示で一瞬左端が映るのをフェードインで隠す
  isImageLoaded.value = true;
}
</script>

<template>
  <q-dialog
    v-model="showViewer" maximized persistent transition-hide="jump-right" transition-show="jump-left"
    @show="startTimer = true"
  >
    <div ref="image" class="bg-white  overflow-hidden-y hide-scrollbar">
      <img class="full-height" :class="{ 'fade-in': isImageLoaded }" :src="rikoImage.url" @click="showTimer = true" @load="onImageLoad">
    </div>

    <!-- タイマーの表示状態切替のためのダイアログ -->
    <!-- v-modelで切り替えるとタイマーがunmountされるのでinvisbleで対応 -->
    <q-dialog backdrop-filter="blur(4px)" :class="{ invisible: !showTimer }" :model-value="true" persistent>
      <RikordTimer
        :invisible="true" :start="startTimer"
        @cancel="cancelTimer" @hide="showTimer = false" @save="saveTimerResult"
      />
    </q-dialog>
  </q-dialog>
</template>

<style scoped lang="scss">
.fade-in {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
