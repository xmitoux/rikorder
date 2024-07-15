import type { RikoImageEntityResponse } from '@repo/db';

type UseRikordForm = {
  selectedRikoImage: Ref<RikoImageEntityResponse | undefined>;
  startDatetime: Ref<string>;
  endDatetime: Ref<string>;
  validate: () => true | string;
};

const selectedRikoImage = ref<RikoImageEntityResponse | undefined>();
const startDatetime = ref('');
const endDatetime = ref('');

function validate(): true | string {
  if (!selectedRikoImage.value) { return '画像を選択してください。'; }
  if (!startDatetime.value || !endDatetime.value) { return '日時を入力してください。'; }

  const startDate = new Date(startDatetime.value.replace(' ', 'T'));
  const endDate = new Date(endDatetime.value.replace(' ', 'T'));
  if (endDate <= startDate) { return '日時が不正です。<br>[開始日時 < 終了日時] としてください。'; }

  return true;
}

export const useRikordForm = (): UseRikordForm => {
  return {
    selectedRikoImage, startDatetime, endDatetime,
    validate,
  };
};
