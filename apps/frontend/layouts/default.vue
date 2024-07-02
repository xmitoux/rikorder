<script setup lang="ts">
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-pink-2 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <slot />
    </q-page-container>

    <q-footer class="bg-pink-2 text-white">
    </q-footer>
  </q-layout>
</template>
