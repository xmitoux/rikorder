<script setup lang="ts">
import { date } from 'quasar';

const model = defineModel<string>({ required: true });

const emit = defineEmits<{
  input: [inputDatetime: string];
}>();

const dateLocale = {
  daysShort: '日_月_火_水_木_金_土'.split('_'),
  months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
};

const titleDate = computed(() => date.formatDate(new Date(model.value), 'MM/DD(ddd)', dateLocale));
</script>

<template>
  <q-input v-model="model" class="text-subtitle1" color="pink-2" input-class="hoge" outlined readonly rounded>
    <template #append>
      <q-icon class="cursor-pointer" name="mdi-calendar">
        <q-popup-proxy cover transition-hide="scale" transition-show="scale">
          <q-date v-model="model" color="pink-2" flat :locale="dateLocale" mask="YYYY-MM-DD HH:mm:ss" :title="titleDate" today-btn @update:model-value="emit('input', $event)" />
        </q-popup-proxy>
      </q-icon>

      <q-icon class="cursor-pointer" name="mdi-clock-outline">
        <q-popup-proxy cover transition-hide="scale" transition-show="scale">
          <q-time v-model="model" color="pink-2" flat format24h mask="YYYY-MM-DD HH:mm:ss" now-btn with-seconds @update:model-value="emit('input', $event!)" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<style scoped lang="scss">

</style>
