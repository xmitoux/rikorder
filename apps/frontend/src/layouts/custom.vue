<script setup lang="ts">
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-pink-2 text-dark header">
      <q-toolbar>
        <q-toolbar-title class="text-center ">
          <slot name="header">
            ヘッダータイトル
          </slot>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-lg bg-white">
        <slot />
      </q-page>
    </q-page-container>

    <q-footer class="bg-white footer">
      <q-toolbar class="q-pt-sm">
        <q-space />
        <slot name="footer" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/_variables.scss" as var;

.header {
  height: var.$app-header-height;
}

.footer {
  height: var.$app-footer-height;
  border-top: 1px $grey solid;
}
</style>
