import type { RikoImageEntityResponse } from '@repo/db';

import type { RikordModeIdValue } from '~/types/rikord-mode';

export const findRikoImagesApi = () => {
  return useFetch<RikoImageEntityResponse[]>('/api/riko-images', { method: 'get' });
};

export const findRikoImagesByRikordModeIdApi = async (rikordModeId: RikordModeIdValue): Promise<RikoImageEntityResponse[]> => {
  const result = await $fetch<RikoImageEntityResponse[]>(`/api/riko-images/find-by-rikord-mode/${rikordModeId}`, { method: 'get' })
    .catch((error) => {
      console.error('findRikoImagesByRikordModeIdApi:', { error });
      handleError(error);
      throw error;
    });

  return result;
};

export const findFavoriteRikoImagesApi = async (rikordModeId: RikordModeIdValue): Promise<RikoImageEntityResponse[]> => {
  const result = await $fetch<RikoImageEntityResponse[]>(`/api/riko-images/find-favorite/${rikordModeId}`, { method: 'get' })
    .catch((error) => {
      console.error('findFavoriteRikoImagesApi:', { error });
      handleError(error);
      throw error;
    });

  return result;
};
