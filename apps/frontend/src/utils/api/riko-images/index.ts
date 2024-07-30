import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordModeIdValue } from '~/types/rikord-mode';

export const findRikoImagesApi = async () => {
  const result = await $fetch<RikoImageEntityResponse[]>(`/api/riko-images`, { method: 'get' })
    .catch((error) => {
      handleApiError(error, 'findRikoImagesApi');
      throw error;
    });

  return result;
};

export const findRikoImagesByRikordModeIdApi = async (rikordModeId: RikordModeIdValue): Promise<RikoImageEntityResponse[]> => {
  const result = await $fetch<RikoImageEntityResponse[]>(`/api/riko-images/find-by-rikord-mode/${rikordModeId}`, { method: 'get' })
    .catch((error) => {
      handleApiError(error, 'findRikoImagesByRikordModeIdApi');
      throw error;
    });

  return result;
};

export const findFavoriteRikoImagesApi = async (rikordModeId: RikordModeIdValue): Promise<RikoImageEntityResponse[]> => {
  const result = await $fetch<RikoImageEntityResponse[]>(`/api/riko-images/find-favorites/${rikordModeId}`, { method: 'get' })
    .catch((error) => {
      handleApiError(error, 'findFavoriteRikoImagesApi');
      throw error;
    });

  return result;
};
