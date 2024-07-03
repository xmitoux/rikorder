<script setup lang="ts">
</script>

<template>
  <div>
    <div class="row justify-end">
      <div class="col-8">
        <ToggleButton
          label1="画像" label2="タグ"
          mdi1="mdi-image-outline" mdi2="mdi-tag-outline"
        />
      </div>

      <div class="col-1 text-center q-px-xs">
        <q-btn color="dark" flat icon="mdi-filter-menu-outline" round />
      </div>

      <div class="col-1 text-center q-px-xs">
        <q-btn color="dark" flat icon="mdi-plus" round />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.border {
  border: 1px solid $dark
}
</style>
