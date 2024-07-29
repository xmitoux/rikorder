import type { CreateRikordDto, RikoImageEntityResponse, UpdateRikordDto } from '@repo/db';

import type { RikordModeIdValue } from '~/types/rikord-mode';

type UseRikordForm = {
  selectedRikoImage: Ref<RikoImageEntityResponse | undefined>;
  startDatetime: Ref<string>;
  endDatetime: Ref<string>;
  validate: () => true | string;
  createRikord: (rikordModeId: RikordModeIdValue) => Promise<boolean>;
  updateRikord: (rikordId: number) => Promise<boolean>;
  submitLoading: Ref<boolean>;
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

const submitLoading = ref(false);
const createRikord = async (rikordModeId: RikordModeIdValue): Promise<boolean> => {
  submitLoading.value = true;

  const dto: CreateRikordDto = {
    rikoImageId: selectedRikoImage.value!.id,
    rikordModeId,
    startedAt: new Date(startDatetime.value),
    finishedAt: new Date(endDatetime.value),
  };

  const result = await createRikordApi(dto)
    .finally(() => submitLoading.value = false);

  return result;
};

const updateRikord = async (rikordId: number): Promise<boolean> => {
  submitLoading.value = true;

  const dto: UpdateRikordDto = {
    id: rikordId,
    rikoImageId: selectedRikoImage.value!.id,
    startedAt: new Date(startDatetime.value),
    finishedAt: new Date(endDatetime.value),
  };

  const result = await udpateRikordApi(dto)
    .finally(() => submitLoading.value = false);

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
    validate, createRikord, updateRikord, submitLoading,
    resetForm,
  };
};
