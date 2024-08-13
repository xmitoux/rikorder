<!-- プログレスバーコンポーネント -->
<script setup lang="ts">
import type { NamedColor } from 'quasar';

export type ProgressBarProps = {
  label?: string;
  color: NamedColor;
  progress: number;
  maxProgress: number;
};

const props = defineProps<ProgressBarProps>();

// 進捗率によってプログレスバーのcolorを変える
const paletteColor = computed<NamedColor>(() => {
  // Quasarカラーパレットの使用範囲
  const COLOR_PALETTE_RANGE = 6;
  // 進捗率にパレットの数をかけることでパレットの番号を得る
  const colorValue = props.progress / props.maxProgress;
  const palleteNumber = Math.floor(colorValue * COLOR_PALETTE_RANGE);

  // パレット名のサフィックス
  let palleteSuffix = '';
  if (palleteNumber === 0) {
    // '-0'はないので下駄を履かせる
    palleteSuffix = `-${palleteNumber + 1}`;
  }
  else if (COLOR_PALETTE_RANGE <= palleteNumber) {
    // 進捗率1超えはサフィックスなしのパレットカラー
    palleteSuffix = '';
  }
  else {
    palleteSuffix = `-${palleteNumber}`;
  }

  const colorName: NamedColor = `${props.color}${palleteSuffix}`;
  return colorName;
});
</script>

<template>
  <div>
    {{ label }}
    <q-linear-progress :color="paletteColor" rounded size="10px" stripe :value="progress / maxProgress" />
  </div>
</template>

<style scoped lang="scss">
</style>
