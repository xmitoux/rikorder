import type { RikoImageDetailsEntityResponse, RikoImageEntityResponse, RikoImageSettingEntityResponse, UpsertRikoImageSettingsDto } from '@repo/db';

export async function createRikoImageWithSettingsApi(body: FormData) {
  const result = await $fetch<RikoImageEntityResponse>('/api/riko-library/riko-images', { body, method: 'post' })
    .catch((error) => {
      handleApiError(error, 'createRikoImageWithSettingsApi');
      throw error;
    });

  return result;
}

export async function findRikoImageSettingsByRikoImageIdApi(rikordImageId: number): Promise<RikoImageSettingEntityResponse[]> {
  const result = await $fetch<RikoImageSettingEntityResponse[]>(`/api/riko-library/${rikordImageId}`, { method: 'get' })
    .catch((error) => {
      handleApiError(error, 'findRikoImageSettingsByRikoImageIdApi');
      throw error;
    });

  return result;
}

export async function getRikoImageDetailsApi(rikoImageId: number) {
  return $fetch<RikoImageDetailsEntityResponse>(`/api/riko-library/details/${rikoImageId}`, { method: 'GET' })
    .catch((error) => {
      handleApiError(error, 'getRikoImageDetailsApi');
      throw error;
    });
}

export async function upsertRikoImageSettingsApi(body: UpsertRikoImageSettingsDto) {
  await $fetch('/api/riko-library/image-settings', { body, method: 'post' })
    .catch((error) => {
      handleApiError(error, 'upsertRikoImageSettingsApi');
      throw error;
    });

  return true;
}

export async function deleteRikoImageApi(id: number) {
  await $fetch(`/api/riko-library/riko-images/${id}`, { method: 'DELETE' })
    .catch((error) => {
      handleApiError(error, 'deleteRikoImageApi');
      throw error;
    });
}
