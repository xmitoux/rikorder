<script setup lang="ts">
const model = defineModel<number>({ required: true });
defineProps<{
  options: number[];
  appendLabel: string;
}>();
</script>

<template>
  <q-select v-model="model" behavior="menu" color="pink-2" dense :options="options" outlined rounded transition-show="jump-down">
    <template #append>
      <span class="text-caption">
        {{ appendLabel }}
      </span>
    </template>
  </q-select>
</template>

<style scoped lang="scss">

</style>
