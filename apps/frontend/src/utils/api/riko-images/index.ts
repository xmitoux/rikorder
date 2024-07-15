import type { RikoImageCreateDto, RikoImageEntityResponse } from '@repo/db';

import type { RikordModeIdValue } from '~/types/rikord-mode';

export const createRikoImageApi = (body: RikoImageCreateDto) => {
  return $fetch<RikoImageEntityResponse>('/api/riko-images', { body, method: 'post' });
};

export const findRikoImagesApi = () => {
  return useFetch<RikoImageEntityResponse[]>('/api/riko-images', { method: 'get' });
};

export const findRikoImagesByRikordModeIdApi = (rikordModeId: RikordModeIdValue) => {
  return useFetch<RikoImageEntityResponse[]>(`/api/riko-images/find-by-rikord-mode/${rikordModeId}`, { method: 'get' });
};
