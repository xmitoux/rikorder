<!-- 🖼️梨子ちゃんライブラリ 画像登録画面 -->
<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <div>
    <NuxtLayout name="custom">
      <template #header>
        画像登録
      </template>

      New page

      <template #footer>
        <ButtonCancel class="q-mr-sm" />
        <ButtonOk class="q-mr-sm" label="登録する" />
      </template>
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
</style>
