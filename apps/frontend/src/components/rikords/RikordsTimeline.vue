<!-- 📋️Rikord一覧画面 タイムライン -->
<script setup lang="ts">
import type { RikordEntityResponse } from '@repo/db';

defineProps<{
  rikords: RikordEntityResponse[];
}>();

const { formatDate, formatDuration } = dateUtils();

function formatStartFinishedTime({ startedAt, finishedAt, duration }: RikordEntityResponse): string {
  return `${formatDate(startedAt, 'HH:mm')}～${formatDate(finishedAt, 'HH:mm')} (${formatDuration(duration)})`;
}
</script>

<template>
  <div>
    <q-timeline color="pink-1">
      <q-timeline-entry
        v-for="rikord in rikords" :key="rikord.id"
        color="pink-1" icon="mdi-check"
        :subtitle="formatDate(rikord.startedAt, 'YYYY/MM/DD(ddd)')"
        :title="formatStartFinishedTime(rikord)"
      >
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img
              class="col"
              :src="rikord.rikoImage.url"
            />
          </q-card-section>
        </q-card>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<style scoped lang="scss">

</style>
