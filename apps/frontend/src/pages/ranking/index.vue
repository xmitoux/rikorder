<!-- 👑ランキング画面 -->
<script setup lang="ts">
const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

const rankingList = ref([]);
rankingList.value = [
  { rank: 1, rankValue: 1_366_500, rikoImage: { url: 'https://bibjqyafzulueizuahxw.supabase.co/storage/v1/object/public/riko-images-dev/1721315402017_30Sakurauchi-Riko-Water-Symphony-UR-hZpU4Z.jpg' } },
  { rank: 2, rankValue: 4320, rikoImage: { url: 'https://bibjqyafzulueizuahxw.supabase.co/storage/v1/object/public/riko-images-dev/1721315402017_30Sakurauchi-Riko-Water-Symphony-UR-hZpU4Z.jpg' } },
  { rank: 3, rankValue: 610, rikoImage: { url: 'https://bibjqyafzulueizuahxw.supabase.co/storage/v1/object/public/riko-images-dev/1721315402017_30Sakurauchi-Riko-Water-Symphony-UR-hZpU4Z.jpg' } },
  { rank: 4, rankValue: 61, rikoImage: { url: 'https://bibjqyafzulueizuahxw.supabase.co/storage/v1/object/public/riko-images-dev/1721315402017_30Sakurauchi-Riko-Water-Symphony-UR-hZpU4Z.jpg' } },
];
</script>

<template>
  <div>
    <RankingList :items="rankingList" :rikord-mode="currentRikordMode.modeName" />
  </div>
</template>

<style scoped>
</style>
