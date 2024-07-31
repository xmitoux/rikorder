export const dateUtils = () => {
  /**
   * 指定したDateの月初日・最終日を取得する
   * @param date Dateオブジェクト(month指定時は-1が必要)
   */
  function getStartAndEndDateOfMonth(date: Date): { startDateOfMonth: Date; endDateOfMonth: Date } {
  // 月の初日
    const startDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    // 月の最終日23:59:59 (翌月0日を指定すると前月最終日となる)
    const endDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

    return {
      startDateOfMonth,
      endDateOfMonth,
    };
  }

  return {
    getStartAndEndDateOfMonth,
  };
};
