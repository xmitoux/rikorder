<!-- 🖼️梨子ちゃんライブラリ 画像詳細/詳細画面ダイアログ -->
<script setup lang="ts">
import ImageDetails from '~/components/riko-library/image/RikoLibraryImageDetails.vue';
import ImageSettings, { type RikoLibraryImageSettingsFormProps } from '~/components/riko-library/image/RikoLibraryImageSettingsForm.vue';

import type { RikoImageEntityResponse, RikoImageSettingEntityResponse } from '@repo/db';

const show = defineModel<boolean>('show', { required: true });

const props = defineProps<{
  rikoImage: RikoImageEntityResponse;
}>();

type ButtonToggleLabel = '詳細' | '設定';
const label1: ButtonToggleLabel = '詳細';
const label2: ButtonToggleLabel = '設定';
const toggle = ref<ButtonToggleLabel>('詳細');

const isDetails = computed(() => toggle.value === '詳細');

const rikoImageSettings = ref<RikoImageSettingEntityResponse[]>([]);
async function onShow() {
  // TODO: 画像詳細も一緒にAPIから取得
  const fetchSettings = findRikoImageSettingsByRikoImageIdApi(props.rikoImage.id);
  const [settingsResult] = await Promise.all([fetchSettings]);
  rikoImageSettings.value = settingsResult;
}

type DynamicComponent = typeof ImageDetails | typeof ImageSettings;
type DynamicComponentInstance = InstanceType<DynamicComponent>;
const componentRef = ref<DynamicComponentInstance | undefined>();

type DynamicComponents = {
  component: DynamicComponent;
  props: RikoLibraryImageSettingsFormProps;
};
const currentComponent = computed<DynamicComponents>(() => ({
  component: isDetails.value ? ImageDetails : ImageSettings,
  // TODO: 画像詳細コンポーネントのpropsも指定する
  props: { settings: rikoImageSettings.value },
}));

const loading = ref(false);
async function submitUpdate() {
  // 動的コンポーネント(画像設定)内の更新処理を実行する
  if (componentRef.value && 'submitUpdate' in componentRef.value) {
    loading.value = true;
    await componentRef.value.submitUpdate(props.rikoImage.id);
    loading.value = false;

    show.value = false;
  }
}

function onHide() {
  // ダイアログを閉じてもタブ選択状態が保持されるので詳細に戻しておく
  toggle.value = '詳細';
}
</script>

<template>
  <q-dialog
    maximized :model-value="show" persistent transition-hide="jump-right" transition-show="jump-left"
    @hide="onHide" @show="onShow"
  >
    <NuxtLayout name="custom">
      <template #header>
        画像{{ isDetails ? label1 : label2 }}
      </template>

      <div class="row justify-center q-mb-lg">
        <div class="col-8">
          <UIButtonToggle
            v-model="toggle"
            :label1="label1" :label2="label2"
            mdi1="mdi-image-text" mdi2="mdi-cog-outline"
          />
        </div>
      </div>

      <div class="q-ml-sm q-mb-lg">
        <div class="q-px-sm q-mt-sm">
          <q-img
            fit="contain" height="20vh" ratio="16/9" spinner-color="pink-2" :src="rikoImage.url"
          />
        </div>
      </div>

      <component :is="currentComponent.component" v-bind="currentComponent.props" ref="componentRef" />

      <template #footer>
        <UIButtonCancel class="q-mr-sm" label="戻る" @click="show = false" />

        <UIButtonOk v-if="!isDetails" class="q-mr-sm" label="更新する" :loading="loading" @click="submitUpdate()">
          <q-spinner-radio color="white" size="xs" />
        </UIButtonOk>
      </template>
    </NuxtLayout>
  </q-dialog>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
