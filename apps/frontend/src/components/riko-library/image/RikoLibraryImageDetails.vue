<!-- 画像詳細コンポーネント -->
<script setup lang="ts">
import { RIKORD_MODES } from '~/constants/rikord-mode';

import type { RikoImageDetailEntityResponse, RikoImageDetailsEntityResponse } from '@repo/db';

import type { RikordModeName } from '~/types/rikord-mode';

export type RikorImageDetailsProps = {
  imageDetails?: RikoImageDetailsEntityResponse;
};

const props = defineProps<RikorImageDetailsProps>();

const currentRikordModeTab = ref<RikordModeName>('View');

const imageDetail = computed<RikoImageDetailEntityResponse | undefined>(() => {
  const currentRikordMode = RIKORD_MODES[currentRikordModeTab.value];
  return props.imageDetails?.details.find(detail => detail.rikordModeId === currentRikordMode.id);
});

// TODO: こっちは RikoImageDetailEntityResponse で一緒に取得
const yearDataList = [
  { year: 2024, count: 520, duration: 700 * 60 },
  { year: 2023, count: 30, duration: 200 * 60 },
];

// TODO: こっちは 別APIのデータ 年別のチェックを変更するたびに取得
const monthDataList = [
  { month: 1, count: 0, duration: 0 },
  { month: 2, count: 10, duration: 10 * 60 },
  { month: 3, count: 20, duration: 20 * 60 },
  { month: 4, count: 30, duration: 30 * 60 },
  { month: 5, count: 40, duration: 40 * 60 },
  { month: 6, count: 50, duration: 50 * 60 },
  { month: 7, count: 80, duration: 60 * 60 },
  { month: 8, count: 90, duration: 80 * 60 },
  { month: 9, count: 100, duration: 100 * 60 },
  { month: 10, count: 120, duration: 120 * 60 },
  { month: 11, count: 150, duration: 140 * 60 },
  { month: 12, count: 300, duration: 150 * 60 },
];

const maxMonthDuration = computed<number>(() => (currentRikordModeTab.value === 'View' ? 150 : 90) * 60);
const maxMonthCount = computed<number>(() => currentRikordModeTab.value === 'View' ? 150 : 3);
</script>

<template>
  <div class="q-mx-sm">
    <UISectionLabel class="q-mb-md" label="Rikordモード別データ" />
    <!-- モード切り替えトグル -->
    <RikoLibraryRikordModeToggleButton class="q-mb-md" @toggle="currentRikordModeTab = $event" />
    <!-- 合計データパネル -->
    <RikoLibraryImageDetailInfoPanel class="q-mb-md" :image-detail="imageDetail" />
    <!-- 年月データ -->
    <ChartYearMonth
      :max-month-count="maxMonthCount" :max-month-duration="maxMonthDuration"
      :month-data-list="monthDataList" :year-data-list="yearDataList"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
