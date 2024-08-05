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
</script>

<template>
  <div class="q-mx-sm">
    <UISectionLabel class="q-mb-md" label="Rikordモード別情報" />

    <q-card bordered class="q-mb-lg" flat>
      <q-card-section class="q-pb-none">
        <RikoLibraryRikordModeToggleButton @toggle="currentRikordModeTab = $event" />
      </q-card-section>

      <q-card-section class="q-pb-none">
        <RikoLibraryImageDetailInfoPanel class="q-mb-md" :image-detail="imageDetail" />
      </q-card-section>

      <q-card-section>
        <!-- TODO: 年別データ -->
        <UISectionLabel class="q-mb-sm" label="年別データ" />
      </q-card-section>

      <q-card-section>
        <!-- TODO: 月別データ -->
        <UISectionLabel class="q-mb-sm" label="月別データ" />
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
