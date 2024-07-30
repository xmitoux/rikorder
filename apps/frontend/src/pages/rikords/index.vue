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

const $q = useQuasar();
const { dialogConfig } = useQuasarDialog();
const { notifyConfig } = useQuasarNotify();

const rikords = ref<RikordEntityResponse[]>([]);
watchEffect(async () => {
  try {
    rikords.value = await searchRikordsApi(yearMonth.value);
  }
  catch {
    $q.dialog(dialogConfig({ title: '取得失敗', message: 'Rikord一覧取得に失敗しました。' }));
  }
});

const rikoImages = ref<RikoImageEntityResponse[]>([]);
watchEffect(async () => {
  rikoImages.value = await findRikoImagesByRikordModeIdApi(currentRikordMode.value.id).catch(() => {
    $q.dialog(dialogConfig({ title: '画像取得失敗', message: '画像一覧取得に失敗しました。' }));
    return [];
  });
});

const rikordsFilterdByMode = computed(() =>
  rikords.value.filter(rikord => rikord.rikordModeId === currentRikordMode.value.id));

const showForm = ref(false);

const editRikord = ref<RikordEntityResponse | undefined>();
function onClickEdit(selectedRikord: RikordEntityResponse) {
  editRikord.value = selectedRikord;
  showForm.value = true;
}

async function onClickDelete(deleteRikordId: number) {
  $q.loading.show();

  try {
    await deleteRikordApi(deleteRikordId);
  }
  catch {
    $q.dialog(dialogConfig({ title: '削除失敗', message: 'Rikord削除に失敗しました。' }));
    return;
  }
  finally {
    $q.loading.hide();
  }

  rikords.value = rikords.value.filter(rikord => rikord.id !== deleteRikordId);

  $q.notify(notifyConfig('positive', { message: 'Rikordを削除しました！' }));
}

function closeForm() {
  editRikord.value = undefined;
  showForm.value = false;
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

    <RikordsTimeline :rikords="rikordsFilterdByMode" @delete="onClickDelete($event)" @edit="onClickEdit($event)" />

    <RikordForm
      v-model:show="showForm"
      :edit-rikord="editRikord" :header-title="editRikord ? 'Rikord編集' : '手動記録'"
      :riko-images="rikoImages" :submit-button-label="editRikord ? '更新する' : '記録する'"
      @cancel="closeForm" @ok="closeForm"
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
