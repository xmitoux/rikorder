import { FetchError } from 'ofetch';

import type { RikoImageCreateDto, RikoImageEntityResponse } from '@repo/db';

import type { RikordModeIdValue } from '~/types/rikord-mode';

export const createRikoImageApi = (body: RikoImageCreateDto) => {
  return $fetch<RikoImageEntityResponse>('/api/riko-images', { body, method: 'post' });
};

export const findRikoImagesApi = () => {
  return useFetch<RikoImageEntityResponse[]>('/api/riko-images', { method: 'get' });
};

export const findRikoImagesByRikordModeIdApi = async (rikordModeId: RikordModeIdValue): Promise<RikoImageEntityResponse[]> => {
  const result = await $fetch<RikoImageEntityResponse[]>(`/api/riko-images/find-by-rikord-mode/${rikordModeId}`, { method: 'get' })
    .catch((error) => {
      console.error('findRikoImagesByRikordModeIdApi:', { error });

      if (error instanceof FetchError && error.response?._data?.data?.message) {
        console.error({ errorMessage: error.response?._data?.data?.message });
      }

      throw error;
    });

  return result;
};
