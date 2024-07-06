export const useCreateForm = () => {
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
  const selctedModes = ref<RikordMode[]>([]);

  const isFavorite = ref(false);

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
    selctedModes.value = [];
    isFavorite.value = false;
  };

  return {
    fileInput,
    selectFile,
    selectedFile,
    imagePreview,
    onFileSelected,
    selctedModes,
    isFavorite,
    onClickOk,
    onClickCancel,
    resetForm,
  };
};
