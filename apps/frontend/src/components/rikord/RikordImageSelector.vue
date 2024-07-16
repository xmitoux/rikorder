<script setup lang="ts">
import type { RikoImageEntityResponse } from '@repo/db';

const show = defineModel<boolean>('show', { required: true });

defineProps<{
  rikoImages: RikoImageEntityResponse[];
}>();

const emit = defineEmits<{
  select: [rikoImage: RikoImageEntityResponse];
  cancel: [];
}>();

function selectImage(selectedImage: RikoImageEntityResponse) {
  emit('select', selectedImage);
}
</script>

<template>
  <q-dialog v-model="show" maximized persistent transition-hide="jump-right" transition-show="jump-left">
    <NuxtLayout name="custom">
      <template #header>
        画像選択
      </template>

      <RikoLibraryImageList :images="rikoImages" @click="selectImage" />

      <template #footer>
        <UIButtonCancel class="q-mr-sm" @click="emit('cancel')" />
      </template>
    </NuxtLayout>
  </q-dialog>
</template>

<style scoped lang="scss">

</style>
