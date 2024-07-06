<!-- キャンセルボタン -->
<script setup lang="ts">
type Props = {
  label?: string;
};

withDefaults(defineProps<Props>(), {
  label: 'キャンセル',
});
</script>

<template>
  <q-btn color="dark" :label="label" outline rounded />
</template>

<style scoped lang="scss">

</style>
