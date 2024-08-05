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
  return rank === 1 || rank === 2 || rank === 3 ? 'mdi-crown' : 'mdi-check';
}
</script>

<template>
  <q-timeline color="pink-1">
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
          :ratio="16/9"
          :src="item.rikoImage.url"
        />
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>

<style scoped lang="scss">

</style>
