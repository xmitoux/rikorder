<script setup lang="ts">
import type { QBtnToggle, QBtnToggleProps } from 'quasar';

const props = defineProps<{
  label1: string; mdi1: string;
  label2: string; mdi2: string;
}>();

const emit = defineEmits<{
  change: [label: ToggleValue];
}>();

const ONE = 'one' as const;
const TWO = 'two' as const;
export type ToggleValue = typeof ONE | typeof TWO;

const toggle = ref<ToggleValue>('one');

const toggleOptions: QBtnToggleProps['options'] = [
  { value: ONE, slot: ONE },
  { value: TWO, slot: TWO },
];

watchEffect(() => {
  emit('change', toggle.value);
});
</script>

<template>
  <div>
    <q-btn-toggle
      v-model="toggle"
      class="border"
      :options="toggleOptions"
      rounded spread
      text-color="dark" toggle-color="pink-2" toggle-text-color="dark"
      unelevated
    >
      <template #one>
        <div class="row items-center no-wrap">
          <div class="text-center">
            {{ props.label1 }}
          </div>

          <q-icon :name="props.mdi1" right />
        </div>
      </template>

      <template #two>
        <div class="row items-center no-wrap">
          <div class="text-center">
            {{ props.label2 }}
          </div>

          <q-icon :name="props.mdi2" right />
        </div>
      </template>
    </q-btn-toggle>
  </div>
</template>

<style lang="scss" scoped>
.border {
  border: 1px solid $dark
}
</style>
