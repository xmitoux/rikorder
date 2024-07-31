<script setup lang="ts">
import type { RikordModeName } from '~/types/rikord-mode';

export type RikordInfoPanelProps = {
  rikordMode: RikordModeName;
  lastDatetime: string;
  count: number;
  duration: number;
  goal: number;
};

const props = defineProps<RikordInfoPanelProps>();

const { formatDate, getDurationDatetimeString } = dateUtils();

const durationMinutes = computed(() => Math.floor(props.duration / 60));

const isViewMode = computed(() => props.rikordMode === 'View');

const leftChipLabel = computed(() => isViewMode.value ? '回数' : '時間');
const leftInfoLabel = computed(() => isViewMode.value ? '回' : '分');
const leftInfoValue = computed(() => isViewMode.value ? props.count : durationMinutes.value);

const rightInfoLabel = computed(() => isViewMode.value ? '分' : '回');
const rightInfoValue = computed(() => isViewMode.value ? durationMinutes.value : props.count);
</script>

<template>
  <!-- q-cardのborder-radius変更用にdivで囲む -->
  <div class="card-border-radius">
    <q-card bordered class="q-py-sm bg-pink-1 no-border border-radius-inherit" flat>
      <!-- 上段 -->
      <q-card-section class="col-6 q-px-sm q-py-sm text-center">
        <UILabelChip label="前回日時" />

        <div class="q-mb-xs text-h6">
          {{ formatDate(lastDatetime, 'MM/DD HH:mm(ddd)') }}
        </div>

        <div>
          {{ getDurationDatetimeString(lastDatetime) }} 経過
        </div>
      </q-card-section>

      <q-separator inset />

      <!-- 下段 -->
      <q-card-section horizontal>
        <q-card-section class="col-6 q-px-sm q-py-sm text-center">
          <UILabelChip :label="`今月${leftChipLabel}`" />

          <div class="text-h6">
            {{ leftInfoValue }}{{ leftInfoLabel }}
          </div>
        </q-card-section>

        <q-separator inset vertical />

        <q-card-section class="col-6 q-px-sm q-py-sm text-center">
          <UILabelChip label="今月記録/目標" />

          <div class="text-h6">
            {{ rightInfoValue }}{{ rightInfoLabel }} / {{ goal }}{{ rightInfoLabel }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
