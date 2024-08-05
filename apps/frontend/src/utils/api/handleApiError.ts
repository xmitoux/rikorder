import { FetchError } from 'ofetch';

export const handleApiError = (error: unknown, fucntionName: string) => {
  if (error instanceof FetchError && error.response?._data?.data?.message) {
    console.error(`${fucntionName}:`, { error });
    console.error({ errorMessage: error.response?._data?.data?.message });
  }
};
