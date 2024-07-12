<script setup lang="ts">
import { RIKORD_MODE_ICONS, RIKORD_MODES } from '~/constants/rikord-mode';

import type { RikordModeName } from '~/types/rikord-mode';

const emit = defineEmits<{
  toggle: [rikordMode: RikordModeName];
}>();

const selectedRikordMode = ref<RikordModeName>('View');

function onToggle(rikordModeLable: string) {
  selectedRikordMode.value = rikordModeLable as RikordModeName;
  emit('toggle', selectedRikordMode.value);
}
</script>

<template>
  <UIButtonToggle
    :label1="RIKORD_MODES.View.modeName" :label2="RIKORD_MODES.Solo.modeName" :label3="RIKORD_MODES.Multi.modeName"
    :mdi1="RIKORD_MODE_ICONS.View(selectedRikordMode !== 'View')"
    :mdi2="RIKORD_MODE_ICONS.Solo(selectedRikordMode !== 'Solo')"
    :mdi3="RIKORD_MODE_ICONS.Multi(selectedRikordMode !== 'Multi')"
    @change="onToggle"
  />
</template>

<style scoped lang="scss">

</style>
