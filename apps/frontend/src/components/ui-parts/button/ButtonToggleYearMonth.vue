<script setup lang="ts">
const emit = defineEmits<{
  toggle: [yearMonth: ToggleYearMonth];
}>();

export type ToggleYearMonth = '年別' | '月別';
const model = ref<ToggleYearMonth>('年別');

const mdiYear = computed(() => model.value === '年別' ? 'mdi-calendar-blank' : 'mdi-calendar-blank-outline');
const mdiMonth = computed(() => model.value === '月別' ? 'mdi-calendar-month' : 'mdi-calendar-month-outline');

function onToggle(model: string) {
  emit('toggle', model as ToggleYearMonth);
}
</script>

<template>
  <UIButtonToggle
    v-model="model"
    label1="年別" label2="月別"
    :mdi1="mdiYear" :mdi2="mdiMonth"
    @change="onToggle"
  />
</template>

<style scoped lang="scss">

</style>
