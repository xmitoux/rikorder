<!-- 📋️Rikord一覧画面 タイムライン -->
<script setup lang="ts">
import type { RikordEntityResponse } from '@repo/db';

defineProps<{
  rikords: RikordEntityResponse[];
  loading: boolean;
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
    <!-- データロード中のスケルトン -->
    <template v-if="loading">
      <q-timeline-entry
        v-for="i in 10" :key="i"
        color="pink-1"
        icon="mdi-check"
        subtitle="----/--/--"
        title="--:--"
      >
        <div class="q-pr-sm row justify-center">
          <q-skeleton size="150px" />
        </div>
      </q-timeline-entry>
    </template>

    <template v-else>
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
            height="150px"
            no-spinner
            :ratio="16/9"
            :src="rikord.rikoImage.url"
            @click="navigateTo(`/riko-library/${rikord.rikoImageId}`)"
          >
            <!-- 取得した画像のロード中もスピナーではなくスケルトンを表示 -->
            <template #loading>
              <q-skeleton size="90px" />
            </template>
          </q-img>
        </div>
      </q-timeline-entry>
    </template>
  </q-timeline>
</template>

<style scoped lang="scss">

</style>
