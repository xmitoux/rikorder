import type { RikoImageEntityResponse, RikoImageSettingEntityResponse, UpsertRikoImageSettingsDto } from '@repo/db';

export const createRikoImageWithSettingsApi = (body: FormData) => {
  return $fetch<RikoImageEntityResponse>('/api/riko-library/riko-images', { body, method: 'post' });
};

export async function findRikoImageSettingsByRikoImageIdApi(rikordImageId: number): Promise<RikoImageSettingEntityResponse[]> {
  const result = await $fetch<RikoImageSettingEntityResponse[]>(`/api/riko-library/${rikordImageId}`, { method: 'get' })
    .catch((error) => {
      handleApiError(error, 'findRikoImageSettingsByRikoImageIdApi');
      throw error;
    });

  return result;
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
