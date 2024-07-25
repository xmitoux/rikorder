<!-- 🖼️梨子ちゃんライブラリ 画像設定コンポーネント -->
<script setup lang="ts">
import type { RikoImageSettingEntityResponse } from '@repo/db';

export type RikoLibraryImageSettingsFormProps = {
  settings: RikoImageSettingEntityResponse[];
};
const props = defineProps<RikoLibraryImageSettingsFormProps>();

const emit = defineEmits<{
  delete: [];
}>();

const { currentSetting, toggleSettingRikordMode, setSettings, submitUpdate, resetForm } = useRikoLibraryImageUploadForm();

// 親から実行できるように更新処理を公開
defineExpose({ submitUpdate });

// APIのデータが渡されるまで時間があるのでwatchで監視する
watchEffect(() => {
  // 渡された画像設定をフォームにセット
  setSettings(props.settings);
});

const $q = useQuasar();
const { dialogConfig } = useQuasarDialog();
function onClickDelete() {
  $q.dialog(dialogConfig({
    title: '<span class="text-red text-weight-bold">⚠削除確認⚠</span>',
    message: '画像を削除すると紐付くRikordが全て失われます！<br>'
    + '<span class="text-red text-weight-bold">本当に削除しますか？</span>',
    cancel: true,
  }))
    .onOk(() => emit('delete'));
}

onUnmounted(() => {
  // 画像登録フォームとデータが共有されてしまうのでアンマウント時にリセットする
  resetForm();
});
</script>

<template>
  <div class="q-mx-sm">
    <UISectionLabel class="q-mb-md" label="Rikordモード別設定" />

    <q-card bordered class="q-mb-lg" flat>
      <q-card-section class="q-pb-none">
        <RikoLibraryRikordModeToggleButton @toggle="toggleSettingRikordMode" />
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

    <!-- 削除ボタン -->
    <div class="text-center">
      <q-btn
        class="q-ml-sm" color="red-6" padding="sm xl" :ripple="{ color: 'pink' }" size="md" unelevated
        @click="onClickDelete"
      >
        <q-icon left name="mdi-alert" />
        削除する
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
