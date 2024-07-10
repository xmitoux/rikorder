import { FetchError } from 'ofetch';

import type { CreateRikoImageSettingDto } from '@repo/db';

const fileInput = ref<HTMLInputElement | null>(null);

const selectFile = () => fileInput.value?.click();

const selectedFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

const onFileSelected = (event: Event): void => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        imagePreview.value = e.target.result as string;
      }
    });
    reader.readAsDataURL(selectedFile.value);
  }
};

type RikordMode = 'View' | 'Solo' | 'Multi';

type RikoImageSetting = { favorite: boolean; use: boolean };
type RikoImageSettings = { [K in RikordMode]: RikoImageSetting };

const defaultSetting: RikoImageSetting = { favorite: false, use: false };

/** モードごとの設定 */
const rikordImageSettings = ref<RikoImageSettings>({
  View: { ...defaultSetting },
  Solo: { ...defaultSetting },
  Multi: { ...defaultSetting },
});

/** 現在のモードタブの設定 */
const currentSetting = ref<RikoImageSetting>({ ...defaultSetting });

const onToggle = (rikordMode: string) => {
  // 切り替えたモードタブの設定を取得する
  currentSetting.value = rikordImageSettings.value[rikordMode as RikordMode];
};

const onClickOk = async (emit: () => void, alert: (message: string) => void, notifyErrors: (errors: string[]) => void) => {
  if (!selectedFile.value) {
    alert('画像を選択してください。');
    return;
  }

  // 各モードの使用設定フラグが全てfalseかチェック
  const nothingUse = Object.keys(rikordImageSettings.value)
    .map(rikordMode => rikordImageSettings.value[rikordMode as RikordMode].use)
    .every(use => !use);

  if (nothingUse) {
    alert('使用するRikordモードが未選択です。<br/>少なくとも1つを選択してください。');
    return;
  }

  const result = await submitForm();
  if (result !== true) {
    notifyErrors(result);
    return;
  }

  resetForm();
  emit();
};

const submitForm = async (): Promise<true | string[]> => {
  const settingsFormData: CreateRikoImageSettingDto[] = [];
  const { View, Solo, Multi } = rikordImageSettings.value;
  View.use && settingsFormData.push({ rikordModeId: 1, isFavorite: View.favorite });
  Solo.use && settingsFormData.push({ rikordModeId: 2, isFavorite: Solo.favorite });
  Multi.use && settingsFormData.push({ rikordModeId: 3, isFavorite: Multi.favorite });

  const formData = new FormData();
  formData.append('settings', JSON.stringify(settingsFormData));
  formData.append('file', selectedFile.value!);

  try {
    await createRikoImageWithSettingsApi(formData);
  }
  catch (error) {
    console.error('createRikoImageWithSettingsApi:', { error });

    if (error instanceof FetchError) {
      if (error.response?._data?.data) {
        const errorMessages = error.response._data.data.message;
        return Array.isArray(errorMessages) ? errorMessages : [errorMessages];
      }
      else {
        return ['予期せぬエラー'];
      }
    }
  }

  return true;
};

const onClickCancel = (emit: () => void) => {
  resetForm();
  emit();
};

const resetForm = () => {
  selectedFile.value = null;
  imagePreview.value = null;

  for (const rikordMode of Object.keys(rikordImageSettings.value)) {
    rikordImageSettings.value[rikordMode as RikordMode] = { ...defaultSetting };
  }
};

export const useCreateForm = () => {
  return {
    fileInput, selectedFile, selectFile, imagePreview, onFileSelected,
    rikordImageSettings, currentSetting, onToggle,
    onClickOk, onClickCancel,
  };
};
