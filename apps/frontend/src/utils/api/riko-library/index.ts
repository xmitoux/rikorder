import type { RikoImageEntityResponse, RikoImageSettingEntityResponse, UpsertRikoImageSettingsDto } from '@repo/db';

export const createRikoImageWithSettingsApi = (body: FormData) => {
  return $fetch<RikoImageEntityResponse>('/api/riko-library/riko-images', { body, method: 'post' });
};

export async function findRikoImageSettingsByRikoImageIdApi(rikordImageId: number): Promise<RikoImageSettingEntityResponse[]> {
  const result = await $fetch<RikoImageSettingEntityResponse[]>(`/api/riko-library/${rikordImageId}`, { method: 'get' })
    .catch((error) => {
      console.error('findRikoImageSettingsByRikoImageIdApi:', { error });
      handleError(error);
      throw error;
    });

  return result;
}

export async function upsertRikoImageSettingsApi(body: UpsertRikoImageSettingsDto) {
  await $fetch('/api/riko-library/image-settings', { body, method: 'post' })
    .catch((error) => {
      console.error('upsertRikoImageSettingsApi:', { error });
      handleError(error);
      throw error;
    });

  return true;
}
