<!-- 👑ランキング画面 ランキング一覧 -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordModeName } from '~/types/rikord-mode';

export type RankingItem = {
  rank: number;
  rankValue: number;
  rikoImage: RikoImageEntityResponse;
};

const props = defineProps<{
  rikordMode: RikordModeName;
  items: RankingItem[];
  loading: boolean;
}>();

const { formatDurationDatetime } = dateUtils();
function rankValueLabel(rankValue: number): string {
  return props.rikordMode === 'View'
    ? formatDurationDatetime(rankValue)
    : `${rankValue}回`;
}

function rankColor(rank: number): string {
  switch (rank) {
    case 1: {
      return 'yellow-6';
    }

    case 2: {
      return 'blue-grey-11';
    }

    case 3: {
      return 'deep-orange-10';
    }

    default: {
      return 'pink-1';
    }
  }
}

function rankIcon(rank: number): string {
  return rank === 1 || rank === 2 || rank === 3 ? 'mdi-crown' : 'mdi-bookmark';
}
</script>

<template>
  <q-timeline color="pink-1">
    <!-- データロード中のスケルトン -->
    <template v-if="loading">
      <q-timeline-entry
        v-for="i in 10" :key="i"
        :color="rankColor(i)"
        :icon="rankIcon(i)"
        :subtitle="`${i}位`"
        title="--"
      >
        <div class="q-pr-sm row justify-center">
          <q-skeleton size="150px" />
        </div>
      </q-timeline-entry>
    </template>

    <template v-else>
      <q-timeline-entry
        v-for="item in items" :key="item.rank"
        :color="rankColor(item.rank)"
        :icon="rankIcon(item.rank)"
        :subtitle="`${item.rank}位`"
        :title="rankValueLabel(item.rankValue)"
      >
        <div class="q-pr-sm">
          <q-img
            fit="contain"
            height="150px"
            no-spinner
            :ratio="16/9"
            :src="item.rikoImage.url"
            @click="navigateTo(`/riko-library/${item.rikoImage.id}`)"
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
