<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <q-chip color="white" :ripple="false">
    {{ label }}
  </q-chip>
</template>

<style scoped lang="scss">

</style>
