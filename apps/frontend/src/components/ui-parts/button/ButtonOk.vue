<!-- OKボタン -->
<script setup lang="ts">
type Props = {
  label?: string;
  loading?: boolean;
};

withDefaults(defineProps<Props>(), {
  label: 'OK',
});
</script>

<template>
  <q-btn color="pink-2" :label="label" :loading="loading" :ripple="{ color: 'white' }" rounded text-color="dark" unelevated>
    <template #loading>
      <slot />
    </template>
  </q-btn>
</template>

<style scoped lang="scss">

</style>
