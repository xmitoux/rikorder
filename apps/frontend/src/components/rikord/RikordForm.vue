<!-- Rikord記録画面 -->
<script setup lang="ts">
withDefaults(defineProps<{
  show: boolean;
  headerTitle: string;
  submitButtonLabel: string;
}>(),
{
  headerTitle: 'Rikord記録',
  submitButtonLabel: '記録する',
});

const emit = defineEmits(['ok', 'cancel']);
</script>

<template>
  <q-dialog maximized :model-value="show" persistent transition-hide="jump-right" transition-show="jump-left">
    <NuxtLayout name="custom">
      <template #header>
        {{ headerTitle }}
      </template>

      <template #footer>
        <UIButtonCancel class="q-mr-sm" @click="emit('cancel')" />

        <UIButtonOk class="q-mr-sm" :label="submitButtonLabel" @click="emit('ok')">
          <q-spinner-radio color="white" size="xs" />
        </UIButtonOk>
      </template>
    </NuxtLayout>
  </q-dialog>
</template>

<style scoped lang="scss">
</style>
