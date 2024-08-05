<!-- 画像詳細コンポーネント -->
<script setup lang="ts">
// defaultレイアウトを無効にし、template内でcustomレイアウトを使用する
definePageMeta({
  layout: false,
});

const router = useRouter();

const route = useRoute();
const { data: imageDetails, error } = await useGetRikoImageDetailsApi(+route.params.id);

const $q = useQuasar();
const { dialogConfig } = useQuasarDialog();
watchEffect(() => {
  if (error.value) {
    $q.dialog(dialogConfig({ title: 'エラー', message: '画像詳細データ取得処理に失敗しました。' }));
  }
});
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #header>
        画像詳細
      </template>

      <div class="q-ml-sm q-mb-lg">
        <div class="q-px-sm q-mt-sm">
          <q-img
            fit="contain" height="20vh" ratio="16/9" spinner-color="pink-2" :src="imageDetails?.rikoImage.url"
          />
        </div>
      </div>
      <RikoLibraryImageDetails :image-details="imageDetails ?? undefined" />

      <template #footer>
        <UIButtonCancel class="q-mr-sm" label="戻る" @click="router.back()" />
      </template>
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
