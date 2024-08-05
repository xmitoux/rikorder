<!-- 📋️Rikord一覧画面 タイムライン -->
<script setup lang="ts">
import type { RikordEntityResponse } from '@repo/db';

defineProps<{
  rikords: RikordEntityResponse[];
}>();

const emit = defineEmits<{
  edit: [selectedRikord: RikordEntityResponse];
  delete: [rikordId: number];
}>();

const { formatDate, formatDuration } = dateUtils();

function formatStartFinishedTime({ startedAt, finishedAt, duration }: RikordEntityResponse): string {
  return `${formatDate(startedAt, 'HH:mm')}～${formatDate(finishedAt, 'HH:mm')} (${formatDuration(duration)})`;
}
</script>

<template>
  <q-timeline color="pink-1">
    <q-timeline-entry
      v-for="rikord in rikords" :key="rikord.id"
      class="relative-position" color="pink-1" icon="mdi-check"
      :subtitle="formatDate(rikord.startedAt, 'YYYY/MM/DD(ddd)')"
      :title="formatStartFinishedTime(rikord)"
    >
      <!-- 編集メニュー -->
      <div class="absolute-top-right q-pt-sm">
        <q-btn color="pink-2" flat icon="mdi-dots-horizontal-circle-outline" padding="0">
          <q-menu auto-close>
            <q-list>
              <q-item class="q-px-xs" clickable>
                <q-item-section>
                  <!-- 編集メニュー -->
                  <q-btn flat icon="mdi-pencil" label="編集" padding="0" @click="emit('edit', rikord)" />
                </q-item-section>
              </q-item>
              <q-item class="q-px-xs" clickable>
                <!-- 削除メニュー -->
                <q-btn class="text-red-6" flat icon="mdi-delete" label="削除" @click="emit('delete', rikord.id)" />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <div class="q-pr-sm">
        <q-img
          fit="contain"
          :ratio="16/9"
          :src="rikord.rikoImage.url"
        />
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>

<style scoped lang="scss">

</style>
