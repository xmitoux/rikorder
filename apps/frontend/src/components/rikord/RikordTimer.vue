<script setup lang="ts">
import type { RikordTimerResult } from '~/types/rikord';

const show = defineModel<boolean>('show', { required: true });
const invisible = defineModel<boolean>('invisible', { default: false });

const emit = defineEmits<{
  save: [rikordTimerResult: RikordTimerResult];
  cancel: [];
}>();

const store = useRikordModeStore();
const { currentRikordMode } = storeToRefs(store);

const {
  start,
  isPaused,
  pauseResume,
  reset,
  save,
} = useRikordTimer();

function onSave() {
  const result = save();
  emit('save', result);
}

function onCancel() { emit('cancel'); }
</script>

<template>
  <q-dialog v-model="show" backdrop-filter="blur(4px)" :class="{ invisible }" persistent position="standard" @hide="reset" @show="start">
    <q-card style="width: 80vw">
      <q-card-section class="text-center">
        <div class="text-h6">
          {{ isPaused ? '一時停止' : `${currentRikordMode.modeName}モードで計測` }}中
        </div>

        <template v-if="isPaused">
          <q-spinner-puff class="q-my-sm" color="pink-2" size="md" />
        </template>

        <template v-else>
          <q-spinner-clock v-if="currentRikordMode.modeName === 'View'" class="q-my-sm" color="pink-2" size="md" />
          <q-spinner-audio v-else-if="currentRikordMode.modeName === 'Solo'" class="q-my-sm" color="pink-2" size="md" />
          <q-spinner-hearts v-else class="q-my-sm" color="pink-2" size="md" />
        </template>

        <div>
          <q-btn flat icon="mdi-clock-edit-outline" round @click="onSave" />
          <q-btn flat :icon="isPaused ? 'mdi-play' : 'mdi-pause'" round @click="pauseResume" />
          <q-btn flat icon="mdi-close" round @click="onCancel" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">

</style>
