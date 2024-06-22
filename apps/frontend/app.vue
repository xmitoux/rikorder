<script setup lang="ts">
const hoge = 'hello';
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    {{ hoge }}
  </div>
</template>
