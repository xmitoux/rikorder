<!-- 年月チャートコンポーネント -->
<script setup lang="ts">
import type { ToggleYearMonth } from '~/components/ui-parts/button/ButtonToggleYearMonth.vue';

type YearChartData = { year: number; count: number; duration: number };
type MonthChartData = { month: number; count: number; duration: number };

export type ChartYearMonthProps = {
  yearDataList: YearChartData[];
  monthDataList: MonthChartData[];
  maxMonthDuration: number;
  maxMonthCount: number;
};

const props = defineProps<ChartYearMonthProps>();

const currentYearMonthTab = ref<ToggleYearMonth>('年別');

const check = ref<number[]>([2024]);
function checkValue(param: number) {
  check.value = [param];
}

const YEAR = 12;
const maxYearDuration = computed<number>(() => {
  return props.maxMonthDuration * YEAR;
});
const maxYearCount = computed<number>(() => {
  return props.maxMonthCount * YEAR;
});

const { formatDurationDatetime } = dateUtils();
function durationLabel(duration: number): string {
  return formatDurationDatetime(duration);
}
</script>

<template>
  <!-- q-cardのborder-radius変更用にdivで囲む -->
  <div class="card-border-radius">
    <!-- 年月データ -->
    <q-card bordered class="border-radius-inherit" flat>
      <q-card-section class="q-pb-none">
        <!-- 年別/月別切り替えトグル -->
        <UIButtonToggleYearMonth class="q-mb-md" @toggle="currentYearMonthTab = $event" />
      </q-card-section>

      <!-- 年別データ -->
      <template v-if="currentYearMonthTab === '年別'">
        <template v-for="(yearData, i) in yearDataList" :key="i">
          <q-card-section :class="i === 0 ? 'q-pt-none': ''" @click="checkValue(yearData.year)">
            <div class="row">
              <div class="col-2">
                {{ yearData.year }}年
                <q-checkbox v-model="check" color="pink-2" :val="yearData.year" @update:model-value="checkValue(yearData.year)" />
              </div>

              <div class="col-10">
                <UIProgressBar class="q-mb-sm" color="pink" :label="`時間: ${durationLabel(yearData.duration)}`" :max-progress="maxYearDuration" :progress="yearData.duration" />
                <UIProgressBar color="orange" :label="`回数: ${yearData.count}回`" :max-progress="maxYearCount" :progress="yearData.count" />
              </div>
            </div>
          </q-card-section>

          <q-separator v-if="i !== yearDataList.length - 1" inset />
        </template>
      </template>

      <!-- 月別データ -->
      <template v-else>
        <q-card-section class="q-pt-none q-pb-xs">
          <div class="row">
            <div class="col-2">
              {{ check[0] }}年
            </div>
          </div>
        </q-card-section>

        <template v-for="(monthData, i) in monthDataList" :key="i">
          <q-card-section class="q-pt-none">
            <div class="row">
              <div class="col-2">
                {{ monthData.month }}月
              </div>

              <div class="col-10">
                <UIProgressBar class="q-mb-sm" color="pink" :label="`時間: ${durationLabel(monthData.duration)}`" :max-progress="maxMonthDuration" :progress="monthData.duration" />
                <UIProgressBar color="orange" :label="`回数: ${monthData.count}回`" :max-progress="maxMonthCount" :progress="monthData.count" />
              </div>
            </div>
          </q-card-section>

          <q-separator v-if="i !== monthDataList.length - 1" class="q-mb-md" inset />
        </template>
      </template>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
