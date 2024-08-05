<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="row text-h6 text-dark">
    <div class="section-bar bg-pink-2 q-mr-sm" /> {{ label }}
  </div>
</template>

<style scoped lang="scss">
.section-bar {
  width: 4px;
  height: 30px;
}
</style>
