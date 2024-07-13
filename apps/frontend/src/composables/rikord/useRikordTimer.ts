type UseRikordTimer = {
  elapsedTime: ComputedRef<number>;
  start: () => void;
  isPaused: Ref<boolean>;
  pauseResume: () => void;
  reset: () => void;
};

const startTime = ref<number | undefined>();
const pausedTime = ref<number | undefined>();
const isPaused = ref(false);

// 経過時間を計算する算出プロパティ
const elapsedTime = computed(() => {
  if (!startTime.value) {
    return 0;
  }

  const endTime = isPaused.value ? pausedTime.value! : Date.now();
  return Math.floor((endTime - startTime.value) / 1000);
});

// タイマーを開始する関数
function start() {
  if (!startTime.value) {
    // 初回開始時
    startTime.value = Date.now();
  }
  else if (isPaused.value) {
    // 一時停止後の再開時
    startTime.value += Date.now() - pausedTime.value!;
    isPaused.value = false;
  }
}

// 一時停止/再開ボタンが押されたときの処理
function pauseResume() { isPaused.value ? resume() : pause(); }

// タイマーを一時停止する関数
function pause() {
  if (!isPaused.value) {
    pausedTime.value = Date.now();
    isPaused.value = true;
  }
}

// 一時停止したタイマーを再開する関数
function resume() {
  if (isPaused.value) {
    start();
  }
}

// タイマーをリセットする関数
function reset() {
  startTime.value = undefined;
  pausedTime.value = undefined;
  isPaused.value = false;
}

export const useRikordTimer = (): UseRikordTimer => {
  return {
    elapsedTime,
    start,
    isPaused,
    pauseResume,
    reset,
  };
};
