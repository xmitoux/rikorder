<script setup lang="ts">

</script>

<template>
  <div>
    <!-- 情報エリア -->
    <div class="q-ml-sm q-mb-lg">
      <UISectionLabel class="q-mb-md" label="情報" />

      <!-- q-cardのborder-radius変更用にdivで囲む -->
      <div class="q-mb-lg card-border-radius">
        <q-card bordered class="q-py-sm bg-pink-1 no-border border-radius-inherit" flat>
          <q-card-section horizontal>
            <q-card-section class="col-6 q-px-sm q-py-sm text-center">
              <UILabelChip label="前回日時/目標" />

              <div class="q-mb-xs text-h6">
                9/19(木) 9:19
              </div>

              <div class="text-subtitle">
                9時間19分 経過
              </div>
            </q-card-section>

            <q-separator inset vertical />

            <q-card-section class="col-6 q-px-sm q-py-sm text-center">
              <UILabelChip label="今月回数" />

              <div class="q-mt-sm text-h6">
                19回
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="q-px-sm q-py-sm text-center">
            <UILabelChip label="今月の記録/目標" />

            <div class="text-h6">
              19回 / 919回
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
