<!-- Rikord記録画面用画像登録 -->
<script setup lang="ts">
import { useQuasar } from 'quasar';

import type { RikoImageEntityResponse } from '@repo/db';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['ok', 'cancel']);

const {
  fileInput, selectFile, imagePreview, onFileSelected,
  currentSetting, toggleSettingRikordMode,
  uploading, onClickOk, onClickCancel,
} = useRikoLibraryImageUploadForm();

const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

onMounted(() => {
  // 現在のモードのみ「使用する」で固定
  toggleSettingRikordMode(currentRikordMode.value.modeName);
  currentSetting.value.use = true;
});

const $q = useQuasar();

/* ↓ Quasarプラグインがcomposable内に実装できないのでこちらで実装 */
const alert = (message: string) => {
  $q.dialog({
    title: '画像登録エラー',
    message,
    ok: {
      color: 'pink-2',
      textColor: 'dark',
      rounded: true,
      unelevated: true,
    },
    html: true, // <br>を入れるためhtml
  });
};

const success = (message: string) => {
  $q.notify({
    type: 'positive',
    message,
    position: 'top',
    timeout: 2000,
  });
};
/* ↑ */

const onClickSubmit = () => {
  onClickOk(
    (uploadedImage: RikoImageEntityResponse) => emit('ok', uploadedImage),
    alert,
    success,
  );
};
</script>

<template>
  <!-- ダイアログを開くとすぐに画像選択を開く -->
  <q-dialog
    maximized :model-value="show" persistent transition-hide="jump-right" transition-show="jump-left"
    @show="selectFile()"
  >
    <NuxtLayout name="custom">
      <template #header>
        画像登録{{ `(${currentRikordMode.modeName}モード)` }}
      </template>

      <!-- 画像選択 -->
      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="画像" />

        <!-- サムネ -->
        <div v-if="imagePreview" class="q-px-sm q-mt-sm">
          <q-img
            fit="contain" height="20vh" ratio="16/9" spinner-color="pink-2" :src="imagePreview"
            @click="imagePreview && selectFile()"
          />
        </div>
        <!-- 隠し画像選択input -->
        <input ref="fileInput" class="hidden" type="file" @change="onFileSelected">
      </div>

      <!-- 使用する(固定ON) -->
      <div class="q-mx-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="使用する" />
        <q-toggle checked-icon="mdi-check" color="pink-2" disabled keep-color :model-value="true" size="lg" />
      </div>

      <!-- お気に入り -->
      <div class="q-mx-sm q-mb-lg">
        <UISectionLabel class="q-mb-sm" label="お気に入り" />
        <q-toggle v-model="currentSetting.favorite" checked-icon="mdi-star" color="pink-2" keep-color size="lg" />
      </div>

      <template #footer>
        <UIButtonCancel class="q-mr-sm" @click="onClickCancel(() => emit('cancel'))" />

        <UIButtonOk class="q-mr-sm" label="登録する" :loading="uploading" @click="onClickSubmit()">
          <q-spinner-radio color="white" size="xs" />
        </UIButtonOk>
      </template>
    </NuxtLayout>
  </q-dialog>
</template>

<style scoped lang="scss">
</style>
