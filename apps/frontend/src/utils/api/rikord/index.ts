import type { CreateRikordDto, RikordEntityResponse, RikordInfoEntityResponse, SearchRikordsDto, UpdateRikordDto } from '@repo/db';

import type { RikordModeIdValue } from '~/types/rikord-mode';

export async function createRikordApi(body: CreateRikordDto) {
  await $fetch<RikordEntityResponse>('/api/rikords', { body, method: 'POST' })
    .catch((error) => {
      handleApiError(error, 'createRikordApi');
      throw error;
    });
}

export async function searchRikordsApi(body: SearchRikordsDto) {
  return $fetch<RikordEntityResponse[]>('/api/rikords/search', { body, method: 'POST' })
    .catch((error) => {
      handleApiError(error, 'searchRikordsApi');
      throw error;
    });
}

export async function getRikordInfoApi(rikordModeId: RikordModeIdValue) {
  return $fetch<RikordInfoEntityResponse>(`/api/rikords/info/${rikordModeId}`, { method: 'GET' })
    .catch((error) => {
      handleApiError(error, 'getRikordInfoApi');
      throw error;
    });
}

export async function udpateRikordApi(body: UpdateRikordDto) {
  await $fetch<RikordEntityResponse>('/api/rikords', { body, method: 'PATCH' })
    .catch((error) => {
      handleApiError(error, 'udpateRikordApi');
      throw error;
    });
}

export async function deleteRikordApi(rikordId: number) {
  await $fetch<RikordEntityResponse>(`/api/rikords/${rikordId}`, { method: 'DELETE' })
    .catch((error) => {
      handleApiError(error, 'deleteRikordApi');
      throw error;
    });
}
