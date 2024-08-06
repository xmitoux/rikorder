<script setup lang="ts">
const NuxtPwaManifest = process.env.NODE_ENV === 'production'
  ? resolveComponent('NuxtPwaManifest')
  : 'div';
</script>

<template>
  <div>
    <component :is="NuxtPwaManifest" />
    <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#FCE4EC 0%,#F06292 50%,#E91E62 100%)" />
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
