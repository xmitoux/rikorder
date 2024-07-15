<script setup lang="ts">
import type { RikordTimerResult } from '~/types/rikord';

const slide = ref(1);

const showForm = ref(false);
const showRikordTimer = ref(false);

function saveRikordTime(result: RikordTimerResult) {
  showRikordTimer.value = false;
  openRikordForm(result);
}

function cancelRikordTimer() { showRikordTimer.value = false; }

const rikordTimerResult = ref<RikordTimerResult>({ startDatetime: undefined, endDatetime: undefined });

function openRikordForm(result: RikordTimerResult) {
  showForm.value = true;
  rikordTimerResult.value = result;
}
</script>

<template>
  <div>
    <!-- 情報エリア -->
    <!-- TODO: コンポーネント化 -->
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

              <div>
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

    <!-- お気に入り -->
    <!-- TODO: コンポーネント化 -->
    <div class="q-ml-sm q-mb-lg">
      <UISectionLabel class="q-mb-md" label="お気に入りで始める" />

      <q-carousel
        v-model="slide"
        animated
        class="bg-pink-1 card-border-radius"
        control-color="white"
        height="120px"
        navigation
        swipeable
        transition-next="slide-left"
        transition-prev="slide-right"
      >
        <q-carousel-slide class="column no-wrap" :name="1">
          <div class="row justify-center no-wrap">
            <q-img class="rounded-borders col-4 q-mx-sm" :ratio="1" src="https://cdn.quasar.dev/img/mountains.jpg" width="90px" />
            <q-img class="rounded-borders col-4 q-mx-sm" :ratio="1" src="https://cdn.quasar.dev/img/parallax2.jpg" width="90px" />
            <q-img class="rounded-borders col-4 q-mx-sm" :ratio="1" src="https://cdn.quasar.dev/img/quasar.jpg" width="90px" />
          </div>
        </q-carousel-slide>

        <q-carousel-slide class="column no-wrap" :name="2">
          <div class="row justify-center no-wrap">
            <q-img class="rounded-borders col-4 q-mx-sm" :ratio="1" src="https://cdn.quasar.dev/img/parallax1.jpg" width="90px" />
            <q-img class="rounded-borders col-4 q-mx-sm" :ratio="1" src="https://cdn.quasar.dev/img/quasar.jpg" width="90px" />
            <q-img class="rounded-borders col-4 q-mx-sm" :ratio="1" src="https://cdn.quasar.dev/img/mountains.jpg" width="90px" />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div class="column q-px-xl">
      <UIButtonOk class="q-my-sm" label="今すぐ始める" @click="showRikordTimer = true" />
      <UIButtonOk class="q-my-sm" label="選んで始める" />
      <UIButtonOk class="q-my-sm" label="ランダム" />
    </div>

    <RikordForm :rikord-timer-result="rikordTimerResult" :show="showForm" @cancel="showForm = false" @ok="showForm = false" />
    <RikordTimer v-model:show="showRikordTimer" @cancel="cancelRikordTimer" @save="saveRikordTime" />
  </div>
</template>

<style scoped lang="scss">
.card-border-radius {
  border-radius: 10px;
}
</style>
