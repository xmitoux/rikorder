<!-- OKボタン -->
<script setup lang="ts">
type Props = {
  label?: string;
};

withDefaults(defineProps<Props>(), {
  label: 'OK',
});
</script>

<template>
  <q-btn color="pink-2" :label="label" rounded text-color="dark" unelevated />
</template>

<style scoped lang="scss">

</style>
