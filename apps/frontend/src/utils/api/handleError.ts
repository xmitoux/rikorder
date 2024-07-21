import { FetchError } from 'ofetch';

export const handleError = (error: unknown) => {
  if (error instanceof FetchError && error.response?._data?.data?.message) {
    console.error({ errorMessage: error.response?._data?.data?.message });
  }
};
