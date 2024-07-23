<!-- 🖼️梨子ちゃんライブラリ 詳細画面ダイアログコンポーネント -->
<script setup lang="ts">
import ImageDetails from '~/components/riko-library/image/RikoLibraryImageDetails.vue';
import ImageSettings from '~/components/riko-library/image/RikoLibraryImageSettingsForm.vue';

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
  rikoImageSettings.value = await findRikoImageSettingsByRikoImageIdApi(props.rikoImage.id);
  console.log({ 'rikoImageSettings.value': rikoImageSettings.value });
}

const loading = ref(false);
function submitUpdate() {}
</script>

<template>
  <q-dialog
    maximized :model-value="show" persistent transition-hide="jump-right" transition-show="jump-left"
    @show="onShow"
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

      <component :is="isDetails ? ImageDetails : ImageSettings" />

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
