<script setup lang="ts">

</script>

<template>
  <div>
    <!-- 情報エリア -->
    <!-- TODO: コンポーネント化 -->
    <div class="q-ml-sm">
      <UISectionLabel class="q-mb-md" label="情報" />

      <!-- q-cardのborder-radius変更用にdivで囲む -->
      <div class="q-mb-md card-border-radius">
        <q-card bordered class="q-py-sm bg-pink-1 no-border border-radius-inherit" flat>
          <q-card-section horizontal>
            <q-card-section class="col-6 q-px-sm q-py-sm text-center">
              <UILabelChip label="合計時間" />

              <div class="text-subtitle1">
                9時間19分19秒
              </div>
            </q-card-section>

            <q-separator inset vertical />

            <q-card-section class="col-6 q-px-sm q-py-sm text-center">
              <UILabelChip label="合計回数" />

              <div class="text-subtitle1">
                919回
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- TODO: 年別データ -->
    <div class="q-ml-sm">
      <UISectionLabel class="q-mb-md" label="年別データ" />
    </div>

    <!-- TODO: 月別データ -->
    <div class="q-ml-sm">
      <UISectionLabel class="q-mb-md" label="月別データ" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
