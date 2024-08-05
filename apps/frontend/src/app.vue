<script setup lang="ts">
const NuxtPwaManifest = process.env.NODE_ENV === 'production'
  ? resolveComponent('NuxtPwaManifest')
  : 'div';
</script>

<template>
  <div>
    <component :is="NuxtPwaManifest" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
