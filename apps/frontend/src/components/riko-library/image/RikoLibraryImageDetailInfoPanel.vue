<!-- 画像詳細情報パネルコンポーネント -->
<script setup lang="ts">
import { RIKORD_MODE_VALUES } from '~/constants/rikord-mode';

import type { RikoImageDetailEntityResponse } from '@repo/db';

export type RikorImageInfoPanelProps = {
  imageDetail?: RikoImageDetailEntityResponse;
};

defineProps<RikorImageInfoPanelProps>();

const { formatDurationDatetime } = dateUtils();
</script>

<template>
  <!-- q-cardのborder-radius変更用にdivで囲む -->
  <div class="card-border-radius">
    <q-card bordered class="q-py-xs bg-pink-1 no-border border-radius-inherit" flat>
      <q-card-section horizontal>
        <div v-if="!imageDetail" class="fit text-center">
          データがありません
        </div>

        <template v-else>
          <template v-if="imageDetail.rikordModeId === RIKORD_MODE_VALUES.Multi">
            <!-- Multiモードは合計回数のみ表示する -->
            <q-card-section class="col-12 q-px-sm q-py-sm text-center">
              <UILabelChip label="合計回数" />

              <div class="text-h6">
                {{ imageDetail.count }}回
              </div>
            </q-card-section>
          </template>

          <template v-else>
            <q-card-section class="col-6 q-px-sm q-py-sm text-center">
              <UILabelChip label="合計時間" />

              <div class="text-h6">
                {{ formatDurationDatetime(imageDetail.duration) }}
              </div>
            </q-card-section>

            <q-separator inset vertical />

            <q-card-section class="col-6 q-px-sm q-py-sm text-center">
              <UILabelChip label="合計回数" />

              <div class="text-h6">
                {{ imageDetail.count }}回
              </div>
            </q-card-section>
          </template>
        </template>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
