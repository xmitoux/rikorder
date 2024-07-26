<!-- 📋️Rikord一覧画面 -->
<script setup lang="ts">
import type { RikordEntityResponse, SearchRikordsDto } from '@repo/db';

const date = new Date();
const yearMonth = ref<SearchRikordsDto>({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
});

const rikords = ref<RikordEntityResponse[]>([]);

watchEffect(async () => {
  rikords.value = await searchRikordsApi(yearMonth.value).catch(() => {
    console.error('Rikord一覧取得に失敗しました。');
    return [];
  });
});

const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

const rikordsFilterdByMode = computed(() =>
  rikords.value.filter(rikord => rikord.rikordModeId === currentRikordMode.value.id));
</script>

<template>
  <div>
    <UISelectYearMonth v-model:year-month="yearMonth" />
    <RikordsTimeline :rikords="rikordsFilterdByMode" />
  </div>
</template>

<style scoped>
</style>
