import type { QNotifyOptions } from 'quasar';

type UseQuasarNotify = {
  notifyConfig: (type: NotifyType, props: NotifyOptionProps) => QNotifyOptions;
};

type NotifyType = 'positive' | 'negative' | 'warning' | 'info' | 'ongoing';
type NotifyOptionProps = Pick<QNotifyOptions, 'message' | 'timeout'>;

function notifyConfig(type: NotifyType, { message, timeout }: NotifyOptionProps): QNotifyOptions {
  return {
    type,
    message: message ?? 'メッセージを設定してください',
    position: 'top',
    timeout: timeout ?? 2000,
    html: true, // <br>を入れるためhtml
  };
}

export const useQuasarNotify = (): UseQuasarNotify => {
  return { notifyConfig };
};
