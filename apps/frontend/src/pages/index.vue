<!-- 🏠️ホーム画面 -->
<script setup lang="ts">
import type { RikoImageEntityResponse, RikordInfoEntityResponse } from '@repo/db';

import type { RikordInfoPanelProps } from '~/components/rikord/RikordInfoPanel.vue';
import type { RikordModeIdValue } from '~/types/rikord-mode';

const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

const $q = useQuasar();
const { dialogConfig } = useQuasarDialog();

const rikoImages = ref<RikoImageEntityResponse[] | null>([]);

const favoriteRikoImages = ref<RikoImageEntityResponse[]>([]);
const loadingFavoriteImages = ref(false);

const panelInfo = ref<RikordInfoEntityResponse>();
const loadingPanelInfo = ref(false);

watchEffect(() => {
  findRikoImagesByRikordModeIdApi(currentRikordMode.value.id).then((result) => {
    rikoImages.value = result;
  })
    .catch(() => {
      $q.dialog(dialogConfig({ title: '画像取得失敗', message: '画像一覧取得に失敗しました。' }));
      return [];
    });

  loadingFavoriteImages.value = true;
  findFavoriteRikoImagesApi(currentRikordMode.value.id).then((result) => {
    favoriteRikoImages.value = result;
  })
    .catch(() => {
      $q.dialog(dialogConfig({ title: 'お気に入り取得失敗', message: 'お気に入り画像取得に失敗しました。' }));
      return [];
    })
    .finally(() => loadingFavoriteImages.value = false);

  getRikordInfo(currentRikordMode.value.id);
});

const panelInfoProps = computed<RikordInfoPanelProps>(() => {
  return {
    rikordMode: currentRikordMode.value.modeName,
    lastDatetime: panelInfo.value?.lastDatetime ?? '',
    count: panelInfo.value?.totalCount ?? 0,
    duration: panelInfo.value?.totalDuration ?? 0,
    goal: panelInfo.value?.monthlyGoal ?? 0,
    loading: loadingPanelInfo.value,
  };
});

async function getRikordInfo(rikordModeId: RikordModeIdValue) {
  loadingPanelInfo.value = true;

  try {
    panelInfo.value = await getRikordInfoApi(rikordModeId);
  }
  catch {
    $q.dialog(dialogConfig({ title: 'エラー', message: '情報取得に失敗しました。' }));
  }
  finally {
    loadingPanelInfo.value = false;
  }
}

const favoriteStart = ref(false);
const selectedFavoriteImage = ref<RikoImageEntityResponse | undefined>();
function selectFavoriteImage(selectedImage: RikoImageEntityResponse) {
  selectedFavoriteImage.value = selectedImage;
  favoriteStart.value = true;
}

const quickStart = ref(false);
const selectionStart = ref(false);

function onFinishedRikord() {
  getRikordInfo(currentRikordMode.value.id);
}
</script>

<template>
  <div>
    <!-- 情報エリア -->
    <div class="q-ml-sm">
      <UISectionLabel class="q-mb-md" label="情報" />
      <RikordInfoPanel v-bind="panelInfoProps" class="q-mb-md" :loading="loadingPanelInfo" />
    </div>

    <!-- お気に入り -->
    <div class="q-ml-sm q-mb-md">
      <UISectionLabel class="q-mb-md" label="お気に入りで始める" />
      <RikordFavoriteSelector v-if="favoriteRikoImages" :loading="loadingFavoriteImages" :riko-images="favoriteRikoImages" @select="selectFavoriteImage" />
    </div>

    <div class="column q-px-xl">
      <UIButtonOk class="q-my-sm" label="今すぐ始める" @click="quickStart = true" />
      <UIButtonOk class="q-my-sm" label="選んで始める" @click="selectionStart = true" />
      <UIButtonOk class="q-my-sm" label="ランダム" />
    </div>

    <RikordDialogFavoriteStart v-if="selectedFavoriteImage" v-model:show="favoriteStart" :riko-image="selectedFavoriteImage!" @finish="onFinishedRikord" />
    <RikordDialogQuickStart v-if="rikoImages" v-model:show="quickStart" :riko-images="rikoImages!" @finish="onFinishedRikord" />
    <RikordDialogSelectionStart v-if="rikoImages" v-model:show="selectionStart" :riko-images="rikoImages!" @finish="onFinishedRikord" />
  </div>
</template>

<style scoped lang="scss">
</style>
