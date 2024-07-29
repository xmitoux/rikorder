import type { CreateRikordDto, RikordEntityResponse, SearchRikordsDto, UpdateRikordDto } from '@repo/db';

export const createRikordApi = async (body: CreateRikordDto) => {
  await $fetch<RikordEntityResponse>('/api/rikords', { body, method: 'POST' })
    .catch((error) => {
      console.error('createRikordApi:', { error });
      handleError(error);
      return false;
    });

  return true;
};

export const searchRikordsApi = (body: SearchRikordsDto) => {
  return $fetch<RikordEntityResponse[]>('/api/rikords/search', { body, method: 'POST' });
};

export const udpateRikordApi = async (body: UpdateRikordDto) => {
  await $fetch<RikordEntityResponse>('/api/rikords', { body, method: 'PATCH' })
    .catch((error) => {
      console.error('udpateRikordApi:', { error });
      handleError(error);
      return false;
    });

  return true;
};
