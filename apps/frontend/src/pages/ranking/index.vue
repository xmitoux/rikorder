<!-- 👑ランキング画面 -->
<script setup lang="ts">
import type { RankingEntityResponse } from '@repo/db';

const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

const $q = useQuasar();
const { dialogConfig } = useQuasarDialog();

const rankingList = ref<RankingEntityResponse[]>([]);
watchEffect(async () => {
  const rikordModeId = currentRikordMode.value.id;

  try {
    rankingList.value = currentRikordMode.value.modeName === 'View'
      ? await getRankingByDurationApi({ rikordModeId })
      : await getRankingByCountApi({ rikordModeId });
  }
  catch {
    $q.dialog(dialogConfig({ title: '取得失敗', message: 'ランキング一覧取得に失敗しました。' }));
  }
});
</script>

<template>
  <div class="q-mx-sm" style="margin-top:-20px;">
    <RankingList :items="rankingList" :rikord-mode="currentRikordMode.modeName" />
  </div>
</template>

<style scoped>
</style>
