<!-- 🖼️梨子ちゃんライブラリ 画像登録画面 -->
<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

const alert = () => {
  $q.dialog({
    title: '設定内容エラー',
    message: '使用するRikordモードが未選択です。<br/>少なくとも1つを選択してください。',
    ok: {
      color: 'pink-2',
      textColor: 'dark',
      rounded: true,
      unelevated: true,
    },
    html: true,
  });
};

defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['ok', 'cancel']);

const {
  fileInput, selectFile, imagePreview, onFileSelected,
  currentSetting, onToggle,
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

      <div class="q-mx-sm q-mb-lg">
        <UISectionLabel class="q-mb-md" label="Rikordモード別設定" />

        <q-card bordered flat>
          <q-card-section class="q-pb-none">
            <UIButtonToggle
              label1="View" label2="Solo" label3="Multi"
              mdi1="mdi-image-search" mdi2="mdi-thumb-up-outline" mdi3="mdi-heart-outline"
              @change="onToggle"
            />
          </q-card-section>

          <q-card-section class="q-pb-none">
            <UISectionLabel class="q-mb-sm" label="使用する" />
            <q-toggle v-model="currentSetting.use" checked-icon="mdi-check" color="pink-2" keep-color size="lg" />
          </q-card-section>

          <q-card-section>
            <UISectionLabel class="q-mb-sm" label="お気に入り" />
            <q-toggle v-model="currentSetting.favorite" checked-icon="mdi-star" color="pink-2" keep-color size="lg" />
          </q-card-section>
        </q-card>
      </div>

      <template #footer>
        <UIButtonCancel class="q-mr-sm" @click="onClickCancel(() => emit('cancel'))" />
        <UIButtonOk class="q-mr-sm" label="登録する" @click="onClickOk(() => emit('ok'), alert)" />
      </template>
    </NuxtLayout>
  </q-dialog>
</template>

<style scoped lang="scss">
</style>
