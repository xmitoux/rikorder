<script setup lang="ts">
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" elevated height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Riko Images
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab label="Page One" />
        <q-route-tab label="Page Two" />
        <q-route-tab label="Page Three" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div>Footer</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
