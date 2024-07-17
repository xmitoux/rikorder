import type { RikordTimerResult } from '~/types/rikord';

type UseRikordTimer = {
  startDatetime: Ref<Date | undefined>;
  endDatetime: ComputedRef<Date | undefined>;
  startTimer: () => void;
  isPaused: Ref<boolean>;
  pauseResume: () => void;
  resetTimer: () => void;
  save: () => RikordTimerResult;
};

const startDatetime = ref<Date | undefined>(undefined);
const pauseStartTime = ref<number | undefined>(undefined);
const isPaused = ref(false);
const totalPausedTime = ref(0);

const endDatetime: ComputedRef<Date | undefined> = computed(() => {
  if (!startDatetime.value) {
    return;
  }

  const now = new Date();
  let currentPausedTime = 0;
  if (isPaused.value && pauseStartTime.value) {
    currentPausedTime = now.getTime() - pauseStartTime.value;
  }
  const elapsedTime = now.getTime() - startDatetime.value.getTime() - totalPausedTime.value - currentPausedTime;
  return new Date(startDatetime.value.getTime() + elapsedTime);
});

/** タイマーを開始する関数 */
function startTimer() {
  if (!startDatetime.value) {
    // 初回開始時
    startDatetime.value = new Date();
  }
  else if (isPaused.value) {
    // 一時停止後の再開時
    const pauseDuration = Date.now() - (pauseStartTime.value ?? Date.now());
    totalPausedTime.value += pauseDuration;
    isPaused.value = false;
    pauseStartTime.value = undefined;
  }
}

/** 一時停止/再開ボタンが押されたときの処理 */
function pauseResume() { isPaused.value ? resume() : pause(); }

/** タイマーを一時停止する */
function pause() {
  if (!isPaused.value && startDatetime.value) {
    isPaused.value = true;
    pauseStartTime.value = Date.now();
  }
}

/** 一時停止したタイマーを再開する */
function resume() { isPaused.value && startTimer(); }

/** タイマーをリセットする */
function resetTimer() {
  startDatetime.value = undefined;
  pauseStartTime.value = undefined;
  isPaused.value = false;
  totalPausedTime.value = 0;
}

function save(): RikordTimerResult {
  return {
    startDatetime: startDatetime.value,
    endDatetime: endDatetime.value,
  };
}

export const useRikordTimer = (): UseRikordTimer => {
  return {
    startDatetime,
    endDatetime,
    startTimer,
    isPaused,
    pauseResume,
    resetTimer,
    save,
  };
};
