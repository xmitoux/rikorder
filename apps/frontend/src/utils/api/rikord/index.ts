import type { CreateRikordDto, RikordEntityResponse } from '@repo/db';

export const createRikordApi = (body: CreateRikordDto) => {
  return $fetch<RikordEntityResponse>('/api/rikords', { body, method: 'post' });
};
