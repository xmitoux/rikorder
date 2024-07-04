import type { RikoImageCreateDto, RikoImageEntityResponse } from '@repo/db';

export const createRikoImageApi = (body: RikoImageCreateDto) => {
  return $fetch<RikoImageEntityResponse>('/api/riko-images', { body, method: 'post' });
};

export const findRikoImagesApi = () => {
  return useFetch<RikoImageEntityResponse[]>('/api/riko-images', { method: 'get' });
};
