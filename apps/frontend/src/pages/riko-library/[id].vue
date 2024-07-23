<!-- 🖼️梨子ちゃんライブラリ 詳細画面 -->
<script setup lang="ts">
import ImageDetails from '~/components/riko-library/image/RikoLibraryImageDetails.vue';
import ImageSettings from '~/components/riko-library/image/RikoLibraryImageSettingsForm.vue';

definePageMeta({
  layout: false,
});

type ButtonToggleLabel = '詳細' | '設定';
const label1: ButtonToggleLabel = '詳細';
const label2: ButtonToggleLabel = '設定';
const toggle = ref<ButtonToggleLabel>('詳細');

const isDetails = computed(() => toggle.value === '詳細');

const loading = ref(false);
function submitUpdate() {}
</script>

<template>
  <div>
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
            fit="contain" height="20vh" ratio="16/9" spinner-color="pink-2" src="https://i.idol.st/u/card/art/2x/30Sakurauchi-Riko-Water-Symphony-UR-LpaEgy.png"
          />
        </div>
      </div>

      <component :is="isDetails ? ImageDetails : ImageSettings" />

      <template #footer>
        <UIButtonCancel class="q-mr-sm" label="戻る" @click="navigateTo('/riko-library')" />
        <UIButtonOk v-if="!isDetails" class="q-mr-sm" label="更新する" :loading="loading" @click="submitUpdate()">
          <q-spinner-radio color="white" size="xs" />
        </UIButtonOk>
      </template>
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
.border {
  border: 1px solid $dark
}
</style>
