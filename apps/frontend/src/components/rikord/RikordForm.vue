<!-- Rikord記録画面 -->
<script setup lang="ts">
import { date } from 'quasar';

import type { RikoImageEntityResponse, RikordEntityResponse } from '@repo/db';

import type { RikordTimerResult } from '~/types/rikord';

const show = defineModel<boolean>('show', { required: true });

const props = withDefaults(defineProps<{
  headerTitle?: string;
  submitButtonLabel?: string;
  rikordTimerResult?: RikordTimerResult;
  rikoImages?: RikoImageEntityResponse[];
  initRikoImage?: RikoImageEntityResponse;
  editRikord?: RikordEntityResponse;
}>(),
{
  headerTitle: 'Rikord記録',
  submitButtonLabel: '記録する',
  rikoImages: () => [],
});

const emit = defineEmits(['ok', 'cancel']);

const {
  selectedRikoImage, startDatetime, endDatetime,
  validate, createRikord, submitLoading,
  resetForm,
} = useRikordForm();

function onShow() {
  // 初期選択画像があれば設定する
  selectedRikoImage.value = props.initRikoImage || props.editRikord?.rikoImage;
}

// inputに表示する日時を取得するためprops.resultを監視する
watchEffect(() => {
  if (props.editRikord) {
    startDatetime.value = props.editRikord.startedAt
      ? date.formatDate(props.editRikord.startedAt, 'YYYY-MM-DD HH:mm:ss')
      : '';

    endDatetime.value = props.editRikord.finishedAt
      ? date.formatDate(props.editRikord.finishedAt, 'YYYY-MM-DD HH:mm:ss')
      : '';
  }
  else {
    startDatetime.value = props.rikordTimerResult?.startDatetime
      ? date.formatDate(props.rikordTimerResult?.startDatetime, 'YYYY-MM-DD HH:mm:ss')
      : '';

    endDatetime.value = props.rikordTimerResult?.endDatetime
      ? date.formatDate(props.rikordTimerResult?.endDatetime, 'YYYY-MM-DD HH:mm:ss')
      : '';
  }
});

const showImageSelector = ref(false);
function selectRikoImage(selectedImage: RikoImageEntityResponse) {
  selectedRikoImage.value = selectedImage;
  showImageSelector.value = false;
}

const $q = useQuasar();
const { dialogConfig } = useQuasarDialog();
function confirmCancel() {
  $q.dialog(dialogConfig({ title: '終了確認', message: '記録せずに終了します。<br>よろしいですか？', cancel: true }))
    .onOk(() => cancelRikord());
}

function cancelRikord() {
  resetForm();
  emit('cancel');
}

const store = useRikordModeStore();
const { notifyConfig } = useQuasarNotify();

async function submitRikord() {
  const validationResult = validate();
  if (validationResult !== true) {
    $q.dialog(dialogConfig({ title: '記録失敗', message: validationResult }));
    return;
  }

  const result = await createRikord(store.currentRikordMode.id);
  if (!result) {
    $q.dialog(dialogConfig({ title: '記録失敗', message: 'エラーが発生しました。' }));
    return;
  }

  $q.notify(notifyConfig('positive', { message: 'Rikordを記録しました！' }));

  resetForm();
  emit('ok');
}
</script>

<template>
  <q-dialog maximized :model-value="show" persistent transition-hide="jump-right" transition-show="jump-left" @show="onShow">
    <NuxtLayout name="custom">
      <template #header>
        {{ headerTitle }}({{ store.currentRikordMode.modeName }}モード)
      </template>

      <!-- 画像選択 -->
      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="画像" />

        <!-- 画像選択時はサムネ表示 -->
        <div v-if="selectedRikoImage" class="q-px-sm q-mt-sm">
          <q-img
            fit="contain" height="20vh" ratio="16/9" spinner-color="pink-2" :src="selectedRikoImage.url"
            @click="showImageSelector = initRikoImage ? false : true"
          />
        </div>

        <!-- 画像未選択時は選択ボタン表示 -->
        <q-btn
          v-else
          class="q-ml-sm" color="pink-2" label="選択" :ripple="{ color: 'pink' }" size="md" text-color="dark" unelevated
          @click="showImageSelector = true"
        />

        <!-- TODO: 画像登録(フォームを開く) -->
      </div>

      <!-- 日時入力 -->
      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="開始日時" />
        <UIInputDatetime v-model="startDatetime" class="q-ml-sm q-mr-xl" />
      </div>

      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="終了日時" />
        <UIInputDatetime v-model="endDatetime" class="q-ml-sm q-mr-xl" />
      </div>

      <template #footer>
        <UIButtonCancel class="q-mr-sm" label="戻る" @click="confirmCancel" />

        <UIButtonOk class="q-mr-sm" :label="submitButtonLabel" :loading="submitLoading" @click="submitRikord">
          <q-spinner-radio color="white" size="xs" />
        </UIButtonOk>
      </template>
    </NuxtLayout>

    <RikordImageSelector :riko-images="rikoImages" :show="showImageSelector" @cancel="showImageSelector = false" @select="selectRikoImage" />
  </q-dialog>
</template>

<style scoped lang="scss">
</style>
