<script setup lang="ts">
import type { QBtnToggleProps } from 'quasar';

const props = defineProps<{
  label1: string; mdi1: string;
  label2: string; mdi2: string;
  label3?: string; mdi3?: string;
}>();

const emit = defineEmits<{
  change: [label: string];
}>();

const ONE = 'one' as const;
const TWO = 'two' as const;
const THREE = 'three' as const;
const toggle = ref<string>(props.label1);

const toggleOptions: QBtnToggleProps['options'] = [
  { value: props.label1, slot: ONE },
  { value: props.label2, slot: TWO },
];

if (props.label3) {
  toggleOptions.push({ value: props.label3, slot: THREE });
}
</script>

<template>
  <q-btn-toggle
    v-model="toggle"
    class="border"
    :options="toggleOptions"
    rounded spread
    text-color="dark" toggle-color="pink-2" toggle-text-color="dark"
    unelevated
    @update:model-value="emit('change', $event)"
  >
    <template #one>
      <div class="row items-center no-wrap">
        <div class="text-center text-capitalize">
          {{ label1 }}
        </div>

        <q-icon :name="mdi1" right />
      </div>
    </template>

    <template #two>
      <div class="row items-center no-wrap">
        <div class="text-center text-capitalize">
          {{ label2 }}
        </div>

        <q-icon :name="mdi2" right />
      </div>
    </template>

    <template v-if="label3" #three>
      <div class="row items-center no-wrap">
        <div class="text-center text-capitalize">
          {{ label3 }}
        </div>

        <q-icon v-if="mdi3" :name="mdi3" right />
      </div>
    </template>
  </q-btn-toggle>
</template>

<style lang="scss" scoped>
.border {
  border: 1px solid $dark
}
</style>
