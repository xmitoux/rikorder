import type { QDialogOptions } from 'quasar';

type UseQuasarDialog = {
  dialogConfig: (props: DialogOptionProps) => QDialogOptions;
};

type DialogOptionProps = Partial<QDialogOptions>;

function dialogConfig({ title, message, cancel }: DialogOptionProps): QDialogOptions {
  return {
    title: title ?? 'タイトルを設定してください',
    message: message ?? 'メッセージを設定してください',
    ok: {
      color: 'pink-2',
      textColor: 'dark',
      rounded: true,
      unelevated: true,
    },
    cancel: cancel
      ? {
          label: 'キャンセル',
          color: 'white',
          textColor: 'dark',
          outline: true,
          rounded: true,
          unelevated: true,
        }
      : false,
    html: true, // <br>を入れるためhtml
    persistent: true,
  };
}

export const useQuasarDialog = (): UseQuasarDialog => {
  return { dialogConfig };
};
