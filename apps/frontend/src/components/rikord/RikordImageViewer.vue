<!-- Rikord画像ビューア -->
<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordTimerResult } from '~/types/rikord';

const show = defineModel<boolean>('show', { required: true });

defineProps<{
  rikoImage: RikoImageEntityResponse;
}>();

const emit = defineEmits<{
  save: [rikordResult: RikordTimerResult];
  cancel: [];
}>();

const showRikordTimer = ref(false);
const invisbleRikordTimer = ref(true);
function saveRikordTime(result: RikordTimerResult) {
  emit('save', result);
}
function cancelRikordTimer() {
  emit('cancel');
}

const onShow = () => {
  showRikordTimer.value = true;
};

const onHide = () => {
  invisbleRikordTimer.value = true;
  showRikordTimer.value = false;
};
</script>

<template>
  <q-dialog v-model="show" maximized persistent transition-hide="jump-right" transition-show="jump-left" @hide="onHide" @show="onShow">
    <div class="bg-white">
      <q-img class="full-height" :src="rikoImage.url" @click="invisbleRikordTimer = false" />
    </div>

    <RikordTimer v-model:invisible="invisbleRikordTimer" v-model:show="showRikordTimer" @cancel="cancelRikordTimer" @save="saveRikordTime" />
  </q-dialog>
</template>

<style scoped lang="scss">

</style>
