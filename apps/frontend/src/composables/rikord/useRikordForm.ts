import { FetchError } from 'ofetch';

import type { CreateRikordDto, RikoImageEntityResponse } from '@repo/db';

import type { RikordModeIdValue } from '~/types/rikord-mode';

type UseRikordForm = {
  selectedRikoImage: Ref<RikoImageEntityResponse | undefined>;
  startDatetime: Ref<string>;
  endDatetime: Ref<string>;
  validate: () => true | string;
  createRikord: (rikordModeId: RikordModeIdValue) => Promise<true | string[]>;
  createLoading: Ref<boolean>;
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
const createRikord = async (rikordModeId: RikordModeIdValue): Promise<true | string[]> => {
  createLoading.value = true;

  const dto: CreateRikordDto = {
    rikoImageId: selectedRikoImage.value!.id,
    rikordModeId,
    startedAt: new Date(startDatetime.value),
    finishedAt: new Date(endDatetime.value),
  };

  try {
    await createRikordApi(dto);
  }
  catch (error) {
    console.error('createRikordApi:', { error });

    if (error instanceof FetchError) {
      let errorMessage = '';
      if (error.response?._data?.data) {
        try {
          errorMessage = JSON.parse(error.response._data.data.message);
        }
        catch {
          errorMessage = error.response._data.data.message;
        }
        return Array.isArray(errorMessage) ? errorMessage : [errorMessage];
      }
      else {
        return ['予期せぬエラー'];
      }
    }
  }
  finally {
    createLoading.value = false;
  }

  return true;
};

export const useRikordForm = (): UseRikordForm => {
  return {
    selectedRikoImage, startDatetime, endDatetime,
    validate, createRikord, createLoading,
  };
};
