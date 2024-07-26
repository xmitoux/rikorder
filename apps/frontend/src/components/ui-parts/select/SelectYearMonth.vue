<script setup lang="ts">
import type { SearchRikordsDto } from '@repo/db';

const yearMonth = defineModel<SearchRikordsDto>('yearMonth', { required: true });

// 現在の西暦から2023年までの降順リストを作る
const years: number[] = [];
for (let year = (new Date()).getFullYear(); year >= 2023; year--) {
  years.push(year);
}
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
</script>

<template>
  <div class="row justify-evenly">
    <div class="col-5">
      <UISelectBase v-model="yearMonth.year" append-label="年" :options="years" />
    </div>

    <div class="col-5">
      <UISelectBase v-model="yearMonth.month" append-label="月" :options="months" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
