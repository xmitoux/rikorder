<!-- 📋️Rikord一覧画面 -->
<script setup lang="ts">
import type { RikoImageEntityResponse, RikordEntityResponse, SearchRikordsDto } from '@repo/db';

const date = new Date();
const yearMonth = ref<SearchRikordsDto>({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
});

const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

const rikords = ref<RikordEntityResponse[]>([]);
watchEffect(async () => {
  rikords.value = await searchRikordsApi(yearMonth.value).catch(() => {
    console.error('Rikord一覧取得に失敗しました。');
    return [];
  });
});

const rikoImages = ref<RikoImageEntityResponse[]>([]);
watchEffect(async () => {
  rikoImages.value = await findRikoImagesByRikordModeIdApi(currentRikordMode.value.id).catch(() => {
    console.error('画像選択画面用の画像取得に失敗しました。');
    return [];
  });
});

const rikordsFilterdByMode = computed(() =>
  rikords.value.filter(rikord => rikord.rikordModeId === currentRikordMode.value.id));

const showForm = ref(false);

const editRikord = ref<RikordEntityResponse | undefined>();
function onEditClick(selectedRikord: RikordEntityResponse) {
  editRikord.value = selectedRikord;
  showForm.value = true;
}
</script>

<template>
  <div class="q-mx-sm">
    <!-- UIヘッダー(スクロールで流れないよう位置固定) -->
    <div class="q-px-lg q-py-md bg-white header-ui">
      <UISelectYearMonth v-model:year-month="yearMonth" />

      <div class="absolute-top-right">
        <div class="q-py-md">
          <q-btn
            color="dark" flat icon="mdi-plus" :ripple="{ color: 'pink' }" round
            @click="showForm = true"
          />
        </div>
      </div>
    </div>

    <!-- UIヘッダーの分だけスペースを取る -->
    <div style="height: 30px;" />

    <RikordsTimeline :rikords="rikordsFilterdByMode" @edit="onEditClick($event)" />

    <RikordForm
      v-model:show="showForm"
      :edit-rikord="editRikord" header-title="手動記録" :riko-images="rikoImages"
      @cancel="showForm = false" @ok="showForm = false"
    />
  </div>
</template>

<style scoped lang="scss">
.header-ui {
  position: fixed;
  top: 50px; // アプリヘッダー分下げる
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
