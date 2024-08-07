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
  validate, createRikord, updateRikord, submitLoading,
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

  const result = props.editRikord
    ? await updateRikord(props.editRikord.id)
    : await createRikord(store.currentRikordMode.id);
  if (!result) {
    $q.dialog(dialogConfig({ title: '記録失敗', message: 'エラーが発生しました。' }));
    return;
  }

  $q.notify(notifyConfig('positive', { message: 'Rikordを記録しました！' }));

  resetForm();
  emit('ok');
}

const showUploadForm = ref(false);

const uploadedImages = ref<RikoImageEntityResponse[]>([]);
function onUploadFinished(uploadedImage: RikoImageEntityResponse) {
  // 登録した画像を選択状態にする
  selectedRikoImage.value = uploadedImage;
  // 登録した画像を一覧に含める
  uploadedImages.value.push(uploadedImage);
  showUploadForm.value = false;
}
const rikoImagesWithUploads = computed<RikoImageEntityResponse[]>(() => [...props.rikoImages, ...uploadedImages.value]);
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

        <!-- 画像選択時はサムネ表示(初期画像があるとき(選んで始める・編集)は変更不可) -->
        <div v-if="selectedRikoImage" class="q-px-sm q-mt-sm">
          <q-img
            fit="contain" height="20vh" ratio="16/9" spinner-color="pink-2" :src="selectedRikoImage.url"
            @click="showImageSelector = initRikoImage || editRikord?.rikoImage ? false : true"
          />
        </div>

        <!-- 画像未選択時は選択ボタン表示 -->
        <q-btn
          v-else
          class="q-ml-sm" color="pink-2" label="選択" :ripple="{ color: 'pink' }" size="md" text-color="dark" unelevated
          @click="showImageSelector = true"
        />

        <!-- 画像登録ボタン -->
        <q-btn
          v-if="!selectedRikoImage"
          class="q-ml-sm" color="pink-2" label="登録" :ripple="{ color: 'pink' }" size="md" text-color="dark" unelevated
          @click="showUploadForm = true"
        />
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

    <RikordImageSelector :riko-images="rikoImagesWithUploads" :show="showImageSelector" @cancel="showImageSelector = false" @select="selectRikoImage" />
    <RikordImageUploadForm :show="showUploadForm" @cancel="showUploadForm = false" @ok="onUploadFinished" />
  </q-dialog>
</template>

<style scoped lang="scss">
</style>
