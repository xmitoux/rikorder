import type { RikoImageEntityResponse } from '@repo/db';

export const createRikoImageWithSettingsApi = (body: FormData) => {
  return $fetch<RikoImageEntityResponse>('/api/riko-library/riko-images', { body, method: 'post' });
};
