import { date as quasarDate } from 'quasar';

export const dateUtils = () => {
  const dateLocale = {
    daysShort: '日_月_火_水_木_金_土'.split('_'),
    months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  } as const;

  /**
   * 日時文字列のフォーマット
   * @param isoDatetime 日時文字列(ISO8601形式)
   * @param format 日時フォーマット 例: YYYY/MM/DD HH:mm:ss(ddd)
   */
  function formatDate(isoDatetime: string, format: string): string {
    return quasarDate.formatDate(new Date(isoDatetime), format, dateLocale);
  }

  /**
   * 経過時間のフォーマット
   * @param duration 経過時間(s)
   * @example
   * - formatDuration(30) // -> '30秒'
   * - formatDuration(75) // -> '1分15秒'
   */
  function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration % 60;

    return minutes === 0 ? `${remainingSeconds}秒` : `${minutes}分${remainingSeconds}秒`;
  }

  return {
    dateLocale,
    formatDate,
    formatDuration,
  };
};
