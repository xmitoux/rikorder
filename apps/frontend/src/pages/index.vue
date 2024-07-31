<!-- 🏠️ホーム画面 -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordInfoPanelProps } from '~/components/rikord/RikordInfoPanel.vue';

const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

const $q = useQuasar();
const { dialogConfig } = useQuasarDialog();

const rikoImages = ref<RikoImageEntityResponse[] | null>([]);
const favoriteRikoImages = ref<RikoImageEntityResponse[]>([]);

watchEffect(async () => {
  const fetchRikoImages = findRikoImagesByRikordModeIdApi(currentRikordMode.value.id).catch(() => {
    $q.dialog(dialogConfig({ title: '画像取得失敗', message: '画像一覧取得に失敗しました。' }));
    return [];
  });

  const fetchFavoriteRikoImages = findFavoriteRikoImagesApi(currentRikordMode.value.id).catch(() => {
    $q.dialog(dialogConfig({ title: 'お気に入り取得失敗', message: 'お気に入り画像取得に失敗しました。' }));
    return [];
  });

  const [rikoImagesResult, favoriteRikoImagesResult] = await Promise.all([fetchRikoImages, fetchFavoriteRikoImages]);
  rikoImages.value = rikoImagesResult;
  favoriteRikoImages.value = favoriteRikoImagesResult;
});

const panelInfo = computed<RikordInfoPanelProps>(() => {
  return {
    rikordMode: currentRikordMode.value.modeName,
    lastDatetime: '2024-07-31T14:18:19Z',
    count: 19,
    duration: 919,
    goal: 919,
  };
});

const favoriteStart = ref(false);
const selectedFavoriteImage = ref<RikoImageEntityResponse | undefined>();
function selectFavoriteImage(selectedImage: RikoImageEntityResponse) {
  selectedFavoriteImage.value = selectedImage;
  favoriteStart.value = true;
}

const quickStart = ref(false);
const selectionStart = ref(false);
</script>

<template>
  <div>
    <!-- 情報エリア -->
    <div class="q-ml-sm">
      <UISectionLabel class="q-mb-md" label="情報" />
      <RikordInfoPanel v-bind="panelInfo" class="q-mb-md" />
    </div>

    <!-- お気に入り -->
    <div class="q-ml-sm q-mb-md">
      <UISectionLabel class="q-mb-md" label="お気に入りで始める" />
      <RikordFavoriteSelector v-if="favoriteRikoImages" :riko-images="favoriteRikoImages" @select="selectFavoriteImage" />
    </div>

    <div class="column q-px-xl">
      <UIButtonOk class="q-my-sm" label="今すぐ始める" @click="quickStart = true" />
      <UIButtonOk class="q-my-sm" label="選んで始める" @click="selectionStart = true" />
      <UIButtonOk class="q-my-sm" label="ランダム" />
    </div>

    <RikordDialogFavoriteStart v-if="selectedFavoriteImage" v-model:show="favoriteStart" :riko-image="selectedFavoriteImage!" />
    <RikordDialogQuickStart v-if="rikoImages" v-model:show="quickStart" :riko-images="rikoImages!" />
    <RikordDialogSelectionStart v-if="rikoImages" v-model:show="selectionStart" :riko-images="rikoImages!" />
  </div>
</template>

<style scoped lang="scss">
</style>
