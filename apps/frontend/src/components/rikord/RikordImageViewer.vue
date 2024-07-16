<script setup lang="ts">
import type { RikordTimerResult } from '~/types/rikord';

const show = defineModel<boolean>('show', { required: true });
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
      <!-- TODO: 選んだ画像を表示 -->
      <q-img class="full-height" src="https://i.idol.st/u/card/art/2x/30Sakurauchi-Riko-Water-Symphony-UR-LpaEgy.png" @click="invisbleRikordTimer = false" />
    </div>

    <RikordTimer v-model:invisible="invisbleRikordTimer" v-model:show="showRikordTimer" @cancel="cancelRikordTimer" @save="saveRikordTime" />
  </q-dialog>
</template>

<style scoped lang="scss">

</style>
