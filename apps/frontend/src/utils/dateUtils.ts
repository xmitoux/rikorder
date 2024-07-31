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

  /**
   * 経過日時のフォーマット
   * @param duration 経過時間(s)
   * @example
   * - formatDurationDatetime(90000) // -> '1日1時間0分'
   * - formatDurationDatetime(3665) // -> '1時間1分'
   * - formatDurationDatetime(59) // -> '0分'
   */
  function formatDurationDatetime(duration: number): string {
    // 日、時間、分に変換
    const days = Math.floor(duration / (24 * 60 * 60));
    const hours = Math.floor((duration % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((duration % (60 * 60)) / 60);

    let result = '';

    // 日数があれば追加
    if (days > 0) {
      result += `${days}日`;
    }

    // 時間があれば追加
    if (hours > 0) {
      result += `${hours}時間`;
    }

    // 分があれば追加（日数も時間もない場合は、0分でも表示）
    if (minutes > 0 || (days === 0 && hours === 0)) {
      result += `${minutes}分`;
    }

    return result || '0分'; // 空文字列の場合は '0分' を返す
  }

  /**
 * 現在に対して、指定した日時からの経過日時を文字列で取得する
 * @param isoDatetime 日時文字列(ISO8601形式)
 */
  function getDurationDatetimeString(isoDatetime: string): string {
    const date1 = new Date();
    const date2 = new Date(isoDatetime);
    const duration = quasarDate.getDateDiff(date1, date2, 'seconds');

    return formatDurationDatetime(duration);
  }

  return {
    dateLocale,
    formatDate,
    formatDuration,
    formatDurationDatetime,
    getDurationDatetimeString,
  };
};
