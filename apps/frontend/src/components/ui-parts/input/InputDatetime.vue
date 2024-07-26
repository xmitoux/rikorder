<script setup lang="ts">
const model = defineModel<string>({ required: true });

const emit = defineEmits<{
  input: [inputDatetime: string];
}>();

const { dateLocale, formatDate } = dateUtils();
const titleDate = computed(() => formatDate(model.value, 'MM/DD(ddd)'));
</script>

<template>
  <q-input v-model="model" class="text-subtitle1" color="pink-2" input-class="hoge" outlined readonly rounded>
    <template #append>
      <q-icon class="cursor-pointer" name="mdi-calendar">
        <q-popup-proxy cover transition-hide="scale" transition-show="scale">
          <q-date
            v-model="model"
            color="pink-2" flat :locale="dateLocale" mask="YYYY-MM-DD HH:mm:ss" :title="titleDate" today-btn
            @update:model-value="emit('input', $event)"
          />
        </q-popup-proxy>
      </q-icon>

      <q-icon class="cursor-pointer" name="mdi-clock-outline">
        <q-popup-proxy cover transition-hide="scale" transition-show="scale">
          <q-time
            v-model="model"
            color="pink-2" flat format24h mask="YYYY-MM-DD HH:mm:ss" now-btn with-seconds
            @update:model-value="emit('input', $event!)"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<style scoped lang="scss">

</style>
