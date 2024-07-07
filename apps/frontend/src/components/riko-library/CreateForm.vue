<!-- 🖼️梨子ちゃんライブラリ 画像登録画面 -->
<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['ok', 'cancel']);

const {
  fileInput, selectedFile, selectFile, imagePreview, onFileSelected,
  selctedModes, isFavorite,
  onClickOk, onClickCancel,
} = useCreateForm();
</script>

<template>
  <q-dialog maximized :model-value="show" persistent transition-hide="slide-right" transition-show="slide-left">
    <NuxtLayout name="custom">
      <template #header>
        画像登録
      </template>

      <!-- 画像選択 -->
      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="画像" />

        <q-btn
          class="q-ml-sm" color="pink-2" label="選択" :ripple="{ color: 'pink' }" size="md" text-color="dark" unelevated
          @click="selectFile"
        />
        <input ref="fileInput" class="hidden" type="file" @change="onFileSelected">

        <div class="q-px-sm q-mt-sm">
          <q-img v-if="imagePreview" fit="contain" height="20vh" ratio="16/9" spinner-color="pink-2" :src="imagePreview" />
        </div>
      </div>

      <!-- モード選択 -->
      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-sm" label="Rikordモード" />

        <div class="q-gutter-lg">
          <q-checkbox v-model="selctedModes" class="text-subtitle1" color="pink-2" label="View" val="View" />
          <q-checkbox v-model="selctedModes" class="text-subtitle1" color="pink-2" label="Solo" val="Solo" />
          <q-checkbox v-model="selctedModes" class="text-subtitle1" color="pink-2" label="Multi" val="Multi" />
        </div>
      </div>

      <!-- お気に入り -->
      <div class="q-ml-sm q-mb-lg">
        <UISectionLabel class="q-mb-sm" label="お気に入り" />
        <q-toggle v-model="isFavorite" checked-icon="mdi-star" color="pink-2" keep-color size="lg" />
      </div>

      <template #footer>
        <UIButtonCancel class="q-mr-sm" @click="onClickCancel(() => emit('cancel'))" />
        <UIButtonOk class="q-mr-sm" label="登録する" @click="onClickOk(() => emit('ok'))" />
      </template>
    </NuxtLayout>
  </q-dialog>
</template>

<style scoped lang="scss">
</style>
