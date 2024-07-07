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

  const onClickOk = (emit: () => void) => {
    resetForm();

    // TODO: データを返す
    emit();
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
