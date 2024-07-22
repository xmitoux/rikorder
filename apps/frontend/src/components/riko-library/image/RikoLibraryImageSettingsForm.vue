<script setup lang="ts">
const {
  currentSetting, toggleSettingRikordMode,
} = useRikoLibraryImageUploadForm();
</script>

<template>
  <div class="q-mx-sm q-mb-lg">
    <UISectionLabel class="q-mb-md" label="Rikordモード別設定" />

    <q-card bordered flat>
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
  </div>
</template>

<style scoped lang="scss">
</style>
