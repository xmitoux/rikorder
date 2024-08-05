// @ts-nocheck
import { fetch } from '~/server/utils/fetch';

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);
  const formData = new FormData();
  formData.append(form[0]?.name, JSON.stringify(JSON.parse(form[0].data)));
  formData.append(form[1]?.name, new Blob([form[1].data], { type: form[1].type }), form[1].filename);

  return fetch(event.path, { body: formData, method: event.method });
});
