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

function onCancel() { emit('cancel'); }
</script>

<template>
  <q-card style="width: 80vw">
    <q-card-section class="text-center">
      <div class="text-h6">
        {{ isPaused ? '一時停止' : `${currentRikordMode.modeName}モードで計測` }}中
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
        <q-btn flat icon="mdi-close" round @click="onCancel" />
        <q-btn v-if="invisible" flat icon="mdi-eye-off" round @click="emit('hide')" />
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">

</style>
