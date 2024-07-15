import { FetchError } from 'ofetch';

import type { CreateRikordDto, RikoImageEntityResponse, RikordEntityResponse } from '@repo/db';

import type { RikordModeIdValue } from '~/types/rikord-mode';

type UseRikordForm = {
  selectedRikoImage: Ref<RikoImageEntityResponse | undefined>;
  startDatetime: Ref<string>;
  endDatetime: Ref<string>;
  validate: () => true | string;
  createRikord: (rikordModeId: RikordModeIdValue) => Promise<RikordEntityResponse | boolean>;
  createLoading: Ref<boolean>;
  resetForm: () => void;
};

const selectedRikoImage = ref<RikoImageEntityResponse | undefined>();
const startDatetime = ref('');
const endDatetime = ref('');

function validate(): true | string {
  if (!selectedRikoImage.value) { return '画像を選択してください。'; }
  if (!startDatetime.value || !endDatetime.value) { return '日時を入力してください。'; }

  const startDate = new Date(startDatetime.value);
  const endDate = new Date(endDatetime.value);
  if (endDate <= startDate) { return '日時が不正です。<br>[開始日時 < 終了日時] としてください。'; }

  return true;
}

const createLoading = ref(false);
const createRikord = async (rikordModeId: RikordModeIdValue): Promise<RikordEntityResponse | boolean> => {
  createLoading.value = true;

  const dto: CreateRikordDto = {
    rikoImageId: selectedRikoImage.value!.id,
    rikordModeId,
    startedAt: new Date(startDatetime.value),
    finishedAt: new Date(endDatetime.value),
  };

  const result = await createRikordApi(dto)
    .catch((error) => {
      console.error('createRikordApi:', { error });

      if (error instanceof FetchError && error.response?._data?.data?.message) {
        console.error({ errorMessage: error.response?._data?.data?.message });
      }

      return false;
    })
    .finally(() => createLoading.value = false);

  return result;
};

function resetForm() {
  selectedRikoImage.value = undefined;
  startDatetime.value = '';
  endDatetime.value = '';
}

export const useRikordForm = (): UseRikordForm => {
  return {
    selectedRikoImage, startDatetime, endDatetime,
    validate, createRikord, createLoading,
    resetForm,
  };
};
