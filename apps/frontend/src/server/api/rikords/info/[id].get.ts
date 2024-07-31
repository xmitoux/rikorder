import { fetch } from '~/server/utils/fetch';

export default defineEventHandler(async (event) => {
  return fetch(event.path, { method: event.method });
});
