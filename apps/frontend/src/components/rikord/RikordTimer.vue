<!-- Rikord計測タイマーコンポーネント -->
<script setup lang="ts">
import type { RikordTimerResult } from '~/types/rikord';

const props = withDefaults(defineProps<{
  /** タイマーを起動する */
  start: boolean;
  /** 非表示モード(非表示ボタンを出す) */
  invisible?: boolean;
}>(), {
  invisible: false,
});

const emit = defineEmits<{
  save: [rikordTimerResult: RikordTimerResult];
  cancel: [];
  /** 非表示イベント(非表示時に発火) */
  hide: [];
}>();

const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

const {
  startTimer,
  resetTimer,
  isPaused,
  pauseResume,
  save,
} = useRikordTimer();

watchEffect(() => props.start ? startTimer() : resetTimer());

function onSave() {
  const result = save();
  emit('save', result);
}
const $q = useQuasar();
const { dialogConfig } = useQuasarDialog();
function confirmCancel() {
  $q.dialog(dialogConfig({
    title: '終了確認',
    message: '記録せずにホーム画面へ戻ります。<br>よろしいですか？',
    cancel: true,
  }))
    .onOk(() => emit('cancel'));
}
</script>

<template>
  <q-card style="width: 80vw">
    <q-card-section class="text-center">
      <div class="row flex-center relative">
        <div class="text-h6">
          {{ isPaused ? '一時停止' : `計測中(${currentRikordMode.modeName}モード)` }}
        </div>

        <div class="hide-button">
          <q-btn v-if="invisible" flat icon="mdi-eye-off" round @click="emit('hide')" />
        </div>
      </div>

      <template v-if="isPaused">
        <q-spinner-puff class="q-my-sm" color="pink-2" size="md" />
      </template>

      <template v-else>
        <q-spinner-clock v-if="currentRikordMode.modeName === 'View'" class="q-my-sm" color="pink-2" size="md" />
        <q-spinner-audio v-else-if="currentRikordMode.modeName === 'Solo'" class="q-my-sm" color="pink-2" size="md" />
        <q-spinner-hearts v-else class="q-my-sm" color="pink-2" size="md" />
      </template>

      <div>
        <q-btn flat icon="mdi-clock-edit-outline" round @click="onSave" />
        <q-btn flat :icon="isPaused ? 'mdi-play' : 'mdi-pause'" round @click="pauseResume" />
        <q-btn flat icon="mdi-close" round @click="confirmCancel" />
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.hide-button {
  position: absolute;
  top: auto;
  right: 10px;
}
</style>
