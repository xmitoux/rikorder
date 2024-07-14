<!-- Rikord記録画面 -->
<script setup lang="ts">
import { date } from 'quasar';

import type { RikordTimerResult } from '~/types/rikord';

const props = withDefaults(defineProps<{
  show: boolean;
  headerTitle?: string;
  submitButtonLabel?: string;
  rikordTimerResult?: RikordTimerResult;
}>(),
{
  headerTitle: 'Rikord記録',
  submitButtonLabel: '記録する',
});

const emit = defineEmits(['ok', 'cancel']);

const startDatetime = ref('');
const endDatetime = ref('');

// inputに表示する日時を取得するためprops.resultを監視する
watchEffect(() => {
  startDatetime.value = props.rikordTimerResult?.startDatetime
    ? date.formatDate(props.rikordTimerResult?.startDatetime, 'YYYY-MM-DD HH:mm:ss')
    : '';

  endDatetime.value = props.rikordTimerResult?.endDatetime
    ? date.formatDate(props.rikordTimerResult?.endDatetime, 'YYYY-MM-DD HH:mm:ss')
    : '';
});
</script>

<template>
  <q-dialog maximized :model-value="show" persistent transition-hide="jump-right" transition-show="jump-left">
    <NuxtLayout name="custom">
      <template #header>
        {{ headerTitle }}
      </template>

      <!-- TODO: 画像選択 -->
      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="画像" />
        <!-- TODO: 画像登録(フォームを開く) -->
      </div>

      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="開始日時" />
        <UIInputDatetime v-model="startDatetime" class="q-ml-sm q-mr-xl" />
      </div>

      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="終了日時" />
        <UIInputDatetime v-model="endDatetime" class="q-ml-sm q-mr-xl" />
      </div>

      <template #footer>
        <UIButtonCancel class="q-mr-sm" @click="emit('cancel')" />

        <UIButtonOk class="q-mr-sm" :label="submitButtonLabel" @click="emit('ok')">
          <q-spinner-radio color="white" size="xs" />
        </UIButtonOk>
      </template>
    </NuxtLayout>
  </q-dialog>
</template>

<style scoped lang="scss">
</style>
