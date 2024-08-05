<!-- 今すぐ始める機能を集約したダイアログコンポーネント -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordTimerResult } from '~/types/rikord';

const showDialog = defineModel<boolean>('show', { required: true });

defineProps<{ rikoImages: RikoImageEntityResponse[] }>();
const emit = defineEmits(['finish']);

const startTimer = ref(false);
const rikordTimerResult = ref<RikordTimerResult>({ startDatetime: undefined, endDatetime: undefined });
function saveTimerResult(result: RikordTimerResult) {
  startTimer.value = false;
  openForm(result);
}
function cancelTimer() {
  startTimer.value = false;
  showDialog.value = false;
}

const showForm = ref(false);
function openForm(result: RikordTimerResult) {
  rikordTimerResult.value = result;
  showForm.value = true;
}
function finishRikord(ok: boolean = true) {
  showForm.value = false;
  showDialog.value = false;
  ok && emit('finish');
}
</script>

<template>
  <q-dialog v-model="showDialog" backdrop-filter="blur(4px)" persistent @show="startTimer = true">
    <RikordTimer :start="startTimer" @cancel="cancelTimer" @save="saveTimerResult" />
    <RikordForm v-model:show="showForm" :riko-images="rikoImages" :rikord-timer-result="rikordTimerResult" @cancel="finishRikord(false)" @ok="finishRikord" />
  </q-dialog>
</template>

<style scoped lang="scss">

</style>
