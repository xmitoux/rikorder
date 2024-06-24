<script setup lang="ts">
import { date } from 'quasar';

import type { RikoImageCreateDto } from '@repo/db';

const { data: rikoImages } = await findRikoImagesApi();

const imageUrl = ref('');
const udloadedAt = ref('');

const createRikoImage = () => {
  const tmpUploadedAt = date.formatDate(new Date(udloadedAt.value), 'YYYY-MM-DDTHH:mm:ss') + 'Z';

  const dto: RikoImageCreateDto = {
    url: imageUrl.value,
    uploadedAt: tmpUploadedAt,
  };

  createRikoImageApi(dto);
};
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
      <div>
        <q-chip v-for="rikoImage in rikoImages" :key="rikoImage.id">
          {{ rikoImage.url }}
        </q-chip>
      </div>

      <div>
        <q-input v-model="imageUrl" clearable label="Image URL" />
        <q-input v-model="udloadedAt" clearable label="Udpated At" type="datetime-local" />
      </div>
    </q-page-container>

    <q-footer class="bg-grey-8 text-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div>Footer</div>
        </q-toolbar-title>

        <q-btn color="primary" @click="createRikoImage">
          create
        </q-btn>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
