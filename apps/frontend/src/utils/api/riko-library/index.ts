import type { RikoImageEntityResponse, RikoImageSettingEntityResponse } from '@repo/db';

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
