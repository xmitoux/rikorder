import type { CreateRikordDto, RikordEntityResponse, SearchRikordsDto } from '@repo/db';

export const createRikordApi = (body: CreateRikordDto) => {
  return $fetch<RikordEntityResponse>('/api/rikords', { body, method: 'POST' });
};

export const searchRikordsApi = (body: SearchRikordsDto) => {
  return $fetch<RikordEntityResponse[]>('/api/rikords/search', { body, method: 'POST' });
};

export const udpateRikordApi = (body: CreateRikordDto) => {
  return $fetch<RikordEntityResponse>('/api/rikords', { body, method: 'PATCH' });
};
